import {OmnivoxModule} from "../OmnivoxModule";
import {MioPostParam} from "./MioGetCompose";

export interface MioSendData {
  title: string;
  message: string;
}

export class MioSend extends OmnivoxModule<void> {
  private readonly url = 'https://dawsoncollege-estd.omnivox.ca/WebApplication/Module.MIOE/Commun/Composer/NouveauMessage2.aspx?C=DAW&E=P&L=ANG';

  constructor(private form: MioPostParam, data: MioSendData) {
    super();

    form.ctl00$cntFormulaire$txtSujet = data.title;
    form.ctl00$cntFormulaire$ftbMioNouveau = data.message;
  }

  public async run() {
    await this.makePostRequest({
      url: this.url,
      body: this.form
    }, true);
  }
}
