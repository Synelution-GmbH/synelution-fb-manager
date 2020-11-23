import dayjs from 'dayjs';
import koaBody from 'koa-body';
import Client from '../models/Client';
import ClientLink from '../models/ClientLink';
import Post from '../models/Post';
import { FORMAT } from '../utils';

export const clientLinkRoutesWithAuth = ({ router }) => {
  router.post('/client-link', koaBody(), async (ctx) => {
    console.log(body);
    const { body } = ctx.request;

    try {
      const existing = await ClientLink.findOne(body);
      console.log(existing);
      if (existing) {
        return (ctx.body = existing);
      }
      // return (ctx.body = { uuid: 'asd' });
      const newLink = new ClientLink(body);
      const clientLink = await newLink.save();
      ctx.set('Cache-Control', 'no-cache');
      ctx.body = clientLink;
    } catch (e) {
      console.log(e);
      ctx.throw(400, 'bad request');
    }
  });
};
export const clientLinkRoutes = ({ router }) => {
  router.get('/client-link/:uuid', koaBody(), async (ctx) => {
    const { uuid } = ctx.params;
    try {
      const existing = await ClientLink.findOne({ uuid });
      if (!existing) ctx.throw(404, 'not found');
      const { client, from, to, type } = existing;
      const posts = await Post.find({
        client,
        type,
        date: {
          $gte: dayjs(from, FORMAT).startOf('day').valueOf(),
          $lte: dayjs(to, FORMAT).endOf('day').valueOf(),
        },
      }).sort({
        date: 1,
      });

      const existingClient = await Client.findOne({ slug: client });
      ctx.set('Cache-Control', 'no-cache');
      ctx.body = { link: existing, posts, client: existingClient };
    } catch (e) {
      console.log(e);
      ctx.throw(e);
    }
  });

  router.get('/client-link/:uuid/:code', async (ctx) => {
    const { uuid, code } = ctx.params;
    console.log(uuid, code);
    try {
      const existing = await ClientLink.findOne({ uuid });
      if (!existing) ctx.throw(404, 'link not found');
      const { client, from, to, type } = existing;
      const existingClient = await Client.findOne({ slug: client });
      if (existingClient.codes.length > 0) {
        const existingCode = existingClient.codes.find((el) => el.code === code);
        if (!existingCode) {
          ctx.throw(400, 'no code');
          return;
        }
      }
      const posts = await Post.find({
        client,
        type,
        date: {
          $gte: dayjs(from, FORMAT).startOf('day').valueOf(),
          $lte: dayjs(to, FORMAT).endOf('day').valueOf(),
        },
      }).sort({
        date: 1,
      });

      ctx.set('Cache-Control', 'no-cache');
      ctx.body = {
        code: existingCode,
        queryData: { link: existing, posts, client: existingClient },
      };
    } catch (e) {
      console.log(e);
      ctx.throw(400, 'Der Code ist ungültig!');
    }
  });
};
