"use strict";
exports.__esModule = true;
var http_1 = require("http");
var subscriptions_transport_ws_1 = require("subscriptions-transport-ws");
var graphql_1 = require("graphql");
var schema_1 = require("./schema");
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
