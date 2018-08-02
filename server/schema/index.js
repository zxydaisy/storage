"use strict";
exports.__esModule = true;
var graphql_1 = require("graphql");
exports.schema = new graphql_1.GraphQLSchema({
    query: new graphql_1.GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            hello: {
                type: graphql_1.GraphQLString,
                resolve: function () {
                    return 'world';
                }
            }
        }
    })
});
