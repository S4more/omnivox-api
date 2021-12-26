import parse from "node-html-parser";
import request from "request";
import {OmnivoxModule, Params} from "../OmnivoxModule";
export interface ClassDocumentSumary {
    name: string,
    availableDocuments: string,
    href: string,
}

export class LeaDocumentSummary extends OmnivoxModule<ClassDocumentSumary[]> {
    protected parse(response: request.Response) {
        const classes: ClassDocumentSumary[] = [];
        const root = parse(response.body);
        const rows = root.querySelectorAll(".itemDataGrid, .itemDataGridAltern");
        rows.forEach(tr => {
            const a = tr.querySelector("a");
            let c: ClassDocumentSumary = {
                name: a!.innerText.trim(),
                href: a!.getAttribute("href")!,
                availableDocuments: tr.querySelectorAll("td")[2].innerText.trim()
            };

            classes.push(c);
        });

        return classes;
    }

    protected getParams(cookie: string): Params {
        return {
            url: 'https://www-daw-ovx.omnivox.ca/cvir/ddle/SommaireDocuments.aspx',
            method: 'GET',
            cookie
        }
    }
}
