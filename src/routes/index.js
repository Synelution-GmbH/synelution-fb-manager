import Router from 'koa-router';

import authRoutes from './auth';
import clientRoutes from './clients';
import postRoutes from './posts';
import passport from 'koa-passport';

export default ({ app }) => {
  const router = new Router();
  router.get('/', (ctx) => {
    ctx.body = 'nth 2 see here';
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
