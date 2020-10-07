// import dayjs from 'dayjs';
import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  client: String,
  type: String,
  date: Number,
  budget: Number,
  content: String,
  asset: {
    path: String,
    type: { type: String },
    video: Boolean,
    image: Boolean,
  },
});

// postSchema.pre('save', function (next) {
//   console.log(this.date);
//   if (typeof this.date !== 'number') {
//     const fixedDate = dayjs(this.date, 'DD-MM-YYYY');
//     console.log(fixedDate.isValid());
//     if (fixedDate.isValid()) this.date = fixedDate.valueOf();
//   }

//   next();
// });

const Post = mongoose.model('Post', postSchema);

export default Post;
