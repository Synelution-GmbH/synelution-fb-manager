import Post from '../models/Post';

export default ({ socket, posts }) => {
  socket.on('update post', async ({ id, ...rest }) => {
    const post = posts[id] ? posts[id].post : await Post.findById(id);
    for (const key in rest) {
      if (key === 'asset') continue;
      post[key] = rest[key];
    }

    await post.save();
    socket.to(id).emit('update post', { id, data: rest });
  });
};
