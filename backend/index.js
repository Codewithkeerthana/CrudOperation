
const { ApolloServer } = require("@apollo/server");

const { expressMiddleware } = require("@apollo/server/express4");

const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");

const express = require("express");

const http = require("http");

const cors = require("cors");

const bodyParser = require("body-parser");

const { resolvers } = require("./schema/resolvers");

const { typeDefs } = require("./schema/type-defs");

//const serverConfig = require("./configs/server.config");

//const db = require("./models");

(async () => {
  const app = express();

  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,

    resolvers,

    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    "/",

    cors(),

    bodyParser.json(), // expressMiddleware accepts the same arguments: // an Apollo Server instance and optional configuration options

    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    })
  );

  await new Promise((resolve) =>
    httpServer.listen({ port: 8000 }, resolve)
  );

  console.log(`🚀 Server ready at http://localhost:${8000}/`);
})();
