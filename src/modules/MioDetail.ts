import { Params, OmnivoxModule } from "./OmnivoxModule";
import request from "request";
import {CookieManager} from "../CookieManager";
import {decodeHTMLCharCodes, decodeHTMLEntities} from "../utils/HTMLDecoder";

export class MioDetail extends OmnivoxModule<string> {
    private readonly url: string = 'https://dawsoncollege.omnivox.ca/WebApplication/Module.MIOE/Commun/Message/MioDetail.aspx';

    constructor(cookieManager: CookieManager, id: string) {
        super(cookieManager);
        this.url = this.url + `?m=${id}`;
    }
    
    protected getParams(cookie: string): Params {
        return {
            url: this.url,
            method: 'GET',
            cookie,
        }
    }

    protected parse(response: request.Response): string {
        const body: string = response.body;

        let messageBody = body.match("<div id='contenuWrapper'>.*<\/div>")![0];
        messageBody = messageBody.substring("<div id='contenuWrapper'>".length,
                                            messageBody.length - "</div>".length);

        const brRegex = new RegExp("<br>", "gm");
        messageBody = messageBody.replace(brRegex, "\n");

        messageBody = decodeHTMLEntities(messageBody);
        messageBody = decodeHTMLCharCodes(messageBody);

        return messageBody;
    }
}
