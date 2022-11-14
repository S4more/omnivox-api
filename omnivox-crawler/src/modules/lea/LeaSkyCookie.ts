import { OmnivoxModule, Params } from "../OmnivoxModule";
import request from "request";

export class LeaSkyCookie extends OmnivoxModule<void> {
  readonly url: string = 'https://www-daw-ovx.omnivox.ca/cvir/Service.aspx?cxvir=o&/estd/cvie';

  public async run() {
    await this.makeGetRequest({
      url: this.url,
    })
  }
}
