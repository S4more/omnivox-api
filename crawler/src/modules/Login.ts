import request from "request";
import {OmnivoxModule, Params} from "./OmnivoxModule";
import { CookieManager } from "../CookieManager";
import {LeaLoginError} from "../errors/LoginError";

export class Login extends OmnivoxModule<void> {
    private readonly url = 'https://dawsoncollege.omnivox.ca/intr/Module/Identification/Login/Login.aspx';

    constructor(cookie: CookieManager,
                private k: string,
                private username: string,
                private password: string) {
        super(cookie);
    }

    protected getParams(cookie: string): Params {
        return {
            url: this.url,
            method: 'POST',
            cookie,
            form: {
                k: this.k,
                NoDA: this.username,
                PasswordEtu: this.password
            },
        }
    }

    protected parse(body: request.Response): void {
        if (!body.headers["set-cookie"]!.some(cookie => cookie.includes("TKSDAWP"))) {
            throw new LeaLoginError(`Couldn't connect to lea with id ${process.env.user_name}`);
        }
        //return body.headers["set-cookie"] || [];
    }
}
