import {Requester} from "../OmnivoxModule";
import {SearchUser} from "../../types/SearchUser";

export interface SearchUserParam {
  'idRechercheIndividu': number,
  name: string,
}

const url = 'https://dawsoncollege.omnivox.ca/WebApplication/Commun.SelectionIndividu/Prive/SelectionIndividu.asmx/LancerRecherche';
export default async function getMioUser(searchUserParam : SearchUserParam) {
    const form = {
      idRechercheIndividu: searchUserParam.idRechercheIndividu,
      motCleRecherche: searchUserParam['name'],
      toujoursAfficherDescription: false
    };

    const result = await Requester.makePostRequest({ url: url, body: form, }, true);
    const searchResult: SearchUser[] = result.data.d.ItemsSelectionnes;
    return searchResult; 
}
