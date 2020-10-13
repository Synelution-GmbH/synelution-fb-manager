import dayjs from 'dayjs';
import koaBody from 'koa-body';
import ClientLink from '../models/ClientLink';
import Post from '../models/Post';
export const FORMAT = 'DD-MM-YYYY';
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
      });

      ctx.body = { link: existing, posts };
    } catch (e) {
      console.log(e);
      ctx.throw(e);
    }
  });
};
