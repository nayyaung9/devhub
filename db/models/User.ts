import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  fullName: string;
}

const UserSchema: Schema = new Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    fullName: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
