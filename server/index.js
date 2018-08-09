"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var http_1 = require("http");
var subscriptions_transport_ws_1 = require("subscriptions-transport-ws");
var graphql_1 = require("graphql");
var schema_1 = require("./schema");
var apollo_server_express_1 = require("apollo-server-express");
var express = require("express");
var WS_PORT = 5000;
// Create WebSocket listener server
var websocketServer = http_1.createServer(function (request, response) {
    response.writeHead(404);
    response.end();
});
// Bind it to port and start listening
websocketServer.listen(WS_PORT, function () { return console.log("Websocket Server is now running on http://localhost:" + WS_PORT); });
var subscriptionServer = subscriptions_transport_ws_1.SubscriptionServer.create({
    schema: schema_1.schema,
    execute: graphql_1.execute,
    subscribe: graphql_1.subscribe
}, {
    server: websocketServer,
    path: '/graphql'
});
// server
// Construct a schema, using GraphQL schema language
var typeDefs = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Query {\n    hello: String\n  }\n"], ["\n  type Query {\n    hello: String\n  }\n"])));
// Provide resolver functions for your schema fields
var resolvers = {
    Query: {
        hello: function () { return 'Hello world!'; }
    }
};
var server = new apollo_server_express_1.ApolloServer({ typeDefs: typeDefs, resolvers: resolvers });
var app = express();
server.applyMiddleware({ app: app });
app.listen({ port: 4000 }, function () {
    return console.log("\uD83D\uDE80 Server ready at http://localhost:4000" + server.graphqlPath);
});
var templateObject_1;
