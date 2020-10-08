import koaBody from 'koa-body';
import webpush from 'web-push';

// /subscription
export default ({ router }) => {
  router.post('/', koaBody(), async (ctx) => {
    const subscription = ctx.request.body;
    console.log(subscription);
    const { user } = ctx.req;
    console.log(user);
    if (user.subscriptions && user.subscriptions.length > 0) {
      const index = user.subscription.findIndex(
        ({ keys }) => keys.auth === subscription.keys.auth
      );
      console.log(index);
    } else {
      try {
        user.subscriptions = [subscription];
        await user.save();
      } catch (e) {
        console.log(e);
      }
    }

    ctx.body = {};

    const payload = JSON.stringify({
      title: 'test',
      url: 'http://localhost:3001/carlovers/posts/fb',
    });
    webpush.sendNotification(subscription, payload).catch((error) => {
      console.error(error.stack);
    });
  });
};
