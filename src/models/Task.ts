import mongoose, { Schema, model, Document } from "mongoose";
import { ProjectProps } from "../models/Project";

export interface TaskProps extends mongoose.Document {
  name: string;
  description: string;
  state: boolean;
  date?: Date;
  priority: string;
  project?: ProjectProps;
}

enum PriorityType {
  Low = "Low",
  Medium = "Medium",
  High = "High",
}

const Task = new Schema<TaskProps, mongoose.Model<TaskProps>>(
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
    state: {
      type: Boolean,
      default: false,
    },
    date: {
      type: Date,
      default: new Date(),
    },
    priority: {
      type: String,
      required: true,
      enum: PriorityType,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  },
  {
    timestamps: true,
  }
);

const TaskSchema: mongoose.Model<TaskProps, {}, {}, {}> = model<TaskProps>(
  "Task",
  Task
);

export default TaskSchema;
