import mongoose from 'mongoose';

export default async ({ app }) => {
  const db = mongoose.connection;
  app.context.db = db;
  mongoose.Promise = global.Promise;
  await mongoose.connect(
    process.env.DB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('connected to mongodb');
      }
    }
  );
};
