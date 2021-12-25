import request from "request";
import {Params, OmnivoxModule} from "./OmnivoxModule";

export class NewDocument extends OmnivoxModule<string[]> {
    private readonly url: string = 'https://dawsoncollege.omnivox.ca/intr/webpart.ajax?IdWebPart=00000000-0000-0000-0003-000000000008&L=ENG'

    protected getParams(cookie: string): Params {
        return {
            url: this.url,
            method: 'GET',
            cookie
        }
    }

    protected parse(response: request.Response): string[] {
        let body: string = response.body;
        let left_index = body.search("xmlns=\"\"");
        const rows = [];

        while (left_index != -1) {
            let trimmed_body = body.substring(left_index + "xmlns=\"\">".length);
            let right = trimmed_body.search("</title>");
            rows.push(trimmed_body.substring(0, right));
            body = trimmed_body.substring(right + "</title>".length);
            left_index = body.search("xmlns=\"\"");
        }
        return rows;
    }

}
