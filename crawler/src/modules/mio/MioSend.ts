import request from "request";
import {OmnivoxModule, Params} from "../OmnivoxModule";
import { CookieManager } from "../../CookieManager";
import {MioPostParam} from "./MioGetCompose";

export interface MioSendData {
    title: string;
    message: string;
}

export class MioSend extends OmnivoxModule<void> {
    private readonly url = 'https://dawsoncollege-estd.omnivox.ca/WebApplication/Module.MIOE/Commun/Composer/NouveauMessage2.aspx?C=DAW&E=P&L=ANG';

    constructor(cookie: CookieManager, private form: MioPostParam, data: MioSendData) {
        super(cookie);

        form.ctl00$cntFormulaire$txtSujet = data.title;
        form.ctl00$cntFormulaire$ftbMioNouveau = data.message;
    }

    protected getParams(cookie: string): Params {
        return {
            url: this.url,
            method: 'POST',
            cookie,
            form: this.form,
        }
    }

    protected parse(body: request.Response): void {
        //return body.headers["set-cookie"] || [];
    }
}
