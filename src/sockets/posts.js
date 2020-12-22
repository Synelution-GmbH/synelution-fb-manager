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

const formattedPostType = {
  fb: 'Facebook',
  ig: 'Instagram',
};

const getEmailText = (key, data) => {
  switch (key) {
    case 'clientCorrected':
      return 'Post Text wurde geändert!';

    case 'approved':
      return data[key]
        ? 'Post wurde freigegeben!'
        : 'Post freigabe wurde widerrufen!';

    case 'imageChanges':
      return `Bild Korrekturen: <br> ${data[key].text}`;

    default:
      return '';
  }
};

export default ({ socket, posts }) => {
  socket.on('update post', async ({ id, NO_DB, ...rest }) => {
    console.log(rest);
    if (NO_DB) return socket.to(id).emit('update post', { id, data: rest });

    try {
      const post = await Post.findById(id);
      // const post = posts[id] ? posts[id].post : await Post.findById(id);
      for (const key in rest) {
        if (key === 'asset') continue;
        post[key] = rest[key];
      }
      console.log(post);

      await post.save();
      socket.to(id).emit('update post', { id, data: rest });
    } catch (e) {
      console.log(e);
    }
  });

  socket.on(
    'client change',
    async ({ id, clientName, clientEmail, ...update }, fn) => {
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
        const defaultBody = `<h2>Kunde: ${post.client}</h2><p>${
          formattedPostType[post.type]
        } Post für den ${formattedDate}</p>
        <h3>Von:</h3>
        <p>Name: ${clientName}<br>Email: ${clientEmail}</p>
      `;
        const emailBody = Object.keys(update).map((key) =>
          getEmailText(key, update)
        );
        console.log(clientName, clientEmail);
        if (process.env.NODE_ENV === 'production')
          await sendMail({
            // from: clientEmail ? clientEmail : null,
            subject: `${post.type} - ${post.client} - ${formattedDate}`,
            html:
              `<p>${emailBody
                .join('<br>')
                .replace(/(?:\r\n|\r|\n)/g, '<br>')}</p>` + `${defaultBody}`,
            // text: `${emailBody.join('\\n')} <br><br> ${defaultBody}`.replace(
            //   /<br>/g,
            //   '\\n'
            // ),
          });
      } catch (e) {
        console.log(e);
        fn('error');
      }
    }
  );
};
