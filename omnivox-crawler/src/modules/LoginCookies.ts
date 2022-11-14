import request from "request";
import {OmnivoxModule, Params} from "./OmnivoxModule";

export class LoginCookies extends OmnivoxModule<string> {
    readonly url: string = "https://dawsoncollege.omnivox.ca";
     
    getParams(_: string): Params {
        return {
            url: this.url,
            method: 'GET'
        }
    }

  public async testGet() {
    const request = await this.makeGetRequest({
      url: this.url,
      query: "",
    })

    const answer = request.data; 

    const init = answer.search("value=\"6") + "value=.".length;
    const k = answer.substring(init, init + 18);
    return k;
  }

    protected parse(response: request.Response): string {
        const answer: string = response.body;
        const init = answer.search("value=\"6") + "value=.".length;
        const k = answer.substring(init, init + 18);
        return k;
    }
}
