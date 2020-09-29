import Router from 'koa-router';

import authRoutes from './auth';
import passport from 'koa-passport';

export default ({ app }) => {
  const router = new Router();
  router.get('/', (ctx) => {
    ctx.body = 'nth 2 see here';
  });

  authRoutes({ router, app });
  app.use(router.routes());
  app.use(router.allowedMethods());
};
