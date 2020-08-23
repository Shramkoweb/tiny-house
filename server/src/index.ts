import express from "express";
import { ApolloServer } from "apollo-server-express";

import {
  resolvers,
  typeDefs
} from "./graphql";

const PORT = 9000;
const app = express();

const server = new ApolloServer({typeDefs, resolvers});
server.applyMiddleware({app, path: "/api"});

app.listen(PORT, () => {
  console.log(`[app]: http://localhost:${PORT}`);
});
