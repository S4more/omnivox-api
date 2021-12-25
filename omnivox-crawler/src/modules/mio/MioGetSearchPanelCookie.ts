import request from "request";
import {OmnivoxModule, Params} from "../OmnivoxModule";
import { CookieManager } from "../../CookieManager";
import { GetSearchPanelParams } from './MioGetSearchPanel';

export class MioGetSearchPanelCookie extends OmnivoxModule<void> {
    private readonly url = 'https://dawsoncollege.omnivox.ca/WebApplication/Commun.SelectionIndividu/Login.aspx?ReturnUrl=';

    constructor(cookieManager: CookieManager, p: GetSearchPanelParams) {
        super(cookieManager);
        const returnUrl = `%2fWebApplication%2fCommun.SelectionIndividu%2fPrive%2f%3feModeRecherche%3dMessagerieInterneOmnivox%26OidCreateur%3d${p.OidCreateur}%26IdRechercheIndividu%3d-1%26strChampHiddenRecherche%3dctl00_cntFormulaire_hidIdRechercheIndividu%26AnSession%3d${p.AnSession}`;
        this.url += returnUrl;
    }


    protected getParams(cookie: string): Params {
        return {
            url: this.url,
            method: 'GET',
            cookie,
            followRedirect: false
        }
    }

    protected parse(body: request.Response): void {
        //return body.headers["set-cookie"] || [];
    }
}
