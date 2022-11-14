import { OmnivoxModule } from "./OmnivoxModule";
import { removeSpaces } from "../utils/HTMLDecoder";
import { Mio } from "../types/mio/Mio";
import parse from "node-html-parser";

export class MioDetail extends OmnivoxModule<Mio> {
  private readonly url: string = 'https://dawsoncollege.omnivox.ca/WebApplication/Module.MIOE/Commun/Message/MioDetail.aspx';

  constructor(private id: string) {
    super();
    this.url = this.url + `?m=${id}`;
  }

  public async getDetail() {
    const response = await this.makeGetRequest({ url: this.url });
    return this.parse(response.data);
  }

  private parse(response: string): Mio {
    const body: string = response;
    const root = parse(body);

    const contenuWrapper = root.querySelector("#contenuWrapper");
    if (!contenuWrapper) { throw new Error("mio not found") };

    let messageBody = root.querySelector("#contenuWrapper")!.text;


    messageBody = removeSpaces(messageBody);
    const from: string = root.querySelector(".cDe")!.textContent;
    const to: string = root.querySelector("#tdACont")!.textContent;
    const title: string = root.querySelector(".cSujet")!.textContent;
    const date: string = root.querySelector(".cDate")!.textContent;

    return {
      id: this.id,
      author: from,
      recipient: to,
      title,
      date,
      content: messageBody,
    }
  }
}
