import { objectType, stringArg, extendType, enumType, nonNull } from "nexus";
import { NexusGenObjects } from "../../nexus-typegen";

export const UserClass = objectType({
    name: "UserClass",
    definition(t) {
        t.nonNull.int("newDocuments");
        t.nonNull.int("newAssignments");
        t.nonNull.field("grade" , {
            type: 'CurrentGrade',
        });
    }
});

export const CurrentGrade = objectType({
    name: "CurrentGrade",
    definition(t) {
        t.nonNull.float("point");
        t.nonNull.float("total");
        t.nonNull.string("percentage");
    }
});
