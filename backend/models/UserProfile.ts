import mongoose from "mongoose";
const Schema = mongoose.Schema;
const objID = Schema.ObjectId;

const userSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  profilePhotoLink: {
    type: String,
  },
  playerID: {
    type: String,
  },
});

export const UserSchema = mongoose.model('UserSchema', userSchema);
