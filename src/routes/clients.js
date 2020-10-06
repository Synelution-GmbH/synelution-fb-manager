import koaBody from 'koa-body';
import Client from '../models/Client';
import fs from 'fs/promises';

import { saveFileAndResize } from '../utils';

// prefix: "/"
export default ({ router }) => {
  router.post(
    '/',
    koaBody({ multipart: true, uploadDir: '.', urlencoded: true }),
    async (ctx) => {
      const { name } = ctx.request.body;
      const slug = name
        .trim()
        .replace(/ /g, '-')
        .replace(/[^a-zA-Z0-9-_]/g, '')
        .toLowerCase();
      const { file } = ctx.request.files;

      const savePath = `public/uploads/${slug}/`;
      const fileName = `${Date.now()}_${file.name}`;

      try {
        const existingClient = await Client.findOne({
          slug,
        });
        if (existingClient) {
          throw 'user already exists';
        }
        const profilePicture = await saveFileAndResize({
          uploadPath: file.path,
          fileName,
          savePath,
          resize: [150, 150],
        });

        const newClient = new Client({
          name: name.trim(),
          slug,
          profilePicture,
        });

        await newClient.save();
        ctx.body = newClient;
      } catch (e) {
        ctx.throw(400, e);
      }
    }
  );

  router.get('/', async (ctx) => {
    try {
      const customers = await Client.find({});
      ctx.body = customers;
    } catch (e) {
      ctx.throw(404, 'not found');
    }
  });

  router.delete('/:slug', async (ctx) => {
    const { slug } = ctx.params;
    try {
      const customer = await Client.findOneAndDelete({ slug });
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
