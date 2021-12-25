import request from "request";
import {OmnivoxModule, Params} from "../OmnivoxModule";
import { CookieManager } from "../../CookieManager";
import {SearchUser, SearchUserWrapper} from "../../types/SearchUser";

export interface SearchUserParam {
    'idRechercheIndividu': number,
    name: string,
}

export class MioSearchUser extends OmnivoxModule<SearchUser[]> {
    private readonly url = 'https://dawsoncollege.omnivox.ca/WebApplication/Commun.SelectionIndividu/Prive/SelectionIndividu.asmx/LancerRecherche';
    private form = {};

    constructor(cookie: CookieManager, searchUserParam: SearchUserParam) {
        super(cookie);
        this.form = {
            idRechercheIndividu: searchUserParam.idRechercheIndividu,
            motCleRecherche: searchUserParam['name'],
            toujoursAfficherDescription: false
        };
    }

    protected getParams(cookie: string): Params {
        return {
            url: this.url,
            method: 'POST',
            cookie,
            json: true,
            form: this.form,
        }
    }

    protected parse(response: request.Response): SearchUser[] {
        const searchResult: SearchUser[] = (response.body as SearchUserWrapper).d.ItemsSelectionnes;
        return searchResult; 
    }
}
