import * as jwt from "jsonwebtoken";

export const APP_SECRET = "GraphQL-is-aw3some";

export interface AuthTokenPayload {
    id: string;
}

export function decodeAuthHeader(authHeader: string): AuthTokenPayload {
    const token = authHeader.replace("Bearer ", "");
    if (!token) {
        throw new Error("Token not found!");
    }

    return jwt.verify(token, "GraphQL-is-aw3some") as AuthTokenPayload;
}
