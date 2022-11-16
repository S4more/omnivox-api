import { decodeAuthHeader } from "./utils/auth";
import { LeaCacheManager } from "./cache/LeaCache";
import { Request } from "express";

export interface Context {
  id?: string;
  leaCache: LeaCacheManager;
}

const leaCache = new LeaCacheManager();

export const context = ({req}: {req: Request}): Context => {
  const token = req && req.headers.authorization ? decodeAuthHeader(req.headers.authorization) : null;

  return {id: token?.id, leaCache};
}
