import { Requester } from "../OmnivoxModule";
import { parse } from "node-html-parser";
import { LeaClass } from "../../types/LeaClass";

const url = 'https://www-daw-ovx.omnivox.ca/cvir/doce/Default.aspx';
export default async function getLea() {

  const response = await Requester.makeGetRequest({ url });
  const root = parse(response.data);
  const cardPanel = root.querySelectorAll(".card-panel");

  let classes: LeaClass[] = [];
  cardPanel.forEach(card => {
    const codeTitle: string = card.querySelector(".card-panel-title")!.text;
    // This white space is not a normal white space.
    // Weird bug.
    const code = codeTitle.substring(0, codeTitle.indexOf(" "));
    const title = codeTitle.substring(codeTitle.indexOf(" ") + 1);
    
    // section schedule teacher
    const sst = card.querySelector(".card-panel-desc")!.text;
    const section = sst.substring(sst.indexOf("0"), sst.indexOf(" -"));

    const schedule = sst
        .substring(sst.indexOf("- ") + 2, sst.lastIndexOf(", "))
        .split(", ");

    const teacher = sst.substring(sst.lastIndexOf(", ") + 2);

    let average: number;
    let median: number;

    const notes = card.querySelectorAll(".note-principale");

    if (notes.length > 3) {
        average = parseInt(notes[2].text);
        median = parseInt(notes[3].text);
    } else {
        average = parseInt(notes[1].text);
        median = parseInt(notes[2].text);
    }

    const files = card.querySelectorAll(".file-indicator-number");
    const distributedDocuments = parseInt(files[0].text);
    const distributedAssignments = parseInt(files[1].text);

    classes.push({ teacher, section, title, code, schedule, average, median, distributedDocuments, distributedAssignments })

  });

  return classes;
}
