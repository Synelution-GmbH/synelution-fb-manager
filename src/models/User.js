import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  organization: {
    type: String,
    default: 'synelution',
  },
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  role: {
    type: String,
    enum: ['worker', 'proofreader'],
    default: 'user',
  },
  subscriptions: [
    {
      endpoint: String,
      expirationTime: String,
      keys: {
        p256dh: String,
        auth: String,
      },
    },
  ],
});

// On Save Hook, encrypt password
// "pre" -> Before saving a model, run this function
userSchema.pre('save', function (next) {
  // get access to the user model
  if (!this.password) next();
  const user = this;
  // generate a salt
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }

    // has (encrypt) the password using salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) {
        return next(err);
      }

      // overwrite plain text password with encrypted password
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword) {
  const userPassword = this.password;
  return new Promise(async (resolve, reject) => {
    try {
      console.log(candidatePassword, userPassword);
      const isMatch = await bcrypt.compare(candidatePassword, userPassword);
      console.log(isMatch);
      resolve(isMatch);
    } catch (err) {
      reject(err);
    }
  });
};

const User = mongoose.model('User', userSchema);

export default User;
