import {OmnivoxModule } from "../OmnivoxModule";

export class MioSaveRecipient extends OmnivoxModule<void> {
  readonly url = 'https://dawsoncollege.omnivox.ca/WebApplication/Commun.SelectionIndividu/Prive/SelectionIndividu.asmx/Sauvegarder';

  constructor( private token: number ) {
    super();
  }

  public async run() {
    await this.makePostRequest({
      url: this.url,
      body: {
        "idRechercheIndividu": this.token,
        "idRechercheIndividuParent": this.token,
      },
    }, true);
  }
}
