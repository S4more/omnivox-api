import {Requester} from "../OmnivoxModule";
import { GetSearchPanelParams } from './MioGetSearchPanel';

const url = 'https://dawsoncollege.omnivox.ca/WebApplication/Commun.SelectionIndividu/Login.aspx?ReturnUrl=';
export default async function getMioSearchPanelCookie(p: GetSearchPanelParams) {
  const returnUrl = `%2fWebApplication%2fCommun.SelectionIndividu%2fPrive%2f%3feModeRecherche%3dMessagerieInterneOmnivox%26OidCreateur%3d${p.OidCreateur}%26IdRechercheIndividu%3d-1%26strChampHiddenRecherche%3dctl00_cntFormulaire_hidIdRechercheIndividu%26AnSession%3d${p.AnSession}`;

  await Requester.makeGetRequest({ url: url + returnUrl });

}
