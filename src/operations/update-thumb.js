import 'dotenv/config';
import initDB from '../db';
import { saveFile, saveFileAndResize, formatFileName } from '../utils';

import Post from '../models/Post';

const app = { context: {} };
initDB({ app });
(async () => {
  let count = 0;
  const posts = await Post.find({});
  posts.forEach(async (item) => {
    const post = item._doc;
    console.log(!post.assets, post.assets.length === 0);
    if (!post.assets || post.assets.length === 0) return;
    // console.log(count++);
    const { assets } = post;
    console.log(assets);
  try {
    assets.forEach(async asset => {      
        const fileName = asset.path.split('/')[asset.path.split('/').length - 1];
        console.log('creating thumb for: ', fileName);
        const fileEnd = fileName.substring(fileName.lastIndexOf('.'), fileName.length);
        const savePath = `public/uploads/${post.client}/`;
        const path = await saveFileAndResize({
          uploadPath: 'public' + asset.path,
          fileName: fileName.replace(fileEnd, `_thumb${fileEnd}`),
          savePath,
          resize: [230, 230],
        });
        console.log(path);

        asset.thumb = path;

      });  
      await item.save();
  } catch (error) {
    console.log(error);
  }
    
    // await Post.findByIdAndUpdate(post.id, {})

    
  });
})();
