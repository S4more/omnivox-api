import { Requester } from "../OmnivoxModule";
import request from "request";

const url = 'https://www-daw-ovx.omnivox.ca/cvir/Service.aspx?cxvir=o&/estd/cvie';
export default async function getLeaSkyCookie() {
    await Requester.makeGetRequest({ url })
}
