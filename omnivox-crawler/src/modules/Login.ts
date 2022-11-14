import request from "request";
import { OmnivoxModule } from "./OmnivoxModule";
import { LeaLoginError } from "../errors/LoginError";

export class Login extends OmnivoxModule<void> {
    private readonly url = 'https://dawsoncollege.omnivox.ca/intr/Module/Identification/Login/Login.aspx';

    constructor(private username: string, private password: string) {
        super();
    }

  public async login() {
    const kPage = await this.makeGetRequest({
      url: this.url,
      query: "",
    })

    const answer = kPage.data; 

    const init = answer.search("value=\"6") + "value=.".length;
    const k = answer.substring(init, init + 18);

    const request = await this.makePostRequest({
      url: this.url,
      body: {
        NoDa: this.username,
        PasswordEtu: this.password,
        k
      }
    })

    return request.data.includes("lea");
  }

    protected parse(body: request.Response): void {
        if (!body.headers["set-cookie"]!.some(cookie => cookie.includes("TKSDAWP"))) {
            throw new LeaLoginError(`Couldn't connect to lea with id ${process.env.user_name}`);
        }
        //return body.headers["set-cookie"] || [];
    }
}
