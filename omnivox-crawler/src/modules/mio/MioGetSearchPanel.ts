import request from "request";
import {OmnivoxModule, Params} from "../OmnivoxModule";
import { CookieManager } from "../../CookieManager";
import { parse } from "node-html-parser";

export interface GetSearchPanelParams {
    OidCreateur: string,
    AnSession: string,
}

export class MioGetSearchPanel extends OmnivoxModule<number> {
    private readonly url = 'https://dawsoncollege.omnivox.ca/WebApplication/Commun.SelectionIndividu/Prive/?eModeRecherche=MessagerieInterneOmnivox';

    constructor(cookieManager: CookieManager, p: GetSearchPanelParams) {
        super(cookieManager);
        const params = `&OidCreateur=${p.OidCreateur}&IdRechercheIndividu=-1&strChampHiddenRecherche=ctl00_cntFormulaire_hidIdRechercheIndividu&AnSession=${p.AnSession}`;
        this.url += params;
    }


    protected getParams(cookie: string): Params {
        return {
            url: this.url,
            method: 'GET',
            cookie,
            followRedirect: false
        }
    }

    protected parse(response: request.Response): number {
        const body = parse(response.body);
        const scripts = body.getElementsByTagName("script");
        const text = scripts[scripts.length - 1].innerHTML;
        let id = text.match("IdRechercheIndividu = .*;");
        if (id == null) return -1;

        return parseInt(id[0].substring(id[0].indexOf("= ") + 2, id[0].length - 1));
    }
}
