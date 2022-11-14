import { Requester } from "../OmnivoxModule";

const url = 'https://dawsoncollege.omnivox.ca/intr/Module/ServicesExterne/Skytech.aspx?IdServiceSkytech=Skytech_Omnivox&lk=%2festd%2fcvie&IdService=CVIE&C=DAW&E=P&L=ANG';

export default async function getLeaCookie() {
  await Requester.makeGetRequest({ url })

}
