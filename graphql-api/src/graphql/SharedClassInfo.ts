import { objectType } from "nexus";

export const SharedClassInfo = objectType({
    name: "SharedClassInfo",
    definition(t) {
        t.nonNull.string("title");
        t.nonNull.string("teacher");
        t.nonNull.string("section");
        t.nonNull.list.nonNull.string("schedule");
        t.nonNull.int("average");
        t.nonNull.int("median");
        t.nonNull.int("distributedDocuments");
        t.nonNull.int("distributedAssignments");
    }
});
