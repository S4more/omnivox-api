import { objectType, stringArg, extendType, enumType, nonNull } from "nexus";
import { NexusGenObjects } from "../../nexus-typegen";

export const LeaClass = objectType({
    name: "LeaClass",
    definition(t) {
        t.nonNull.string("code");
        t.nonNull.field("sharedInfo", {type: 'SharedClassInfo'});
        t.nonNull.field("userInfo", {type: 'UserClass'})
    }
});

export const LeaClassQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.field("LeaClass", {
            "type": "LeaClass",
            args: {
                search: nonNull(stringArg()),
                lookUpType: nonNull("LeaClassLookupType")
            },
            resolve: (_, {search, lookUpType}, ctx)  => {
                return ctx.leaCache.getClass(ctx.id!, search);
            }
        });
    }
});

let linkExample: NexusGenObjects["LeaClass"] = {
    code: 'ABC-123-DX',
    'sharedInfo': {
        code: 'ABC-123-DX',
        title: 'Example class',
        median: 80,
        average: 75,
        section: '1',
        teacher: 'Noah Labrecque',
        schedule: ['12:00', '13:00'],
        distributedDocuments: 12,
        distributedAssignments: 20
    },
    userInfo: {
        code: 'ABC-123-DX',
        grade: {point: 80, total: 100, percentage: '80%'},
        newDocuments: 1,
        newAssignments: 1
    }
}

export const LeaClassLookUpType = enumType({
    name: "LeaClassLookupType",
    members: ["CODE", "NAME"]
});
