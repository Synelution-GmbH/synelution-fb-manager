import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  date: {
    type: String,
  },
  budget: {
    type: Number,
  },
  content: {
    type: String,
  },
  asset: {
    type: String,
  },
});

const Post = mongoose.model('Post', postSchema);

export default Post;
