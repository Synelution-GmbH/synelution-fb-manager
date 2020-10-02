import koaBody from 'koa-body';
import Customer from '../models/Customer';
import fs from 'fs/promises';

import { saveFile } from '../utils';

// prefix: "/"
export default ({ router }) => {
  router.post(
    '/',
    koaBody({ multipart: true, uploadDir: '.', urlencoded: true }),
    async (ctx) => {
      const { name } = ctx.request.body;
      const slug = name
        .replace(/ /g, '-')
        .replace(/[^a-zA-Z0-9-_]/g, '')
        .toLowerCase();
      const { file } = ctx.request.files;

      const savePath = `public/uploads/${slug}/`;
      const fileName = `${Date.now()}_${file.name}`;

      try {
        const existingCustomer = await Customer.findOne({
          slug,
        });
        if (existingCustomer) {
          throw 'user already exists';
        }
        const profilePicture = await saveFile({
          uploadPath: file.path,
          fileName,
          savePath,
        });

        const newCustomer = new Customer({
          name,
          slug,
          profilePicture,
        });

        await newCustomer.save();
        ctx.body = newCustomer;
      } catch (e) {
        ctx.throw(400, e);
      }
    }
  );

  router.get('/', async (ctx) => {
    try {
      const customers = await Customer.find({});
      ctx.body = customers;
    } catch (e) {
      ctx.throw(404, 'not found');
    }
  });

  router.delete('/:slug', async (ctx) => {
    const { slug } = ctx.params;
    try {
      const customer = await Customer.findOneAndDelete({ slug });
      if (!customer) {
        throw 'customer not found';
      }

      await fs.unlink('public' + customer.profilePicture);
      ctx.body = customer;
    } catch (e) {
      console.log(e);
      ctx.throw(404, e);
    }
  });
};
