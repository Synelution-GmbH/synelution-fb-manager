import koaBody from 'koa-body';
import Customer from '../models/Client';
import fs from 'fs/promises';

import { saveFile, saveFileAndResize } from '../utils';
import dayjs from 'dayjs';
import Post from '../models/Post';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import 'dayjs/locale/de';

dayjs.extend(customParseFormat);
dayjs.locale('de');
export const FORMAT = 'DD-MM-YYYY';

// prefix: "/"
export default ({ router }) => {
  router.get('/:client', async (ctx) => {
    const { client } = ctx.params;
    const posts = await Post.find({ client: client });

    ctx.body = posts;
  });

  router.get('/:client/:type/:from/:to', async (ctx) => {
    const { client, from, to, type } = ctx.params;
    try {
      const posts = await Post.find({
        client,
        type,
        date: {
          $gte: dayjs(from, FORMAT).startOf('day').valueOf(),
          $lte: dayjs(to, FORMAT).endOf('day').valueOf(),
        },
      });
      ctx.body = posts;
    } catch (error) {
      console.log(error);
      ctx.body = 'error';
    }
  });

  router.post('/:client', koaBody(), async (ctx) => {
    const { client } = ctx.params;
    const { date, budget, type, content, asset } = ctx.request.body;
    if (!client || !dayjs(date).isValid())
      return ctx.throw(400, 'bad boy 凸ಠ益ಠ)凸');

    try {
      const newPost = new Post({
        client: client,
        date: date,
        type,
        budget,
        content,
        asset,
      });

      ctx.body = await newPost.save();
    } catch (e) {
      ctx.throw(404, e);
    }
  });

  router.put(
    '/:id',
    koaBody({ multipart: true, uploadDir: '.', urlencoded: true }),
    async (ctx) => {
      const { id } = ctx.params;
      if (!id) return ctx.throw(400, 'bad boy 凸ಠ益ಠ)凸');
      const { file } = ctx.request.files;
      try {
        const post = await Post.findById(id);
        const savePath = `public/uploads/${post.client}/`;
        const fileName = `${Date.now()}_${file.name}`;

        const asset = await saveFileAndResize({
          uploadPath: file.path,
          fileName,
          savePath,
          resize: [1500, 1500],
        });
        if (post.asset) await fs.unlink('public' + post.asset);
        post.asset = asset;
        await post.save();

        ctx.body = post;
      } catch (e) {
        console.log(e);
        ctx.throw(404, 'post not found');
      }
    }
  );
  router.delete('/:id', koaBody(), async (ctx) => {
    const { id } = ctx.params;
    if (!id) return ctx.throw(400, 'bad boy 凸ಠ益ಠ)凸');

    try {
      const post = await Post.findByIdAndDelete(id);

      ctx.body = post;
    } catch (e) {
      ctx.throw(404, 'post not found');
    }
  });
};
