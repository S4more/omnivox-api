import request from "request";
import {Params, OmnivoxModule} from "./OmnivoxModule";

export class NewDocument extends OmnivoxModule<string> {
    private readonly url: string = 'https://dawsoncollege.omnivox.ca/intr/webpart.ajax?IdWebPart=00000000-0000-0000-0003-000000000008&L=ENG'

    protected getParams(cookie: string): Params {
        return {
            url: this.url,
            method: 'GET',
            cookie
        }
    }

    protected parse(response: request.Response): string {
        let body = response.body;
        const left = body.search("xmlns=\"\"");
        body = body.substring(left + "xmlns=\"\">".length);
        body = body.substring(0, body.search("</title>"));
        return body;
    }

}
