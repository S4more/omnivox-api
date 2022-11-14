import {MioLoadPreviewList} from "../modules/Mio";
import {AddUserAsRecipient} from "../modules/mio/MioAddUserAsRecipient";
import {MioGetCompose} from "../modules/mio/MioGetCompose";
import {MioGetSearchPanel} from "../modules/mio/MioGetSearchPanel";
import {MioGetSearchPanelCookie} from "../modules/mio/MioGetSearchPanelCookie";
import {MioSaveRecipient} from "../modules/mio/MioSaveRecipient";
import {MioSearchUser} from "../modules/mio/MioSearchUser";
import {MioSend, MioSendData} from "../modules/mio/MioSend";
import {MioCookie} from "../modules/MioCookie";
import {MioDetail} from "../modules/MioDetail";
import {Mio} from "../types/mio/Mio";
import {MioPreview} from "../types/mio/MioPreview";
import {SearchUser} from "../types/SearchUser";

export class MioManager {
  private cachedMios: Mio[] = [];
  private cachedPreviews: MioPreview[] = [];
  private cachedUsers: Map<string, SearchUser> = new Map();
  private cacheSize = 1000; 

  public async loadMioPreview(): Promise<MioPreview[]> {
    return await new MioLoadPreviewList().getList();
  }

  public async loadMioById(id: string): Promise<Mio> {
    try {
      if (this.cachedMios.length != 0) {
        const mio: Mio | undefined = this.cachedMios.find(mio => mio.id === id);
        if (mio) return mio;
      }
      const mio = await new MioDetail(id).getDetail();
      this.cachedMios.push(mio);
      return mio;
    } catch (error) {
      throw error;
    }
  }

  public async getUserList(name: string): Promise<SearchUser[]> {
    const users: SearchUser[] = await new MioSearchUser().searchUser({
      'name': name, 
      'idRechercheIndividu': this.searchRechercheIndividu
    });

    users.forEach(u => {
      this.cacheUser(u);
    })

    return users;
  }

  public async sendMio(users: SearchUser[], data: MioSendData) {
    const param = await new MioGetCompose().getCompose();
    const token = await MioManager.getIdRechercheIndividu();
    param.ctl00$cntFormulaire$hidIdRechercheIndividu=token.toString();
    users.forEach(async user => await new AddUserAsRecipient(user, token).run());
    await new MioSaveRecipient(token).run();
    await new MioSend(param, data).run();
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
    await new MioCookie().run();
    const param = await this.getIdRechercheIndividu();
    return new MioManager(param);
  }

  private static async getIdRechercheIndividu(): Promise<number> {
    const param = await new MioGetCompose().getCompose();
    await new MioLoadPreviewList().getList();
    await new MioGetSearchPanelCookie({
      AnSession: '2022',
      OidCreateur: param.ctl00$cntFormulaire$hidAjout
    }).run();

    const token = await new MioGetSearchPanel(
      { 
        AnSession: '2022',
        OidCreateur: param.ctl00$cntFormulaire$hidAjout 
      }).getSearchParameters();

    return token;
  }
}
