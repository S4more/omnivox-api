import {defaultEncoder} from "qs";
import request from "request";
import {CookieManager} from "../../CookieManager";
import {SearchUser} from "../../types/SearchUser";
import {OmnivoxModule, Params} from "../OmnivoxModule";

export class AddUserAsRecipient extends OmnivoxModule<void> {

    constructor(cookie: CookieManager,
                private user: SearchUser,
                private token: number,
               ) {
        super(cookie);
    }

    protected getParams(cookie: string): Params {
        let serialized:any = this.user;

        serialized["BesoinNewLine"] = "<br />";
        serialized["DebutAlignMiddle"] = "";
        serialized["FinAlignMiddle"] = "";
        delete serialized["DateFinAbsence"];

        return {
            method: 'POST',
            url: 'https://dawsoncollege.omnivox.ca/WebApplication/Commun.SelectionIndividu/Prive/SelectionIndividu.asmx/AjouterItemSelectionne',
            //url: 'http://127.0.0.1:8080',
            cookie,
            json: true,
            form: {
                idRechercheConfig: this.token,
                itemAjout: serialized,
            },
        }
    }

    protected parse(response: request.Response) {
        console.log(response.body);
    }
}
