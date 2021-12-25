import {Login} from "./modules/Login";
import {LoginCookies} from "./modules/LoginCookies";
import * as dotenv from 'dotenv';
import {CookieManager} from './CookieManager';
import {MioManager} from "./managers/MioManager";
export {LeaManager} from "./managers/LeaManager";

dotenv.config();

export async function login(username: string, password: string): Promise<CookieManager> {
    const cookieManager = new CookieManager();
    const loginCookies = new LoginCookies(cookieManager);
    const k = await loginCookies.get();
    await new Login(cookieManager, k, username, password).get();
    return cookieManager;
}
export {MioManager};
