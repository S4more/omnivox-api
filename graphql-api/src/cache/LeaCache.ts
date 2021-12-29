import { NexusGenObjects as gql } from "../../nexus-typegen";

export interface IUserClass {
    class: string,
    user: string,
}

type UserID = string;
type UserInfoMap =  Map<UserID, gql['UserClass']>;

interface CacheLeaClass {
    code: string;
    sharedInfo: gql['SharedClassInfo'];
    usersInfo: UserInfoMap;
}

export class LeaCacheManager {
    classes: Map<string, CacheLeaClass> = new Map();
    constructor() {
        let linkExample: gql["LeaClass"] = {
            code: 'ABC-123-DX',
            'sharedInfo': {
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
                grade: {point: 80, total: 100, percentage: '80%'},
                newDocuments: 1,
                newAssignments: 1
            }
        }
        this.addLeaClass("2035536", linkExample);
    }

    public getAllClassesFromUser(user: UserID) {
        const userClasses: gql['LeaClass'][] =
            [...this.classes.values()]
            .filter(c => c.usersInfo.has(user))
            .map(c => {
                return {code: c.code, sharedInfo: c.sharedInfo, userInfo: c.usersInfo.get(user)!}
            });

        return userClasses;
    }

    private addLeaClass(userID: UserID, leaClass: gql['LeaClass']) {
        let value = this.classes.get(leaClass.code);
        // If the class already exists, just add the user.
        if (!value) {
            const map: UserInfoMap = new Map();
            this.classes.set(leaClass.code, ({code: leaClass.code, sharedInfo: leaClass.sharedInfo, usersInfo: map}));
        }

        this.classes.get(leaClass.code)!.usersInfo.set(userID, leaClass.userInfo);
    }

    public getClass(user: UserID, classCode: string) {
        const c = this.classes.get(classCode);
        if (!c) throw Error("No class found.");
        return this.cacheClassToLeaClass(c, user)
    }

    private cacheClassToLeaClass(cache: CacheLeaClass, user: string): gql['LeaClass']{
        return {code: cache.code, sharedInfo: cache.sharedInfo, userInfo: cache.usersInfo.get(user)!}
    }
}
