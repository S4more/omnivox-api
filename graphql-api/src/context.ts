import { decodeAuthHeader } from "./utils/auth";
//import { LeaCache } from "./cache/LeaCache";
import { Request } from "express";

export interface Context {
    id?: string;
    //leaCache?: {;
}

//const leaCache = new LeaCache();

export const context = ({req}: {req: Request}): Context => {
    const token =
        req && req.headers.authorization
            ? decodeAuthHeader(req.headers.authorization)
            : null;

    return {id: token?.id};
}
