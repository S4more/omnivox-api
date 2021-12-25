import { OmnivoxModule, Params } from "../OmnivoxModule";
import request from "request";

export class LeaCookie extends OmnivoxModule<void> {
    readonly url: string = 'https://dawsoncollege.omnivox.ca/intr/Module/ServicesExterne/Skytech.aspx?IdServiceSkytech=Skytech_Omnivox&lk=%2festd%2fcvie&IdService=CVIE&C=DAW&E=P&L=ANG';

    protected parse(response: request.Response): void{
    }

    protected getParams(cookie: string): Params {
        return {
            'url': this.url,
            'method': 'GET',
            cookie,
            followRedirect: false
        }
    }

}
