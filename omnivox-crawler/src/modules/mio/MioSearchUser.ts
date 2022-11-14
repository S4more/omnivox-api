import {OmnivoxModule} from "../OmnivoxModule";
import {SearchUser, SearchUserWrapper} from "../../types/SearchUser";

export interface SearchUserParam {
  'idRechercheIndividu': number,
  name: string,
}

export class MioSearchUser extends OmnivoxModule<SearchUser[]> {
  private readonly url = 'https://dawsoncollege.omnivox.ca/WebApplication/Commun.SelectionIndividu/Prive/SelectionIndividu.asmx/LancerRecherche';
  private form = {};

  constructor() {
    super();
  }

  public async searchUser(searchUserParam: SearchUserParam) {
    this.form = {
      idRechercheIndividu: searchUserParam.idRechercheIndividu,
      motCleRecherche: searchUserParam['name'],
      toujoursAfficherDescription: false
    };

    const result = await this.makePostRequest({ url: this.url, body: this.form, }, true);
    return this.parse(result.data);

  }

  protected parse(body: SearchUserWrapper): SearchUser[] {
    const searchResult: SearchUser[] = body.d.ItemsSelectionnes;
    return searchResult; 
  }
}
