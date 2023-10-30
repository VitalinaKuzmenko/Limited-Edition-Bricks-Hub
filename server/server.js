import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import resolvers from "./graphql/resolvers.js";
import typeDefs from "./graphql/schema.js";

const app = express();
const httpServer = http.createServer(app);

//Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

app.use(cors(), bodyParser.json(), expressMiddleware(server));

const port = process.env.PORT || 4000;
await new Promise((resolve) => httpServer.listen({ port: port }, resolve));
console.log(`🚀 Server ready at http://localhost:4000`);
