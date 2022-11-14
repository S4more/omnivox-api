import { SearchUser } from "../../types/SearchUser";
import { Requester } from "../OmnivoxModule";

const url =  'https://dawsoncollege.omnivox.ca/WebApplication/Commun.SelectionIndividu/Prive/SelectionIndividu.asmx/AjouterItemSelectionne';

export default async function addUserAsRecipient(user: SearchUser, token: number) {
  let serialized = user as any;

  serialized["BesoinNewLine"] = "<br />";
  serialized["DebutAlignMiddle"] = "";
  serialized["FinAlignMiddle"] = "";
  delete serialized["DateFinAbsence"];

  Requester.makePostRequest({ url, body: { idRechercheConfig: token, itemAjout: serialized } }, true);

}
