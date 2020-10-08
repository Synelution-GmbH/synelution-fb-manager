import { faFontAwesomeLogoFull } from '@fortawesome/free-brands-svg-icons';
import koaBody from 'koa-body';
import { use } from 'koa-passport';
import webpush from 'web-push';
import User from '../models/User';

// /subscription
export default ({ router }) => {
  router.post('/', koaBody(), async (ctx) => {
    const subscription = ctx.request.body;
    console.log(subscription);
    const { user } = ctx.req;

    try {
      if (user.subscriptions && user.subscriptions.length > 0) {
        const index = user.subscriptions.findIndex(({ keys }) => {
          console.log(keys.auth, subscription.keys.auth);
          return keys.auth === subscription.keys.auth;
        });
        if (index === -1) {
          user.subscriptions.push(subscription);
          await user.save();
        }
      } else {
        user.subscriptions = [subscription];
        await user.save();
      }
    } catch (e) {
      console.log(e);
    }

    ctx.body = {};

    // const payload = JSON.stringify({
    //   title: 'test',
    //   url: 'http://localhost:3001/carlovers/posts/fb',
    // });
    // webpush.sendNotification(subscription, payload).catch((error) => {
    //   console.error(error.stack);
    // });
  });
  router.post('/send', koaBody(), async (ctx) => {
    const { body } = ctx.request;
    const { user } = ctx.req;

    try {
      const proofreader = await User.find({
        organization: user.organization,
        role: 'proofreader',
      });

      if (proofreader.length <= 0) ctx.throw(404, 'no proofreaders found ( ≧Д≦)');
      const payload = JSON.stringify({
        ...body,
        title: `${user.username} requests proofread (ﾉ≧∀≦)ﾉ`,
      });
      for (let i = 0; i < proofreader.length; i++) {
        for (let e = 0; e < proofreader[i].subscriptions.length; e++) {
          const sub = proofreader[i].subscriptions[e];
          await webpush.sendNotification(sub, payload);
        }
      }
    } catch (e) {
      console.log(e);
      ctx.throw('error (๑◕︵◕๑)');
    }

    ctx.body = '';
  });
};
