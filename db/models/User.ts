import mongoose, { Document, Schema } from "mongoose";

export type UserDocument = mongoose.Document & {
  username: string;
  email: string;
  fullName: string;
  password: string;
};

const UserSchema = new Schema<UserDocument>(
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
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

UserSchema.set("toJSON", {
  versionKey: false,
});
const User =
  mongoose.models.User || mongoose.model<UserDocument>("User", UserSchema);

export default User;
