import { OmnivoxModule, Params } from "../OmnivoxModule";

export class LeaCookie extends OmnivoxModule<void> {
  readonly url: string = 'https://dawsoncollege.omnivox.ca/intr/Module/ServicesExterne/Skytech.aspx?IdServiceSkytech=Skytech_Omnivox&lk=%2festd%2fcvie&IdService=CVIE&C=DAW&E=P&L=ANG';

  public async run() {
    await this.makeGetRequest({
      url: this.url,
    })
  }

}
