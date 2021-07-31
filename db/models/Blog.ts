import mongoose, { Document, Schema } from "mongoose";
import slugify from "slugify";
import { UserDocument } from "./User";

export type BlogDocument = mongoose.Document & {
  title: string;
  content: string;
  slug: string;
  featureImageUrl: string;
  user: UserDocument;
};

const BlogSchema = new Schema<BlogDocument>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
    },
    featureImageUrl: {
      type: String,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

BlogSchema.pre("save", function save(next) {
  const blog = this as BlogDocument;

  blog.slug = slugify(this.title, {
    replacement: "-",
    lower: true,
    strict: false,
  });
  next();
});

BlogSchema.set("toJSON", {
  versionKey: false,
});

const Blog =
  mongoose.models.Blog ||
  mongoose.model<BlogDocument>("Blog", BlogSchema);

export default Blog;
