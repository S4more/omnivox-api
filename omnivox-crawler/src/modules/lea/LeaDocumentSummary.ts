import parse from "node-html-parser";
import {Requester} from "../OmnivoxModule";
export interface ClassDocumentSumary {
  name: string,
  availableDocuments: string,
  href: string,
}

const url = "https://www-daw-ovx.omnivox.ca/cvir/ddle/SommaireDocuments.aspx";
export default async function getLeaDocumentSummary() {
  const request = await Requester.makeGetRequest({ url });

  const classes: ClassDocumentSumary[] = [];
  const root = parse(request.data);
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
