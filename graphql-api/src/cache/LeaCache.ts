import { NexusGenObjects as gql } from "../../nexus-typegen";
import {Cache} from "./Cache";

export interface IUserClass {
    class: string,
    user: string,
}

export class LeaCacheManager {
    readonly classInfo: Cache<gql['LeaClass']> = new Cache;
    readonly userClass: Cache<gql['UserClass']> = new Cache;
    //readonly userClassInfo: Cache<
    //readonly userClassInfo: Map<IUserClass, gql['LeaClass']> = new Map();
}
