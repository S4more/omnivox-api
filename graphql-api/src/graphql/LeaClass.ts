import { objectType, stringArg, extendType, enumType, nonNull } from "nexus";
import { NexusGenObjects } from "../../nexus-typegen";

export const LeaClass = objectType({
    name: "LeaClass",
    definition(t) {
        t.nonNull.string("title");
        t.nonNull.string("teacher");
        t.nonNull.string("section");
        t.nonNull.string("code");
        t.nonNull.list.nonNull.string("schedule");
        t.nonNull.int("number");
    }
});

export const LeaClassQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.field("leaClass", {
            "type": "LeaClass",
            args: {
                search: nonNull(stringArg()),
                lookUpType: nonNull("LeaClassLookupType")
            },
            resolve: (_, {search, lookUpType}, __)  => {
                return linkExample;
            }
        });
    }
});

let linkExample: NexusGenObjects["LeaClass"] = {
    title: 'Example class',
    number: 1,
    schedule: ['11:30 a.m', '11:40 a.m'],
    section: '0001',
    code: '230-ABX-DW',
    teacher: 'Nas',
}

export const LeaClassLookUpType = enumType({
    name: "LeaClassLookupType",
    members: ["CODE", "NAME"]
});
