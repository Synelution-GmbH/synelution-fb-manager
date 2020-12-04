import 'dotenv/config';
import initDB from '../db';
import { saveFile, saveFileAndResize, formatFileName } from '../utils';

import Post from '../models/Post';

const app = { context: {} };
initDB({ app });

(async () => {
  let count = 0;
  const posts = await Post.find();
  posts.forEach(async (item) => {
    const post = item._doc;
    if (!post.asset || !post.asset.path) return;
    // console.log(count++);
    const { asset } = post;
    const postUpdates = {
      assets: [{
        asset,
        thumb: asset.path
      }],
      assetOrder: [asset]
    }

    await Post.findByIdAndUpdate(post.id, postUpdates)
  });
})();
