import {Requester} from "../OmnivoxModule";
import {MioPostParam} from "./MioGetCompose";

export interface MioSendData {
  title: string;
  message: string;
}

const url = 'https://dawsoncollege-estd.omnivox.ca/WebApplication/Module.MIOE/Commun/Composer/NouveauMessage2.aspx?C=DAW&E=P&L=ANG';
export default async function sendMio(form: MioPostParam, data: MioSendData) {
    form.ctl00$cntFormulaire$txtSujet = data.title;
    form.ctl00$cntFormulaire$ftbMioNouveau = data.message;

    await Requester.makePostRequest({ url: url, body: form }, true);
}
