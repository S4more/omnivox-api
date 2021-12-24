import request from "request";
import {OmnivoxModule, Params} from "./OmnivoxModule";
import { decodeHTMLEntities, decodeHTMLCharCodes } from "../utils/HTMLDecoder";

type MioID = Map<string, string>;

export class Mio extends OmnivoxModule<MioID> {
    private readonly url: string = 'https://dawsoncollege.omnivox.ca/WebApplication/Module.MIOE/Commun/Message/MioListe.aspx';

    protected parse(response: request.Response): MioID {
        let body: string = response.body;
        let regexExp = new RegExp("<em\>.*<\/em>", 'g');
        let titles: string[] = [...body.matchAll(regexExp)].
            map(match => {
                let title = match[0];
                //title = title.substring(4, title.length - 5);
                title = decodeHTMLEntities(title);
                title = decodeHTMLCharCodes(title);
                return title;
            }
        );

        let idRegex: RegExp = new RegExp("chk.{37}", 'gm');
        let ids: string[] = [...body.matchAll(idRegex)].
            map(match => match[0].substring(3));

        const map: MioID = new Map();

        for (let i = 0; i < titles.length; i++) {
            map.set(ids[i], titles[i]);
        }

        return map;
    }

    protected getParams(cookie: string): Params {
        return {
            url: this.url,
            method: 'GET',
            cookie,
        }
    }

}
