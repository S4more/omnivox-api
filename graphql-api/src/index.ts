import { ApolloServer } from "apollo-server";
import { applyMiddleware } from 'graphql-middleware';
import { schema } from "./schema";
import { shield, rule, allow } from 'graphql-shield';
import { context } from "./context";

const isLogged = rule()(async (_, __, ctx, ___) => {
    return (ctx.id != null)
});

const permissions = shield({
    Query: {
        '*': isLogged
    },
    Mutation: {
        '*': isLogged,
        'login': allow,
    }
}, {
        fallbackRule: allow
    }
);

const guardedSchema = applyMiddleware(schema, permissions);

export const server = new ApolloServer({
    schema: guardedSchema,
    context: context
});
const port = 1337;

server.listen({port}).then(({url}) => {
    console.log(`🚀  Server ready at ${url}`);
});
