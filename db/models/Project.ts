import mongoose, { Document, Schema } from "mongoose";
// import slugify from "slugify";
import { UserDocument } from "./User";

export type ProjectDocument = mongoose.Document & {
  title: string;
  description: string;
  slug: string;
  projectUrl: string;
  tags: string;
  user: UserDocument;
};

const ProjectSchema = new Schema<ProjectDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    projectUrl: {
      type: String,
    },
    tags: {
      type: String,
    },
  },
  { timestamps: true }
);

ProjectSchema.pre("save", function save(next) {
  const product = this as ProjectDocument;

  // product.slug = slugify(this.title, {
  //   replacement: "-",
  //   lower: true,
  //   strict: false,
  // });
  next();
});

ProjectSchema.set("toJSON", {
  versionKey: false,
});

const Project =
mongoose.models.Project ||
  mongoose.model<ProjectDocument>("Project", ProjectSchema);

export default Project;
