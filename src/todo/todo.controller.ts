import { Router, Request, Response } from "express";
import { createTodoSchema, CreateTodoDto } from "./model/schema/todo.schema.ts";
import {
  getTodos as getTodoService,
  createTodo as createTodoService,
  getTodoById as getTodoByIdService,
} from "./todo.service.ts";
import { getCache } from "../cache/cache.service.ts";
import { setCache } from "../cache/cache.service.ts";

export const getTodos = async (_req: Request, res: Response) => {
  try {
    const CASHE_TTL = 300;

    const cachedTodos = await getCache("todos");
    if (cachedTodos) {
      return res.json(cachedTodos);
    }
    const todos = await getTodoService();
    await setCache("todos", todos, CASHE_TTL);
    res.json(todos);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const createTodo = async (req: Request, res: Response) => {
  try {
    let { title } = req.body ?? ({} as CreateTodoDto);

    const todo = await createTodoService({ title, completed: false });
    res.status(201).json(todo);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getTodoById = async (req: Request, res: Response) => {
  try {
    const todo = await getTodoByIdService(req.params.id as string);
    res.json(todo);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
