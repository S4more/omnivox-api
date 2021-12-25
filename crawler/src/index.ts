import {Login} from "./modules/Login";
import {LoginCookies} from "./modules/LoginCookies";
import * as dotenv from 'dotenv';
import {CookieManager} from './CookieManager';
import {LeaCookie} from "./modules/lea/LeaCookie";
import {LeaSkyCookie} from "./modules/lea/LeaSkyCookie";
import {Lea} from "./modules/lea/Lea";
import {MioManager} from "./managers/MioManager";
import {LeaManager} from "./managers/LeaManager";

dotenv.config();
const cookieManager = new CookieManager();

async function login() {
    const loginCookies = new LoginCookies(cookieManager);
    const k = await loginCookies.get();
    await new Login(cookieManager, k).get();
}

login().then(() => {
    LeaManager.
        build(cookieManager.getCache()).
        then(async manager => {
            await manager.getAllClasses();
            console.log(await manager.getClass({'name': 'Linear Algebra'}));
            console.log(await manager.getClass({'name': 'Database'}));
    });
})

