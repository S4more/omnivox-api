import {Requester} from "./OmnivoxModule";

const url = 'https://dawsoncollege.omnivox.ca/intr/webpart.ajax?IdWebPart=00000000-0000-0000-0003-000000000008&L=ENG'

export default async function getNewDocument() {
  const response = await Requester.makeGetRequest({
    url,
  })

  let body: string = response.data;
  let left_index = body.search("xmlns=\"\"");
  const rows = [];

  while (left_index != -1) {
    let trimmed_body = body.substring(left_index + "xmlns=\"\">".length);
    let right = trimmed_body.search("</title>");
    rows.push(trimmed_body.substring(0, right));
    body = trimmed_body.substring(right + "</title>".length);
    left_index = body.search("xmlns=\"\"");
  }
  return rows;
}
