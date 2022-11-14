import getMioPreviewList from "../modules/Mio";
import addUserAsRecipient from "../modules/mio/MioAddUserAsRecipient";
import getMioCompose from "../modules/mio/MioGetCompose";
import getMioSearchPanel from "../modules/mio/MioGetSearchPanel";
import getMioSearchPanelCookie from "../modules/mio/MioGetSearchPanelCookie";
import saveMioRecipient from "../modules/mio/MioSaveRecipient";
import searchMioUser from "../modules/mio/MioSearchUser";
import sendMioApi, { MioSendData } from "../modules/mio/MioSend";
import getMioCookies from "../modules/MioCookie";
import getMioDetail from "../modules/MioDetail";
import {Mio} from "../types/mio/Mio";
import {MioPreview} from "../types/mio/MioPreview";
import {SearchUser} from "../types/SearchUser";

export class MioManager {
  private cachedMios: Mio[] = [];
  private cachedPreviews: MioPreview[] = [];
  private cachedUsers: Map<string, SearchUser> = new Map();
  private cacheSize = 1000; 

  public async loadMioPreview(): Promise<MioPreview[]> {
    return await getMioPreviewList();
  }

  public async loadMioById(id: string): Promise<Mio> {
    try {
      if (this.cachedMios.length != 0) {
        const mio: Mio | undefined = this.cachedMios.find(mio => mio.id === id);
        if (mio) return mio;
      }
      const mio = await getMioDetail(id);
      this.cachedMios.push(mio);
      return mio;
    } catch (error) {
      throw error;
    }
  }

  public async getUserList(name: string): Promise<SearchUser[]> {
    const users: SearchUser[] = await searchMioUser({ 'name': name, 'idRechercheIndividu': this.searchRechercheIndividu });

    users.forEach(u => {
      this.cacheUser(u);
    })

    return users;
  }

  public async sendMio(users: SearchUser[], data: MioSendData) {
    const param = await getMioCompose()
    const token = await MioManager.getIdRechercheIndividu();
    param.ctl00$cntFormulaire$hidIdRechercheIndividu=token.toString();
    users.forEach(async user => await addUserAsRecipient(user, token));
    await saveMioRecipient(token);
    await sendMioApi(param, data);
  }

  public getCachedUserByID(studentID: string) {
    return this.cachedUsers.get(studentID);
  }

  private cacheUser(user: SearchUser) {
    if (this.cachedUsers.size >= this.cacheSize &&
      !this.cachedUsers.has(user.Numero)) {
      this.cachedUsers.delete(this.cachedUsers.keys().next().value)
    }
    this.cachedUsers.set(user.Numero, user);
  }

  /** Use only one search instead of creating a new one every
single time.
*/
  private searchRechercheIndividu: number;

  private constructor( searchRechercheIndividu: number) {
    this.searchRechercheIndividu = searchRechercheIndividu;
  }

  /**
* Creates an instance of the MioManager with it's own
* cookie manager.
*/
  static async build(): Promise<MioManager> {
    await getMioCookies();
    const param = await this.getIdRechercheIndividu();
    return new MioManager(param);
  }

  private static async getIdRechercheIndividu(): Promise<number> {
    const param = await getMioCompose();
    await getMioSearchPanelCookie({
      AnSession: '2022',
      OidCreateur: param.ctl00$cntFormulaire$hidAjout
    });

    const token = await getMioSearchPanel( { AnSession: '2022', OidCreateur: param.ctl00$cntFormulaire$hidAjout });

    return token;
  }
}
