import {Login} from "./modules/Login";
import {LoginCookies} from "./modules/LoginCookies";
import * as dotenv from 'dotenv';
import {CookieManager} from './CookieManager';
import {NewDocument} from "./modules/NewDocuments";
//import fetch from 'node-fetch';

dotenv.config();
const cookieManager = new CookieManager();


async function login() {
    const loginCookies = new LoginCookies(cookieManager);

    const k = await loginCookies.get();
    await new Login(cookieManager, k).get();
    console.log(await new NewDocument(cookieManager).get());
}

login();
