import request from "request";
import {OmnivoxModule, Params} from "./OmnivoxModule";

export class MioCookie extends OmnivoxModule<string> {
  private readonly url: string = 'https://dawsoncollege.omnivox.ca/WebApplication/Module.MIOE/Login.aspx?ReturnUrl=%2fWebApplication%2fModule.MIOE%2fDefault.aspx';

  public async run() {
    await this.makeGetRequest({ url: this.url });
  }
}
