import { Requester } from "./OmnivoxModule";
import { removeSpaces } from "../utils/HTMLDecoder";
import parse from "node-html-parser";

const url = 'https://dawsoncollege.omnivox.ca/WebApplication/Module.MIOE/Commun/Message/MioDetail.aspx';
export default async function getMioDetail(id: string) {

  const response = await Requester.makeGetRequest({ url: url + `?m=${id}` });
  const root = parse(response.data);

  const contenuWrapper = root.querySelector("#contenuWrapper");
  if (!contenuWrapper) { throw new Error("mio not found") };

  let messageBody = root.querySelector("#contenuWrapper")!.text;

  messageBody = removeSpaces(messageBody);
  const from: string = root.querySelector(".cDe")!.textContent;
  const to: string = root.querySelector("#tdACont")!.textContent;
  const title: string = root.querySelector(".cSujet")!.textContent;
  const date: string = root.querySelector(".cDate")!.textContent;

  return {
    id,
    author: from,
    recipient: to,
    title,
    date,
    content: messageBody,
  }
}
