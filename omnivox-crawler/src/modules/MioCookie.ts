import { Requester } from "./OmnivoxModule";

const url = 'https://dawsoncollege.omnivox.ca/WebApplication/Module.MIOE/Login.aspx?ReturnUrl=%2fWebApplication%2fModule.MIOE%2fDefault.aspx';
export default async function getMioCookies() {
  await Requester.makeGetRequest({ url });
}
