import { extendType, nonNull, stringArg, objectType, mutationField } from "nexus";
import * as jwt from "jsonwebtoken";
import { login } from "omnivox-crawler";
import { ApolloError } from "apollo-server-express";

export const AuthPayload = objectType({
  name: "AuthPayload",
  definition(t) {
    t.nullable.string("token");
  },
});

export const AuthMutation = mutationField('login', {
  type: 'AuthPayload',
  args: {
    id: nonNull(stringArg()),
    password: nonNull(stringArg())
  },
  async resolve(parent, args, context) {
    console.log(args.id, args.password);
    if (await login(args.id, args.password)) {
      context.leaCache.addClassesFromUser(args.id, args.password);
      const token = jwt.sign({id: args.id}, "GraphQL-is-aw3some", {expiresIn: "60m"});
      return {
        token
      }
    }

    console.log("wrong username")
    throw new ApolloError("Wrong username!", "USER_ERROR");
  }
});
