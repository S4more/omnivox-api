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
        console.log(response.body);
        const root = parse(response.body);
        const table = root.querySelectorAll(".CategorieDocument .CategorieDocumentEtudiant");

        const categories: Category[] = [];

        table.forEach(category => {
            const docs: Document[] = [];

            category.querySelectorAll(".itemDataGrid, itemDataGridAltern").forEach(document => {
                const name = document.querySelector(".lblTitreDocumentDansListe")!.text;
                const description = document.querySelector(".divDescriptionDocumentDansListe")!.text;
                const posted = document.querySelector(".DocDispo")!.text;
                const viewed = document.querySelector(".colonneEtoileVisualisation")!.childNodes.length == 0;

                docs.push({name, description, posted, viewed});
            });
            const c: Category = {
                name: category.querySelector(".boutonEnabled")!.text,
                documents: docs,
            }
            categories.push(c);
        })
        return categories;
    }

    protected getParams(cookie: string): Params {
        return {
            url: "https://www-daw-ovx.omnivox.ca" + this.url,
            method: 'GET',
            cookie
        }
    }
}
