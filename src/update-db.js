import 'dotenv/config';
import initDB from './db';
import { saveFile, saveFileAndResize, formatFileName } from './utils';


import Post from './models/Post';

const app = { context: {} };
initDB({ app });

(async () => {
  let count =0
  const posts = await Post.find();
  [posts[1], posts[2]].forEach(async (item) => {
    const post = item._doc;
    if(!post.asset || !post.asset.path) return
      // console.log(count++);
    const {asset}= post;
    // const newPost = {
    //   ...post,
    //   assets: [{
    //     asset
    //   }],
    //   assetOrder: [asset]
    // }
    const fileName = asset.path.split('/')[asset.path.split('/').length - 1]
    console.log(fileName);
     const fileEnd = fileName.substring(
        fileName.lastIndexOf('.'),
        fileName.length
      );
      console.log(fileEnd);

      const path = await saveFileAndResize({
        uploadPath: asset.path,
        fileName: fileName.replace(fileEnd, `_thumb${fileEnd}`),
        savePath,
        resize: [230, 230],
      });
      // asset.thumb = await saveFileAndResize({
      //   uploadPath: file.path,
      //   fileName: fileName.replace(fileEnd, `_thumb${fileEnd}`),
      //   savePath,
      //   resize: [230, 230],
      // });

    // await Post.findByIdAndUpdate(post.id, {})
  });
})();
