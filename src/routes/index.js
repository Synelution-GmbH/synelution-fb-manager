import Router from 'koa-router';

import authRoutes from './auth';
import clientRoutes from './clients';
import postRoutes from './posts';
import koaBody from 'koa-body';
import webpush from 'web-push';

export default ({ app }) => {
  const router = new Router();
  router.get('/', (ctx) => {
    ctx.body = 'nth 2 see here';
  });
  router.post('/subscribe', koaBody(), (ctx) => {
    const subscription = ctx.request.body;
    ctx.body = {};

    const payload = JSON.stringify({
      title: 'test',
      url: 'http://localhost:3001/carlovers/posts/fb',
    });
    console.log(subscription);
    webpush.sendNotification(subscription, payload).catch((error) => {
      console.error(error.stack);
    });
  });

  authRoutes({ router, app });
  app.use(router.routes());
  app.use(router.allowedMethods());

  const clientsRouter = new Router({ prefix: '/clients' });
  clientRoutes({ router: clientsRouter });
  app.use(clientsRouter.routes());
  app.use(clientsRouter.allowedMethods());

  const postsRouter = new Router({ prefix: '/posts' });
  postRoutes({ router: postsRouter });
  app.use(postsRouter.routes());
  app.use(postsRouter.allowedMethods());
};
