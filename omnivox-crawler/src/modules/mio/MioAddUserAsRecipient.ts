import request from "request";
import {SearchUser} from "../../types/SearchUser";
import {OmnivoxModule, Params} from "../OmnivoxModule";

export class AddUserAsRecipient extends OmnivoxModule<void> {
  readonly url =  'https://dawsoncollege.omnivox.ca/WebApplication/Commun.SelectionIndividu/Prive/SelectionIndividu.asmx/AjouterItemSelectionne';
  constructor( private user: SearchUser, private token: number ) {
    super();
  }

  public async run() {
    let serialized:any = this.user;

    serialized["BesoinNewLine"] = "<br />";
    serialized["DebutAlignMiddle"] = "";
    serialized["FinAlignMiddle"] = "";
    delete serialized["DateFinAbsence"];

    this.makePostRequest({
      url: this.url,
      body: { idRechercheConfig: this.token, itemAjout: serialized }
    }, true);

    return {
      method: 'POST',
      url: 'https://dawsoncollege.omnivox.ca/WebApplication/Commun.SelectionIndividu/Prive/SelectionIndividu.asmx/AjouterItemSelectionne',
      //url: 'http://127.0.0.1:8080',
      json: true,
      form: {
        idRechercheConfig: this.token,
        itemAjout: serialized,
      },
    }
  }

}
