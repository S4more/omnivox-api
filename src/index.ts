import {Login} from "./modules/Login";
import {LoginCookies} from "./modules/LoginCookies";
import * as dotenv from 'dotenv';
import {CookieManager} from './CookieManager';
import {LeaCookie} from "./modules/lea/LeaCookie";
import {LeaSkyCookie} from "./modules/lea/LeaSkyCookie";
import {Lea} from "./modules/lea/Lea";
import {MioManager} from "./managers/MioManager";

dotenv.config();
const cookieManager = new CookieManager();

async function login() {
    const loginCookies = new LoginCookies(cookieManager);
    const k = await loginCookies.get();
    await new Login(cookieManager, k).get();
}
async function loadTokens() {
    await login();
    //await new MioCookie(cookieManager).get();
}

async function loadMio() {
    await loadTokens();
}

async function loadLea() {
    await loadTokens();
    await new LeaCookie(cookieManager).get();
    await new LeaSkyCookie(cookieManager).get();
    const classes = await new Lea(cookieManager).get();
    console.log(classes);
}

login();

//login().then(async () => {
//        const mioManager = await MioManager.build(cookieManager.getCache());
//        const users = await mioManager.getUserList("Guilherme");
//        const user = users.filter(user => user.Numero === "2035536");
//        await mioManager.sendMio(user, {'title': 'This was sent by an API', 'message': 'One day of work and it finally is here.'});
//    }
//)
