import Post from '../models/Post';

const checkUpdate = (key) => {
  switch (key) {
    case 'content':
    case 'clientCorrected':
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

  socket.on('client change', async ({ id, ...update }, fn) => {
    try {
      const post = posts[id] ? posts[id].post : await Post.findById(id);

      const approvedUpdate = {};
      for (const key in update) {
        if (checkUpdate(key)) {
          post[key] = update[key];
          approvedUpdate[key] = update[key];
        }
        if (key === 'imageChanges') {
          if (!post[key]) post[key] = [];

          post[key].push(update[key]);
          approvedUpdate[key] = post[key];
        }
      }
      console.log(approvedUpdate);

      await post.save();
      fn('success');
      socket.to(id).emit('update post', { id, data: approvedUpdate });
    } catch (e) {
      console.log(e);
      fn('error');
    }
  });
};
