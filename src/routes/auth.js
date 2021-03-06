import passport from 'koa-passport';
import jsonwebtoken from 'jsonwebtoken';
import User from '../models/User';
import koaBody from 'koa-body';

const createToken = async () => {
  return await jsonwebtoken.sign({ id: user.id }, process.env.SECRET);
};

// prefix: "/"
export default ({ router }) => {
  router.post(
    '/login',
    koaBody(),
    passport.authenticate('local', { session: false }),
    async (ctx) => {
      const { user } = ctx.req;
      console.log(user);
      console.log(ctx.isAuthenticated());

      const token = await jsonwebtoken.sign({ id: user.id }, process.env.SECRET);
      ctx.body = { token, user };
    }
  );

  router.post('/register', koaBody(), async (ctx) => {
    const { username, email, password, role } = ctx.request.body;

    if (!username || !password || !email) {
      ctx.throw(400, 'Why u do dis? give me data (ﾉ￣□￣)ﾉ ~┻━┻');
    }

    // do some form of validation >_> or in try catch

    try {
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        throw 'user already exists';
      }

      const user = new User({ username, email, password, role });
      const createdUser = await user.save();
      console.log(createdUser);
      const token = await jsonwebtoken.sign(
        { id: createdUser._id },
        process.env.SECRET
      );
      ctx.body = { token, msg: 'User Sucessfully created', id: createdUser._id };
    } catch (e) {
      ctx.throw(400, e);
    }
  });

  // router.get('/user', async (ctx) => {
  //   const users = await User.find({});
  //   ctx.body = users;
  // });

  router.get(
    '/auth',
    passport.authenticate('jwt', { session: false }),
    async (ctx) => {
      // console.log(ctx);
      ctx.body = ctx.req.user;
    }
  );
};
