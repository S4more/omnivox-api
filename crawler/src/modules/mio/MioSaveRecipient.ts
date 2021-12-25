import {defaultEncoder} from "qs";
import request from "request";
import {CookieManager} from "../../CookieManager";
import {SearchUser} from "../../types/SearchUser";
import {OmnivoxModule, Params} from "../OmnivoxModule";

export class MioSaveRecipient extends OmnivoxModule<void> {

    constructor(cookie: CookieManager,
                private token: number,
               ) {
        super(cookie);
    }

    protected getParams(cookie: string): Params {
        return {
            method: 'POST',
            url: 'https://dawsoncollege.omnivox.ca/WebApplication/Commun.SelectionIndividu/Prive/SelectionIndividu.asmx/Sauvegarder',
            cookie,
            json: true,
            form: {
                "idRechercheIndividu": this.token,
                "idRechercheIndividuParent": this.token,
            },
        }
    }

    protected parse(response: request.Response) {
        console.log(response.body);
    }
}
