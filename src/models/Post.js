import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  client: String,
  type: String,
  date: Number,
  budget: Number,
  content: String,
  asset: String,
});

const Post = mongoose.model('Post', postSchema);

export default Post;
