import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  fullName: string;
  password: string;

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
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

UserSchema.set("toJSON", {
  versionKey: false,
});

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);