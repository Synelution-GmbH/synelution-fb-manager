import dayjs from 'dayjs';
import Post from '../models/Post';
import { FORMAT } from '../utils';
import { sendMail } from '../utils/sendmail';

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

const getEmailText = (key, data) => {
  switch (key) {
    case 'clientCorrected':
      return 'Post Text wurde geändert!';

    case 'approved':
      return data[key]
        ? 'Post wurde freigegeben!'
        : 'Post freigabe wurde wiederrufen!';

    case 'imageChanges':
      return `Bild Korrekturen: <br> ${data[key].text}`;

    default:
      return '';
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

      await post.save();
      fn('success');
      socket.to(id).emit('update post', { id, data: approvedUpdate });

      const formattedDate = dayjs(post.date).format(FORMAT);
      const emailBody = Object.keys(update).map((key) => getEmailText(key, update));
      // await sendMail({
      //   subject: `${post.type} - ${post.client} - ${formattedDate}`,
      //   text: emailBody.join('\\n').replace(/<br>/g, '\\n'),
      //   html: emailBody.join('<br>'),
      // });
    } catch (e) {
      console.log(e);
      fn('error');
    }
  });
};
