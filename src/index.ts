import {Login} from "./modules/Login";
import {LoginCookies} from "./modules/LoginCookies";
import * as dotenv from 'dotenv';
import {CookieManager} from './CookieManager';
import {MioCookie} from "./modules/MioCookie";
import {Mio} from "./modules/Mio";
import {MioSend} from "./modules/mio/MioSend";
import {LeaCookie} from "./modules/lea/LeaCookie";
import {LeaSkyCookie} from "./modules/lea/LeaSkyCookie";
import {Lea} from "./modules/lea/Lea";
import {MioDetail} from "./modules/MioDetail";
import {MioGetCompose} from "./modules/mio/MioGetCompose";
import {MioGetSearchPanel} from "./modules/mio/MioGetSearchPanel";
import {MioGetSearchPanelCookie} from "./modules/mio/MioGetSearchPanelCookie";
import {MioSearchUser} from "./modules/mio/MioSearchUser";
import {SearchUser} from "./types/SearchUser";
import {AddUserAsRecipient} from "./modules/mio/MioAddUserAsRecipient";
import {MioSaveRecipient} from "./modules/mio/MioSaveRecipient";

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
    const param = await new MioGetCompose(cookieManager).get();
    await new MioGetSearchPanelCookie(cookieManager, {
        AnSession: '2021',
        OidCreateur: param.ctl00$cntFormulaire$hidAjout
    }).get();
    const token = await new MioGetSearchPanel(cookieManager, {
        AnSession: '2021',
        OidCreateur: param.ctl00$cntFormulaire$hidAjout
    }).get();

    param.ctl00$cntFormulaire$hidIdRechercheIndividu=token.toString();

    const searchUsers: SearchUser[] = await new MioSearchUser(cookieManager, {
        name: "Guilherme Correa",
        idRechercheIndividu: token
    }).get();

    searchUsers.forEach(async user => {
        await new AddUserAsRecipient(cookieManager, user, token).get();
        await new MioSaveRecipient(cookieManager, token).get();
    })

    console.log(token.toString());

    await new MioSend(cookieManager, param, {'title': "Title", 'message': "Message"}).get();
}

async function loadLea() {
    await loadTokens();
    await new LeaCookie(cookieManager).get();
    await new LeaSkyCookie(cookieManager).get();
    const classes = await new Lea(cookieManager).get();
    console.log(classes);
}

//loadLea();
loadMio();
