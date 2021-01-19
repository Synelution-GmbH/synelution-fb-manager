// import dayjs from 'dayjs';
import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  client: String,
  type: String,
  date: Number,
  budget: Number,
  budgetIG: Number,
  content: String,
  approved: Boolean,
  clientCorrected: Boolean,
  published: Boolean,
  hidden: Boolean,
  comments: String,
  asset: {
    path: String,
    type: { type: String },
    video: Boolean,
    image: Boolean,
  },
  imageChanges: [
    {
      text: String,
      createdAt: { type: Date, default: Date.now },
      done: Boolean,
    },
  ],
  assets: [
    {
      path: String,
      thumb: String,
      name: String,
      type: { type: String },
      video: Boolean,
      image: Boolean,
      content: String,
      title: String,
      link: String,
    },
  ],
  assetOrder: [String],
  checked: {
    type: Boolean,
    default: false,
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
