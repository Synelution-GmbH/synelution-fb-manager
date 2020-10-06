import 'dotenv/config';
import Koa from 'koa';
import http from 'http';
import socketIO from 'socket.io';

import initMiddleware from './middleware';
import initDB from './db';
import initRoutes from './routes';
import initAuth from './middleware/auth';
import initSockets from './sockets';

const app = new Koa();
const server = http.createServer(app.callback());

// const defaultValue = [
//   {
//     type: 'paragraph',
//     children: [
//       {
//         text: 'Hello collaborator!',
//       },
//     ],
//   },
// ];
// const connection = new SocketIOConnection({
//   entry: server,
//   defaultValue,
//   saveFrequency: 2000,
//   // onAuthRequest: async (query, socket) => {
//   //   // some query validation
//   //   return true;
//   // },
//   onDocumentLoad: async (pathname) => {
//     console.log(pathname);
//     return defaultValue;
//   },
// });
const io = socketIO(server);

initDB({ app });
initMiddleware({ app });

initAuth({ app });
initRoutes({ app });

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
