import request from "request";
import {OmnivoxModule, Params} from "./OmnivoxModule";
import { CookieManager } from "../CookieManager";

export class Login extends OmnivoxModule<void> {
    private readonly url = 'https://dawsoncollege.omnivox.ca/intr/Module/Identification/Login/Login.aspx';

    constructor(cookie: CookieManager, private k: string) {
        super(cookie);
    }

    protected getParams(cookie: string): Params {
        return {
            url: this.url,
            method: 'POST',
            cookie,
            form: {
                k: this.k,
                NoDA: process.env.user_name,
                PasswordEtu: process.env.password
            }
        }
    }

    protected parse(body: request.Response): void {
        //return body.headers["set-cookie"] || [];
    }
}
