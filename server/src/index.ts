import path from "path";
import { createConnection } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";

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
    entities: [],
  });

  // Create server
  const app = express();

  // Create REST Endpoint
  app.get("/", (_, res) => {
    res.send("🚀 Social Media App API");
  });

  // Create graphql server
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver],
      validate: false,
    }),
  });

  // Create graphql endpoint
  apolloServer.applyMiddleware({ app });

  // Put server on PORT
  app.listen(PORT, () => {
    console.log(`🚀 Server is starting on localhost:${PORT}`);
  });
};

// Run app
main(4000).catch((err) => console.error(err));
