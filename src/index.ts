import {login} from "./requester";
import axios, {AxiosResponse} from 'axios';
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';

const website: string = "https://dawsoncollege.omnivox.ca";
const jar = new CookieJar();
const client = wrapper(axios.create({jar}));

async function getData() {
    try {
        // I'm using two HTML request libraries here because I was testing.
        // axios wouldn't work for the cache stuff so I just moved to request.
        const data: AxiosResponse<string> = await client.get(website, {
            withCredentials: true
        });
        const answer: string= data.data;
        const init = answer.search("value=\"6") + "value=.".length;
        const k = answer.substring(init, init + 18);

        const cookie_string = jar.getCookieStringSync(website + "/intr/Module/Identification/Login/Login.aspx");
        let cookie = await login(k, cookie_string, "user", "password");
        console.log(cookie);
        //headers['cookie'] = cookie.join(" ");

    } catch (error) {
    }
}

getData();
