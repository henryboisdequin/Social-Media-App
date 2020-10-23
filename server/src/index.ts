import path from "path";
import { createConnection } from "typeorm";
import { Hello } from "./entities/Hello";
import express from "express";

const main = async (PORT: number) => {
  // Create the connection
  const conn = await createConnection({
    type: "postgres",
    database: "socialMediaApp",
    username: "postgres",
    password: "postgres",
    logging: true,
    synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    // entities = database tables
    entities: [Hello],
  });

  // Create server
  const app = express();

  // Put server on PORT
  app.get("/", (_, res) => {
    res.send("Hello World!");
  });

  app.listen(PORT, () => {
    console.log(`🚀 Server is starting on localhost:${PORT}`);
  });
};

// Run app
main(4000).catch((err) => console.error(err));
