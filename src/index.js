import 'dotenv/config';
import Koa from 'koa';

import initMiddleware from './middleware';
import initDB from './db';
import initRoutes from './routes';
import initAuth from './middleware/auth';
import http from 'http';
import socketIO from 'socket.io';

const app = new Koa();
const server = http.createServer(app.callback());
const io = socketIO(server);

initDB({ app });
initMiddleware({ app });

initAuth({ app });
initRoutes({ app });

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
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
