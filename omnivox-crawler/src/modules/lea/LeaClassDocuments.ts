import parse from "node-html-parser";
import request from "request";
import {CookieManager} from "../../CookieManager";
import {OmnivoxModule, Params} from "../OmnivoxModule";

export interface Category {
    name: string,
    documents: Document[]
}

interface Document {
    name: string,
    description: string,
    posted: string,
    viewed: boolean
}

export class LeaClassDocument extends OmnivoxModule<Category[]>{
    constructor(cookieManager: CookieManager, private url: string) {
        super(cookieManager);
    }

    protected parse(response: request.Response) {
        const root = parse(response.body);
        const table = root.querySelectorAll(".CategorieDocumentEtudiant");

        const categories: Category[] = [];

        table.forEach(category => {
            const docs: Document[] = [];

            category.querySelectorAll("tr").forEach(document => {
                let cleanRegex = RegExp("([\t\r\n]){1,}", "gm");
                const name = document.querySelector(".lblTitreDocumentDansListe")?.text.trim();
                if (name == undefined) return;
                let description = document.querySelector(".divDescriptionDocumentDansListe")!.text.trim();
                description = description.replace(cleanRegex, '\n');
                const posted = document.querySelector(".DocDispo")!.text.substring("since".length);
                const viewed = document.querySelector("#colonneEtoileVisualisation")!.childNodes.length == 1;
                docs.push({name, description, posted, viewed});
                console.log({name, description, posted, viewed});
            });
            let name: string | undefined = category.querySelector(".boutonEnabled")?.text.trim();
            if (name == undefined) name = "Not categorized";

            const c: Category = {
                name: name,
                documents: docs,
            }
            categories.push(c);
        })
        return categories;
    }

    protected getParams(cookie: string): Params {
        const url = "https://www-daw-ovx.omnivox.ca" + this.url;
        return {
            url,
            method: 'GET',
            cookie
        }
    }
}
