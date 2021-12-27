import { decodeAuthHeader } from "./utils/auth";
import { Request } from "express";

export interface Context {
    id?: string;
}

export const context = ({req}: {req: Request}): Context => {
    const token =
        req && req.headers.authorization
            ? decodeAuthHeader(req.headers.authorization)
            : null;

    return {id: token?.id};
}
