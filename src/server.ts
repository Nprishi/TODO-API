import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/db.ts";
import { Response, Request } from "express";
import { todoRoutes } from "./todo/todo.routes.ts";
import { authRouter } from "./auth/auth.routes.ts";
import { authenticate } from "./middlewares/authentication.middleware.ts";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

// app.use("/todos",authenticate, todoRoutes);

app.use("/todos", todoRoutes);
app.use("/auth", authRouter);

app.get("/", async (_req: Request, res: Response) => {
  res.json({ message: "hello from todo-api" });
});

app.get("/health", async (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

app.listen(3000, () => console.log("listening on http://localhost:3000"));
