import Router from 'koa-router';

import authRoutes from './auth';
import clientRoutes from './clients';
import postRoutes from './posts';
import subscriptionRoutes from './subscription';
import passport from 'passport';

export default ({ app }) => {
  const router = new Router();
  router.get('/', (ctx) => {
    ctx.body = 'nth 2 see here';
  });

  authRoutes({ router, app });
  app.use(router.routes());
  app.use(router.allowedMethods());
  app.use(passport.authenticate('jwt', { session: false }));

  const clientsRouter = new Router({ prefix: '/clients' });
  clientRoutes({ router: clientsRouter });
  app.use(clientsRouter.routes());
  app.use(clientsRouter.allowedMethods());

  const postsRouter = new Router({ prefix: '/posts' });
  postRoutes({ router: postsRouter });
  app.use(postsRouter.routes());
  app.use(postsRouter.allowedMethods());

  const subscriptionRouter = new Router({ prefix: '/subscription' });
  subscriptionRoutes({ router: subscriptionRouter });
  app.use(subscriptionRouter.routes());
  app.use(subscriptionRouter.allowedMethods());
};
