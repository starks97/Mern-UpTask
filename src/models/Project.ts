import mongoose, { Schema, model, Document } from "mongoose";

export interface ProjectProps extends mongoose.Document {
  name: string;
  description: string;
  date?: Date;
  client: string;
  owner: object | string;
  colaborators: string[];
  timestamp?: number;
  id: string;
}

const Project = new Schema<ProjectProps, mongoose.Model<ProjectProps>>(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    date: {
      type: Date,
      default: new Date(),
    },
    client: {
      type: String,
      trim: true,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    colaborators: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const ProjectSchema: mongoose.Model<ProjectProps, {}, {}, {}> =
  model<ProjectProps>("Project", Project);
export default ProjectSchema;
