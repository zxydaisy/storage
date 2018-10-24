
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';
import { schema } from './schema';
import { graphqlUploadExpress } from 'graphql-upload';
import {
  ApolloServer
} from "apollo-server-express";
import * as express from 'express';

const WS_PORT = 5000;
// Create WebSocket listener server
const websocketServer = createServer((request, response) => {
  response.writeHead(404);
  response.end();
});

// Bind it to port and start listening
websocketServer.listen(WS_PORT, () => console.log(
  `Websocket Server is now running on http://localhost:${WS_PORT}`
));

const app = express();
const server = new ApolloServer({ schema });
server.applyMiddleware({ app });

app
  .use(
    '/graphql',
    graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }), // 上传处理的中间件
  ).listen({ port: 4000 }, () => {
    console.log(`🚀 Server ready at http://localhost:4000/graphql`),
    SubscriptionServer.create(
      {
        schema,
        execute,
        subscribe,
      },
      {
        server: websocketServer, // 启动 websocket 服务
        path: '/graphql',
      },
    );
  }
);