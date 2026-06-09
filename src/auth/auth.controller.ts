import { Request, Response } from "express";
import { CreateUserDto } from "../user/schema/user.schema.ts";
import { getUserByEmail, createUser } from "../user/user.service.ts";
import { LoginDto } from "./schema/login.schema.ts";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/auth.utils.ts";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as LoginDto;
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id.toString());
    res.json({ access_token: token });
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Internal Server Error" });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as CreateUserDto;
    const user = await createUser({ email, password });
    res.status(201).json({ message: "User registered successfully", user: {email: user.email } });
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Internal Server Error" });
  }
};
