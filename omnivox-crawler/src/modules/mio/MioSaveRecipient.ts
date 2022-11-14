import { Requester } from "../OmnivoxModule";

const url = 'https://dawsoncollege.omnivox.ca/WebApplication/Commun.SelectionIndividu/Prive/SelectionIndividu.asmx/Sauvegarder';
export default async function saveMioRecipient(token: number) {
  await Requester.makePostRequest({ url,
    body: {
      "idRechercheIndividu": token,
      "idRechercheIndividuParent": token,
    },
  }, true);
}
