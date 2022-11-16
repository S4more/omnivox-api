import { objectType, stringArg, extendType, enumType, nonNull, intArg } from "nexus";
import { NexusGenObjects } from "../../nexus-typegen";

export const LeaClass = objectType({
  name: "LeaClass",
  definition(t) {
    t.nonNull.string("code");
    t.nonNull.string("title");
    t.nonNull.string("teacher");
    t.list.nonNull.string("schedule");
    t.nullable.float("average");
    t.nullable.string("grade");
    t.float("median");
    t.int("distributedDocuments");
    t.int("distributedAssignments");
  }
});

export const LeaClassQuery = extendType({
  type: "Query",
  definition(type) {
    type.list.nonNull.field("LeaClass", {
      "type": "LeaClass",
      "args": {
        lookUpType: nonNull("LeaClassLookupType"),
        search: nonNull(stringArg()),
      },
      "resolve": (_, {search}, ctx) => {
        return ctx.leaCache.getClasses(ctx.id!);
      }
    })
  }
})

export const LeaClassLookUpType = enumType({
  name: "LeaClassLookupType",
  members: ["CODE", "NAME"]
});
