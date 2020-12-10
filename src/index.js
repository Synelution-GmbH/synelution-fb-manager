import 'dotenv/config';
import Koa from 'koa';
import http from 'http';
// import https from 'https';
import socketIO from 'socket.io';

import initMiddleware from './middleware';
import initDB from './db';
import initRoutes from './routes';
import initAuth from './middleware/auth';
import initSockets from './sockets';
import webpush from 'web-push';

const app = new Koa();
const server = http.createServer(app.callback());

const io = socketIO(server);
// import serve from 'koa-static';
import send from 'koa-send';

initDB({ app });
initMiddleware({ app });

initAuth({ app });
initRoutes({ app });

webpush.setVapidDetails(
  'mailto:web@synelution.com',
  process.env.VAPID_PUBLIC,
  process.env.VAPID_PRIVATE
);

app.use(async (ctx) => {
  await send(ctx, 'index.html', { root: 'public' });
});

// subscribe

io.on('connection', (socket) => {
  initSockets({ socket });
});

const PORT = process.env.PORT || 3002;
server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

process.on('uncaughtException', function (err) {
  console.error(err.stack);
  console.log('Node NOT Exiting...');
});
// gracefully shut down
process.on('SIGTERM', async () => {
  console.info('SIGTERM signal received.');

  await app.context.db.close(false);
  console.info('MongoDb connection closed.');
  process.exit(0);
});
