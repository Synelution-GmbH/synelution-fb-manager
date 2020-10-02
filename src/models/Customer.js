import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
  ],
  profilePicture: String,
});

// On Save Hook, encrypt password
// customerSchema.pre('save', function (next) {
//   if (!this.slug)
//     this.slug = this.name
//       .replace(/ /g, '-')
//       .replace(/[^a-zA-Z0-9-_]/g, '')
//       .toLowerCase();

//   next();
// });

const Customer = mongoose.model('Customer', customerSchema);

export default Customer;
