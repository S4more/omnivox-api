import {OmnivoxModule, Params} from "../OmnivoxModule";
import { GetSearchPanelParams } from './MioGetSearchPanel';

export class MioGetSearchPanelCookie extends OmnivoxModule<void> {
  private readonly url = 'https://dawsoncollege.omnivox.ca/WebApplication/Commun.SelectionIndividu/Login.aspx?ReturnUrl=';

  constructor(p: GetSearchPanelParams) {
    super();
    const returnUrl = `%2fWebApplication%2fCommun.SelectionIndividu%2fPrive%2f%3feModeRecherche%3dMessagerieInterneOmnivox%26OidCreateur%3d${p.OidCreateur}%26IdRechercheIndividu%3d-1%26strChampHiddenRecherche%3dctl00_cntFormulaire_hidIdRechercheIndividu%26AnSession%3d${p.AnSession}`;
    this.url += returnUrl;
  }

  public async run() {
    await this.makeGetRequest({ url: this.url });
  }

}
