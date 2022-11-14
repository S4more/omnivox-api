import { Requester } from "./OmnivoxModule";

const url = "https://dawsoncollege.omnivox.ca";
export default async function getLoginCookies() {
  const request = await Requester.makeGetRequest({
    url: url,
    query: "",
  })

  const answer = request.data; 

  const init = answer.search("value=\"6") + "value=.".length;
  const k = answer.substring(init, init + 18);
  return k;
}

