import koaBody from 'koa-body';
import Client from '../models/Client';
import ClientLink from '../models/ClientLink';
import Post from '../models/Post';

import { saveFileAndResize, deleteDirectory } from '../utils';
import { getNewCode } from '../utils';

// prefix: "/"
export default ({ router }) => {
  router.post('/:slug/code', koaBody(), async (ctx) => {
    const { slug } = ctx.params;
    console.log(ctx.request);
    const { name, email } = ctx.request.body;
    try {
      const client = await Client.findOne({ slug });
      console.log('asd');
      if (!client) ctx.throw(404, 'client not found');
      if (!client.codes) client.codes = [];

      const code = await getNewCode(client.codes);
      const newCode = { code, name, email };
      client.codes.push(newCode);
      await client.save();
      ctx.body = newCode;
    } catch (e) {
      console.log(e);
    }
  });
  router.put('/:slug', koaBody(), async (ctx) => {
    const { slug } = ctx.params;
    console.log(ctx.request.body);
    console.log('put');
    try {
      const client = await Client.findOneAndUpdate({ slug }, ctx.request.body);
      console.log(client);
      ctx.body = client;
    } catch (e) {
      console.log(e);
      ctx.throw(400, 'something went wrong');
    }
  });

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
          ...ctx.request.body,
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
      const clients = await Client.find({});
      ctx.body = clients;
    } catch (e) {
      ctx.throw(404, 'not found');
    }
  });
  router.get('/:slug', async (ctx) => {
    const { slug } = ctx.params;
    console.log(slug);
    try {
      const client = await Client.findOne({ slug });
      ctx.body = client;
    } catch (e) {
      ctx.throw(404, 'not found');
    }
  });

  router.put('/:slug/:code', koaBody(), async (ctx) => {
    const { slug, code } = ctx.params;
    console.log(ctx.request.body);
    try {
      const client = await Client.findOne({ slug });
      if (!client) ctx.throw(404, 'client not found');

      const currentCode = client.codes.find((el) => el.code === code);
      await currentCode.set(ctx.request.body);
      await client.save();

      ctx.body = currentCode;
    } catch (e) {
      console.log(e);
    }
  });

  router.delete('/:slug/:code', async (ctx) => {
    const { slug, code } = ctx.params;
    try {
      const client = await Client.findOne({ slug });
      if (!client) {
        throw 'client not found';
      }
      const deleteThis = client.codes.find((el) => el.code === code);
      if (!deleteThis) throw 'code not found';
      await deleteThis.remove();
      await client.save();

      ctx.body = 'yay';
    } catch (e) {
      console.log(e);
      ctx.throw(404, e);
    }
  });

  router.delete('/:slug', async (ctx) => {
    const { slug } = ctx.params;
    console.log(slug);
    try {
      const client = await Client.findOneAndDelete({ slug });
      if (!client) {
        throw 'client not found';
      }
      const deletedStuff = await Promise.all([
        Post.deleteMany({ client: client.slug }),
        ClientLink.deleteMany({ client: client.slug }),
        deleteDirectory(`public/uploads/${client.slug}`),
      ]);
      console.log(deletedStuff);

      // await fs.unlink('public' + client.profilePicture);
      ctx.body = { client, deletedStuff };
    } catch (e) {
      console.log(e);
      ctx.throw(404, e);
    }
  });
};
