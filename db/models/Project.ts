import mongoose, { Document, Schema } from "mongoose";
import slugify from "slugify";
import { UserDocument } from "./User";

export type ProjectDocument = mongoose.Document & {
  title: string;
  description: string;
  slug: string;
  projectUrl: string;
  projectType: string;
  demoUrl: string;
  tags: string;
  user: UserDocument;
};

const ProjectSchema = new Schema<ProjectDocument>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    projectType: {
      type: String,
    },
    projectUrl: {
      type: String,
    },
    slug: {
      type: String,
    },
    tags: [{
      type: String,
    }],
    demoUrl: {
      type: String,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

ProjectSchema.pre("save", function save(next) {
  const project = this as ProjectDocument;

  project.slug = slugify(this.title, {
    replacement: "-",
    lower: true,
    strict: false,
  });
  next();
});

ProjectSchema.set("toJSON", {
  versionKey: false,
});

const Project =
  mongoose.models.Project ||
  mongoose.model<ProjectDocument>("Project", ProjectSchema);

export default Project;
