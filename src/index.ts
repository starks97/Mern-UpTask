import express from "express";
import http from "http";
import connectDB from "../src/config/db";
import dotenv from "dotenv";
import AuthRouter from "../src/routes/AuthRoute";
import ProjectRoute from "../src/routes/ProjectRoute";
import TaskRoute from "../src/routes/TaskRoute";

dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
// routing
app.use('/api/user', AuthRouter);
app.use('/api/project', ProjectRoute);
app.use('/api/task', TaskRoute);

app.listen(PORT, () => {
  console.log(`all running good ${PORT}`);
});
