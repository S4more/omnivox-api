import request from "request";
import {OmnivoxModule, Params} from "./OmnivoxModule";

export class MioCookie extends OmnivoxModule<string> {
    private readonly url: string = 'https://dawsoncollege.omnivox.ca/WebApplication/Module.MIOE/Login.aspx?ReturnUrl=%2fWebApplication%2fModule.MIOE%2fDefault.aspx';

    parse(response: request.Response): string {
        const answer: string[] | undefined = response.headers["set-cookie"];
        if (answer) {
            const token = answer.find(c => c.startsWith('TKMIOE'))
            if (token) {
                return token;
            }
        }
        return "Couldn't get MioCookie.";

    }

    protected getParams(cookie: string): Params {
        return {
            url: this.url,
            method: 'GET',
            cookie,
            followRedirect: false
        }
    }

}
