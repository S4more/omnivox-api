import request from "request";
import { parse } from "node-html-parser";
import {OmnivoxModule, Params} from "../OmnivoxModule";

export interface MioPostParam {
    __EVENTARGUMENT: "",
    __EVENTTARGET: "ctl00$cntFormulaire$btnSend",
    __VIEWSTATE: string,
    __VIEWSTATEGENERATOR: "A398920C",
    __VIEWSTATEENCRYPTED: "",
    /** The recipients of the mio identifier */
    ctl00$cntFormulaire$hidIdRechercheIndividu?: string,
    ctl00$cntFormulaire$txtFastFind: "",
    /** The subject of the mio */
    ctl00$cntFormulaire$txtSujet?: string,
    ctl00_cntFormulaire_ftbMioNouveau_dialogOpener_Window_ClientState: "",
    ctl00_cntFormulaire_ftbMioNouveau_dialogOpener_ClientState: "",
    /** The text of the mio */
    ctl00$cntFormulaire$ftbMioNouveau?: string,
    ctl00_cntFormulaire_ftbMioNouveau_ClientState:"",
    ctl00$cntFormulaire$lnkActionBrouillon: "",
    ctl00$cntFormulaire$hidMsgDraftGuid: string
    ctl00$cntFormulaire$hidNewAttach: "",
    ctl00$cntFormulaire$hidAjoutDestinataires: "",
    ctl00$cntFormulaire$hidAjoutDestinatairesToList: "",
    /** The user id */
    ctl00$cntFormulaire$hidAjout: string,
    ctl00$cntFormulaire$confirmRetour$btnAction: "",
    ctl00$cntFormulaire$confirmEnvoi$btnAction: "",
    ctl00$hidScrollY: "",
}

export class MioGetCompose extends OmnivoxModule<MioPostParam> {
    readonly url: string = 'https://dawsoncollege-estd.omnivox.ca/WebApplication/Module.MIOE/Commun/Composer/NouveauMessage2.aspx';

    protected parse(response: request.Response): MioPostParam {
        const root = parse(response.body);
        const __VIEWSTATE: string = (<any>root.querySelector("#__VIEWSTATE"))._attrs.value;
        const ctl00$cntFormulaire$hidMsgDraftGuid: string = (<any>root.querySelector("#hidMsgDraftGuid"))._attrs.value;
        const ctl00$cntFormulaire$hidAjout: string = (<any>root.querySelector("#hidAjout"))._attrs.value;

        return {
            __EVENTARGUMENT: "",
            __EVENTTARGET: "ctl00$cntFormulaire$btnSend",
            __VIEWSTATE,
            __VIEWSTATEGENERATOR: "A398920C",
            __VIEWSTATEENCRYPTED: "",
            ctl00$cntFormulaire$txtFastFind: "",
            ctl00_cntFormulaire_ftbMioNouveau_dialogOpener_Window_ClientState: "",
            ctl00_cntFormulaire_ftbMioNouveau_dialogOpener_ClientState: "",
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
