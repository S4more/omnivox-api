import parse from "node-html-parser";
import {OmnivoxModule, Params} from "../OmnivoxModule";
export interface ClassDocumentSumary {
    name: string,
    availableDocuments: string,
    href: string,
}

export class LeaDocumentSummary extends OmnivoxModule<ClassDocumentSumary[]> {
  public async getSummaries(): Promise<ClassDocumentSumary[]> {
    const request = await this.makeGetRequest({
      url: 'https://www-daw-ovx.omnivox.ca/cvir/ddle/SommaireDocuments.aspx',
    });

    return this.parse(request.data);

  }

  private parse(response: string) {
      const classes: ClassDocumentSumary[] = [];
      const root = parse(response);
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
}
