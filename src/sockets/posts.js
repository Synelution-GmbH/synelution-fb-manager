import Post from '../models/Post';

const checkUpdate = (key) => {
  switch (key) {
    case 'content':
    case 'clientCorrected':
    case 'imageChanges':
    case 'approved':
      return true;

    default:
      return false;
  }
};
export default ({ socket, posts }) => {
  socket.on('update post', async ({ id, ...rest }) => {
    try {
      const post = posts[id] ? posts[id].post : await Post.findById(id);
      for (const key in rest) {
        if (key === 'asset') continue;
        post[key] = rest[key];
      }

      await post.save();
      socket.to(id).emit('update post', { id, data: rest });
    } catch (e) {
      console.log(e);
    }
  });

  socket.on('client change', async ({ id, ...update }) => {
    try {
      const post = posts[id] ? posts[id].post : await Post.findById(id);
      console.log(post);
      const approvedUpdate = {};
      for (const key in update) {
        console.log(checkUpdate(key));
        if (checkUpdate(key)) {
          post[key] = update[key];
          approvedUpdate[key] = update[key];
        }
      }
      console.log(approvedUpdate);

      await post.save();
      socket.to(id).emit('update post', { id, data: approvedUpdate });
    } catch (e) {
      console.log(e);
    }
  });
};
