import request from "request";
import { parse } from "node-html-parser";
import {OmnivoxModule, Params} from "../OmnivoxModule";

export interface MioPostParam {
    __EVENTARGUMENT: "",
    __EVENTTARGET: "ctl00$cntFormulaire$btnSend",
    __VIEWSTATE: string,
    __VIEWSTATEGENERATOR: "A398920C",
    __VIEWSTATEENCRYPTED: "",
    ctl00$cntFormulaire$hidIdRechercheIndividu: string,
    ctl00$cntFormulaire$txtFastFind: "",
    ctl00$cntFormulaire$txtSujet: string,
    ctl00_cntFormulaire_ftbMioNouveau_dialogOpener_Window_ClientState: "",
    ctl00_cntFormulaire_ftbMioNouveau_dialogOpener_ClientState: "",
    ctl00$cntFormulaire$ftbMioNouveau: string,
    ctl00_cntFormulaire_ftbMioNouveau_ClientState:"",
    ctl00$cntFormulaire$lnkActionBrouillon: "",
    ctl00$cntFormulaire$hidMsgDraftGuid: string
    ctl00$cntFormulaire$hidNewAttach: "",
    ctl00$cntFormulaire$hidAjoutDestinataires: "",
    ctl00$cntFormulaire$hidAjoutDestinatairesToList: "",
    ctl00$cntFormulaire$hidAjout: string,
    ctl00$cntFormulaire$confirmRetour$btnAction: "",
    ctl00$cntFormulaire$confirmEnvoi$btnAction: "",
    ctl00$hidScrollY: "",
}

export class MioGetCompose extends OmnivoxModule<MioPostParam> {
    readonly url: string = 'https://dawsoncollege-estd.omnivox.ca/WebApplication/Module.MIOE/Commun/Composer/NouveauMessage2.aspx';
    // WORKFLOW to add:
        // 1. Create a research config
        // 2. Search for new user by name
        // 3. Get new user and push it to research config
        // 4. Just send the config.
    protected parse(response: request.Response): MioPostParam {
        const root = parse(response.body);
        const __VIEWSTATE: string = (<any>root.querySelector("#__VIEWSTATE"))._attrs.value;
        const ctl00$cntFormulaire$hidIdRechercheIndividu: string = "759019569323558";
        // 759054600755421 -> that's noah.
        const ctl00$cntFormulaire$hidMsgDraftGuid: string = (<any>root.querySelector("#hidMsgDraftGuid"))._attrs.value;
        const ctl00$cntFormulaire$txtSujet: string = "A message to myself";
        const ctl00$cntFormulaire$ftbMioNouveau: string = "Hey%2c does it work%3f";
        const ctl00$cntFormulaire$hidAjout: string = (<any>root.querySelector("#hidAjout"))._attrs.value;


        return {
            __EVENTARGUMENT: "",
            __EVENTTARGET: "ctl00$cntFormulaire$btnSend",
            __VIEWSTATE,
            __VIEWSTATEGENERATOR: "A398920C",
            __VIEWSTATEENCRYPTED: "",
            ctl00$cntFormulaire$hidIdRechercheIndividu,
            ctl00$cntFormulaire$txtFastFind: "",
            ctl00$cntFormulaire$txtSujet,
            ctl00_cntFormulaire_ftbMioNouveau_dialogOpener_Window_ClientState: "",
            ctl00_cntFormulaire_ftbMioNouveau_dialogOpener_ClientState: "",
            ctl00$cntFormulaire$ftbMioNouveau,
            ctl00_cntFormulaire_ftbMioNouveau_ClientState:"",
            ctl00$cntFormulaire$lnkActionBrouillon: "",
            ctl00$cntFormulaire$hidMsgDraftGuid,
            ctl00$cntFormulaire$hidNewAttach: "",
            ctl00$cntFormulaire$hidAjoutDestinataires: "",
            ctl00$cntFormulaire$hidAjoutDestinatairesToList: "",
            ctl00$cntFormulaire$hidAjout,
            ctl00$cntFormulaire$confirmRetour$btnAction: "",
            ctl00$cntFormulaire$confirmEnvoi$btnAction: "",
            ctl00$hidScrollY: "",
        }


    }

    protected getParams(cookie: string): Params {
        return {
            url: this.url,
            cookie: cookie,
            method: 'GET'
        }
    }
}




