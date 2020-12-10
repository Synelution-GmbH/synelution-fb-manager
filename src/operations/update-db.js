import 'dotenv/config';
import initDB from '../db';
import { saveFile, saveFileAndResize, formatFileName } from '../utils';

import Post from '../models/Post';

const app = { context: {} };
initDB({ app });

(async () => {
  const posts = await Post.find();
  console.log(posts.length);
  await posts.forEach(async (item) => {
    try {
      const post = item._doc;
      if (!post.asset || !post.asset.path) return;
      // console.log(count++);
      const { asset } = post;
      const name = asset.path.split('/')[asset.path.split('/').length - 1];
      const postUpdates = {
        assets: [{
          ...asset,
          thumb: asset.path,
          name: name
        }],
        assetOrder: [name]
      }
      item.assets=[{
          ...asset,
          thumb: asset.path,
          name: name
        }]
        item.assetOrder = [name]
      console.log(name);
      await item.save()
      // await Post.updateOne({_id: post.id}, postUpdates);
    } catch (error) {
      console.log(error);
    }
  });
})();
