import request from "request";
import {OmnivoxModule, Params} from "./OmnivoxModule";

export class Login extends OmnivoxModule<string[]> {
    private readonly url = 'https://dawsoncollege.omnivox.ca/intr/Module/Identification/Login/Login.aspx';

    constructor(private k: string) {
        super();
    }

    protected getParams(cookie: string): Params {
        return {
            url: this.url,
            method: 'POST',
            cookie,
            form: {
                k: this.k,
                NoDA: process.env.username,
                PasswordEtu: process.env.password
            }
        }
    }

    protected parse(body: request.Response): string[] {
        return body.headers["set-cookie"] || [];
    }
}
