import { OmnivoxModule, Params } from "../OmnivoxModule";
import request from "request";

export class LeaSkyCookie extends OmnivoxModule<void> {
    readonly url: string = 'https://www-daw-ovx.omnivox.ca/cvir/Service.aspx?cxvir=o&/estd/cvie';

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
