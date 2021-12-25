import {Login} from "./modules/Login";
import {LoginCookies} from "./modules/LoginCookies";
import * as dotenv from 'dotenv';
import {CookieManager} from './CookieManager';
import {MioCookie} from "./modules/MioCookie";
import {Mio} from "./modules/Mio";
import {MioDetail} from "./modules/MioDetail";

dotenv.config();
const cookieManager = new CookieManager();

async function login() {
    const loginCookies = new LoginCookies(cookieManager);
    const k = await loginCookies.get();
    await new Login(cookieManager, k).get();
}
async function loadTokens() {
    await login();
    await new MioCookie(cookieManager).get();
}

async function loadMio() {
    await loadTokens();
    const mios = await new Mio(cookieManager).get();

    let keys = [...mios.keys()];
    for (let key of keys) {
        console.log(`Loading ${mios.get(key)}`);
        console.log("------------------------");
        console.log(await new MioDetail(cookieManager, key).get());
        console.log("------------------------");
        await new Promise(r => setTimeout(r, 2000));
    }
}

loadMio();