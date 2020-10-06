import postSockets from './posts';
import Post from '../models/Post';

function arrayRemove(arr, value) {
  return arr.filter(function (ele) {
    return ele != value;
  });
}

const posts = {};
const removePosts = ({ socket, id }) => {
  if (!posts[id]) return;
  posts[id].userList = arrayRemove(posts[id].userList, socket.id);
  if (posts[id].userList.length === 0) {
    delete posts[id];
  }
};

export default ({ socket }) => {
  console.log('a user connected');

  socket.on('join editor', async (id) => {
    socket.join(id);
    if (!posts[id]) {
      const post = await Post.findById(id);
      posts[id] = { post, userList: [] };
    }
    posts[id].userList.push(socket.id);
  });

  socket.on('leave editor', (id) => {
    socket.leave(id);
    // remove user from post
    removePosts({ socket, id });
  });

  postSockets({ socket, posts });
  socket.on('disconnect', () => {
    console.log('user disconnected');
    // remove user from posts
    for (const id in posts) {
      removePosts({ id, socket });
    }
  });
};
