import 'source-map-support/register';
import {Login} from "./modules/Login";
import {LoginCookies} from "./modules/LoginCookies";
import * as dotenv from 'dotenv';
import {CookieManager} from './CookieManager';
import {MioManager} from "./managers/MioManager";
import {LeaManager} from "./managers/LeaManager";
export {LeaManager} from "./managers/LeaManager";
import {loginUser} from "./utils/loginPromt";

loginUser()
dotenv.config();

export async function login(username: string, password: string): Promise<CookieManager> {
    const cookieManager = new CookieManager();
    const loginCookies = new LoginCookies(cookieManager);
    const k = await loginCookies.get();
    await new Login(cookieManager, k, username, password).get();
    return cookieManager;
}

async function testLea() {
    const cm = await login("2035536", "password");
    const lm = await LeaManager.build(cm.getCache());
    const classes = await lm.getClassDocumentSummary();
    await lm.getAllClasses();
    console.log(await lm.getClassDocumentList(classes[0].href));

}

testLea();

export {MioManager};
