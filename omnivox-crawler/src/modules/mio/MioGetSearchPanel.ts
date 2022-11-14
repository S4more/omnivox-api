import { Requester } from "../OmnivoxModule";
import { parse } from "node-html-parser";

export interface GetSearchPanelParams {
  OidCreateur: string,
  AnSession: string,
}

const url = 'https://dawsoncollege.omnivox.ca/WebApplication/Commun.SelectionIndividu/Prive/?eModeRecherche=MessagerieInterneOmnivox';
export default async function getMioSearchPanel(p: GetSearchPanelParams) {
  const params = `&OidCreateur=${p.OidCreateur}&IdRechercheIndividu=-1&strChampHiddenRecherche=ctl00_cntFormulaire_hidIdRechercheIndividu&AnSession=${p.AnSession}`;
  const response = await Requester.makeGetRequest({ url: url + params, })

  const body = parse(response.data);

  const scripts = body.getElementsByTagName("script");
  const text = scripts[scripts.length - 1].innerHTML;
  let id = text.match("IdRechercheIndividu = .*;");
  if (id == null) return -1;

  return parseInt(id[0].substring(id[0].indexOf("= ") + 2, id[0].length - 1));
}
