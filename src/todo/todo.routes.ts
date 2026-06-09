import { Request, Response, Router } from "express";
import { validate } from "../middlewares/validation.middleware.ts";
import { createTodoSchema, CreateTodoDto } from "./model/schema/todo.schema.ts";
import { getTodos, createTodo, getTodoById } from "./todo.controller.ts";

export const todoRoutes = Router();


todoRoutes.get("/", getTodos);
todoRoutes.post("/", validate(createTodoSchema), createTodo);
todoRoutes.get("/:id", getTodoById);
