import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const clientLinkSchema = new mongoose.Schema({
  uuid: {
    type: String,
    default: uuidv4,
  },
  client: String,
  type: String,
  from: String,
  to: String,
  createdAt: {
    type: Date,
    default: date.now,
  },
});

const ClientLink = mongoose.model('ClientLink', clientLinkSchema);
export default ClientLink;
