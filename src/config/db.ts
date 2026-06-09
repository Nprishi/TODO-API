import mongoose from "mongoose";

type MongoDBCredentials = {
  username: string;
  password: string;
  host: string;
  port: number;
  database: string;
};

export async function connectDB(): Promise<void> {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL missing");
  await mongoose.connect(url);
  console.log("MongoDB connected");
}
