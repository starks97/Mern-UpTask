import mongoose, { Schema, model, Document } from "mongoose";

export interface IUser extends mongoose.Document {
  name: string;
  password: string;
  email: string;
  token: string;
  confirm?: boolean;
  timestamp?: number;
  id: string;
};

const UserSchema = new Schema<IUser, mongoose.Model<IUser>>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    token: {
      type: String,
    },
    confirm: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel: mongoose.Model<IUser, {}, {}, {}> = model<IUser>(
  "User",
  UserSchema
);
export default UserModel;
export function findOne(arg0: { email: string; }) {
    throw new Error("Function not implemented.");
}

