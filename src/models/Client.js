import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  facebookName: String,
  // instagramName: String,
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  profilePicture: String,
});

const Client = mongoose.model('Client', clientSchema);
export default Client;
