import { makeExecutableSchema } from 'graphql-tools';
import { GraphQLUpload } from 'graphql-upload';

const typeDefs = `
  scalar Upload
  type Query {
    hello: String
  }
`;

const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    hello: () => 'Hello world!',
  },
};

export const schema = makeExecutableSchema({ typeDefs, resolvers });
