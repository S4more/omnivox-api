import { Requester } from "./OmnivoxModule";
import {MioPreview} from "../types/mio/MioPreview";
import parse from "node-html-parser";
import {removeSpaces} from "../utils/HTMLDecoder";

const url = 'https://dawsoncollege.omnivox.ca/WebApplication/Module.MIOE/Commun/Message/MioListe.aspx';
export default async function getMioPreviewList() {
  const request = await Requester.makeGetRequest({ url });

  let idRegex: RegExp = new RegExp("chk.{37}", 'gm');
  const root = parse(request.data);
  const list: MioPreview[] = [];


  const authors = root.querySelectorAll(".name").map(el => el.text);
  const titles = root.querySelectorAll(".lsTdTitle > div > em").map(el => el.text);
  const shortDescs: string[] = root.querySelectorAll(".lsTdTitle > div").map(el => removeSpaces(el.text));
  let ids: string[] = [...request.data.matchAll(idRegex)].map(match => match[0].substring(3));

  for (let i = 0; i < ids[i].length; i++) {
    list.push({
      id: ids[i],
      title: titles[i],
      shortDesc: shortDescs[i],
      author: authors[i]
    });
  }

  return list;
}
