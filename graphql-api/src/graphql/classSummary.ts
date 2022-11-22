import { objectType, stringArg, extendType, enumType, nonNull, intArg } from "nexus";

export const Document = objectType({
  name: "Document",
  definition(t) {
    t.nonNull.string("name");
    t.nonNull.string("description");
    t.nonNull.string("posted");
    t.nonNull.boolean("viewed");
  },
})

export const Category = objectType({
  name: "Category",
  definition(t) {
    t.nonNull.string("name");
    t.nonNull.field("document", {type: "Document"})
  }
});
