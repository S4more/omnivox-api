import { objectType, stringArg, nonNull } from "nexus";

export const LeaClass = objectType({
    name: "LeaClass",
    definition(t) {
        t.nonNull.string("id");
        t.nonNull.string("teacher");
        t.nonNull.string("section");
        t.nonNull.string("code");
        t.nonNull.list.string("schedule");
        t.nonNull.int("number");
    }
});
