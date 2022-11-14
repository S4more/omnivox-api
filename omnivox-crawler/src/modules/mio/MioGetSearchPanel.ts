import {OmnivoxModule} from "../OmnivoxModule";
import { parse } from "node-html-parser";

export interface GetSearchPanelParams {
  OidCreateur: string,
  AnSession: string,
}

export class MioGetSearchPanel extends OmnivoxModule<number> {
  private readonly url = 'https://dawsoncollege.omnivox.ca/WebApplication/Commun.SelectionIndividu/Prive/?eModeRecherche=MessagerieInterneOmnivox';

  constructor(p: GetSearchPanelParams) {
    super();
    const params = `&OidCreateur=${p.OidCreateur}&IdRechercheIndividu=-1&strChampHiddenRecherche=ctl00_cntFormulaire_hidIdRechercheIndividu&AnSession=${p.AnSession}`;
    this.url += params;
  }

  public async getSearchParameters() {
    const response = await this.makeGetRequest({
      url: this.url,
    })
    return this.parse(response.data);
  }

  protected parse(data: string): number {
    const body = parse(data);
    const scripts = body.getElementsByTagName("script");
    const text = scripts[scripts.length - 1].innerHTML;
    let id = text.match("IdRechercheIndividu = .*;");
    if (id == null) return -1;

    return parseInt(id[0].substring(id[0].indexOf("= ") + 2, id[0].length - 1));
  }
}
