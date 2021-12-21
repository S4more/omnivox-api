import {login, loadMio} from "./requester";
import axios, {AxiosResponse} from 'axios';
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';
import qs from 'qs';
//import fetch from 'node-fetch';

const website: string = "https://dawsoncollege.omnivox.ca";
const jar = new CookieJar();
const client = wrapper(axios.create({jar}));


async function getData() {
//    const response = await fetch(website);
//    console.log(response);

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
        let cookie = await login(k, cookie_string, "username", "password");

        let cookie_str = cookie.join("; ");

        loadMio(cookie_str);


        //headers['cookie'] = cookie.join(" ");

    } catch (error) {
    }
}

getData();
