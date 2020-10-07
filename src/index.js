import 'dotenv/config';
import Koa from 'koa';
import http from 'http';
import https from 'https';
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

initDB({ app });
initMiddleware({ app });

initAuth({ app });
initRoutes({ app });

webpush.setVapidDetails(
  'mailto:web@synelution.com',
  process.env.VAPID_PUBLIC,
  process.env.VAPID_PRIVATE
);

// subscribe

io.on('connection', (socket) => {
  initSockets({ socket });
});

const PORT = process.env.PORT || 3002;
server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

// gracefully shut down
process.on('SIGTERM', async () => {
  console.info('SIGTERM signal received.');

  await app.context.db.close(false);
  console.info('MongoDb connection closed.');
  process.exit(0);
});
