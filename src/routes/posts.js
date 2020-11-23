import koaBody from 'koa-body';
import fs from 'fs';

import { saveFile, saveFileAndResize, formatFileName } from '../utils';
import dayjs from 'dayjs';
import Post from '../models/Post';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import 'dayjs/locale/de';
import { FORMAT } from '../utils';

dayjs.extend(customParseFormat);
dayjs.locale('de');

// prefix: "/"
export default ({ router }) => {
  router.get('/:client', async (ctx) => {
    const { client } = ctx.params;
    const posts = await Post.find({ client: client }).sort({
      date: 1,
    });

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
      }).sort({
        date: 1,
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
      const { files } = ctx.request.files;

      const { body } = ctx.request;
      console.log(body);
      // console.log(files);
      // return (ctx.body = 'asd');

      try {
        const post = await Post.findById(id);
        if (!post.assets) post.assets = [];
        const fileArray = Array.isArray(files) ? files : [files];
        const newAssetOrder = post.assetOrder ? post.assetOrder : [];
        for (const file of fileArray) {
          const savePath = `public/uploads/${post.client}/`;
          const formattedFileName = formatFileName(file.name);
          const fileName = `${Date.now()}_${formattedFileName}`;
          newAssetOrder.push(formattedFileName);
          const asset = {
            type: file.type,
            video: false,
            image: false,
            name: formattedFileName,
          };

          if (file.type.search('video') !== -1) {
            asset.video = true;
            asset.path = await saveFile({
              uploadPath: file.path,
              fileName,
              savePath,
            });
          } else {
            asset.image = true;
            asset.path = await saveFileAndResize({
              uploadPath: file.path,
              fileName,
              savePath,
              resize: [1500, 1500],
            });

            const fileEnd = fileName.substring(
              fileName.lastIndexOf('.'),
              fileName.length
            );
            asset.thumb = await saveFileAndResize({
              uploadPath: file.path,
              fileName: fileName.replace(fileEnd, `_thumb${fileEnd}`),
              savePath,
              resize: [230, 230],
            });
          }

          const existingAsset = post.assets.find(
            (asset) => asset.name === formattedFileName
          );
          // console.log(post.assets);
          if (existingAsset)
            try {
              console.log(existingAsset);
              newAssetOrder.pop();
              await fs.promises.unlink('public' + existingAsset.path);
              if (existingAsset.thumb)
                await fs.promises.unlink('public' + existingAsset.thumb);

              await existingAsset.set(asset);
            } catch (e) {
              console.log(e);
              await existingAsset.set(asset);
            }
          else post.assets.push(asset);
        }
        post.assetOrder = newAssetOrder;
        console.log(post);
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
      console.log(post);
      for (const asset of post.assets) {
        await fs.promises.unlink('public' + asset.path);
        await fs.promises.unlink('public' + asset.thumb);
      }

      ctx.body = post;
    } catch (e) {
      console.log(e);
      ctx.throw(404, 'post not found');
    }
  });

  router.delete('/:id/:assetId', koaBody(), async (ctx) => {
    const { id, assetId } = ctx.params;
    if (!id) return ctx.throw(400, 'bad boy 凸ಠ益ಠ)凸');
    try {
      const post = await Post.findById(id);
      if (!post) return ctx.throw(404, 'not found');
      const asset = await post.assets.id(assetId);
      console.log(asset);
      if (!asset) return ctx.throw(404, 'not found');
      const assetToRemove = asset.name;
      console.log(assetToRemove);
      await fs.promises.unlink('public' + asset.path);
      if (asset.thumb) await fs.promises.unlink('public' + asset.thumb);
      await asset.remove();

      const newAssetOrder = Array.from(post.assetOrder);
      const assetOrderIndex = post.assetOrder.findIndex(
        (name) => name === assetToRemove
      );
      console.log(newAssetOrder);
      newAssetOrder.splice(assetOrderIndex, 1);
      console.log(newAssetOrder);
      post.assetOrder = newAssetOrder;

      post.save();

      ctx.body = { assetOrder: post.assetOrder, assets: post.assets };
    } catch (e) {
      console.log(e);
      ctx.throw(404, 'post not found');
    }
  });
};
