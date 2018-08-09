import { ApolloLink, split } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { WebSocketLink } from "apollo-link-ws";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { getMainDefinition } from "apollo-utilities";


/* eslint-disable no-console */
const log = console["log"];
/* eslint-disable no-console */
const error = console["error"];

// logger
const loggerLink = new ApolloLink((operation, forward) => {
  if (process.env.NODE_ENV === "development") {
    console.log(`[GraphQL Logger] ${operation.operationName}`);
  }

  return forward(operation).map(result => {
    if (process.env.NODE_ENV === "development")
      log(`[GraphQL Logger] received result from ${operation.operationName}`);
    return result;
  });
});

// handler error
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {

      return error(
        `[GraphQL error]: Message: ${JSON.stringify(
          message
        )}, Location: ${JSON.stringify(locations)}, Path: ${path}`
      );
    });
  }

  if (networkError) {
    error(`[Network error]: ${networkError}`);
  }
});

// http
const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "same-origin"
});

// ws 方式连接
const GRAPHQL_ENDPOINT = "ws://localhost:5000/graphql";
const client = new SubscriptionClient(GRAPHQL_ENDPOINT, {
  reconnect: true
});
const wsLink = new WebSocketLink(client);

const networkLink = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);

const link = ApolloLink.from([loggerLink, errorLink, networkLink]);

export { link };
