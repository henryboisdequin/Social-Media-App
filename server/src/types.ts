import { Request, Response } from "express";
import { Redis } from "ioredis";
import { createLikeLoader } from "./utils/createLikeLoader";
import { createUserLoader } from "./utils/createUserLoader";

export type MyContext = {
  req: Request & { session: Express.Session };
  res: Response;
  redis: Redis;
  userLoader: ReturnType<typeof createUserLoader>;
  updootLoader: ReturnType<typeof createLikeLoader>;
};
