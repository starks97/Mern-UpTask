import mongoose from "mongoose";

type E = unknown;

async function connectDB(): Promise<void> {
  try {
    const uri:string = process.env.MONGO_URI;
    const connection:typeof mongoose = await mongoose.connect(uri);
    const url: string = `${connection.connection.host}`;

  } catch (error: E) {
    console.log(`error: ${error}`);
    process.exit(1);
  }
};
export default connectDB;
