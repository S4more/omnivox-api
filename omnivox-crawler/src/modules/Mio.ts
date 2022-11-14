import request from "request";
import {OmnivoxModule, Params} from "./OmnivoxModule";
import {MioPreview} from "../types/mio/MioPreview";
import parse from "node-html-parser";
import {removeSpaces} from "../utils/HTMLDecoder";

export class MioLoadPreviewList extends OmnivoxModule<MioPreview[]> {
  private readonly url: string = 'https://dawsoncollege.omnivox.ca/WebApplication/Module.MIOE/Commun/Message/MioListe.aspx';

  public async getList(): Promise<MioPreview[]> {
    const request = await this.makeGetRequest({ url: this.url});
    return this.parse(request.data);
  }

  protected parse(response: string): MioPreview[] {
    let idRegex: RegExp = new RegExp("chk.{37}", 'gm');
    let body: string = response;
    const root = parse(body);
    const list: MioPreview[] = [];


    const authors = root.querySelectorAll(".name").map(el => el.text);
    const titles = root.querySelectorAll(".lsTdTitle > div > em").map(el => el.text);
    const shortDescs: string[] = root.querySelectorAll(".lsTdTitle > div").map(el => removeSpaces(el.text));
    let ids: string[] = [...body.matchAll(idRegex)].map(match => match[0].substring(3));

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
}
