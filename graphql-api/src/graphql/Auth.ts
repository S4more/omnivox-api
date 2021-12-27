import { extendType, nonNull, stringArg, objectType } from "nexus";
import * as jwt from "jsonwebtoken";
import { login } from "omnivox-crawler";

export const AuthPayload = objectType({
    name: "AuthPayload",
    definition(t) {
        t.nullable.string("token");
    },
});

export const AuthMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("login", {
            type: "AuthPayload",
            args: {
                id: nonNull(stringArg()),
                password: nonNull(stringArg())
            },
            async resolve(parent, args, context) {
                try {
                    await login(args.id, args.password);
                } catch (error) {
                    return {}
                }
                const token = jwt.sign({id: args.id}, "GraphQL-is-aw3some", {expiresIn: "5m"});
                return {
                    token
                }
            }
        })
    }
})
