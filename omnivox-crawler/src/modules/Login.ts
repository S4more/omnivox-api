import { Requester } from "./OmnivoxModule";

const url = 'https://dawsoncollege.omnivox.ca/intr/Module/Identification/Login/Login.aspx';
export default async function Login(username: string, password: string) {
  const kPage = await Requester.makeGetRequest({ url })

  const answer = kPage.data; 

  const init = answer.search("value=\"6") + "value=.".length;
  const k = answer.substring(init, init + 18);

  const request = await Requester.makePostRequest({
    url: url,
    body: {
      NoDa: username,
      PasswordEtu: password,
      k
    }
  })

  console.log(request.data.includes("headerNavbarLink"));
  return request.data.includes("headerNavbarLink");
}
