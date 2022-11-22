import { For, Show } from "solid-js";
import styles from "./card.module.scss"
export interface ClassCardProps {
  name: string;
  grade?: string;
  teacher: string;
  distributedDocuments: number;
  schedule: string[];
}

export default function ClassCard({teacher, name, distributedDocuments ,grade, schedule}: ClassCardProps) {

  const formatDate = (arr: string[]) => {
    let finalArr = {} ;
    for (let i = 0; i < arr.length; i++) {
      let name = arr[i].slice(0, 3);
      if (!finalArr[name]) {
        finalArr[name] = arr[i].slice(4);
      } else {
        finalArr[name] += " - " + arr[i].slice(4);
      }
    }
    return Object.keys(finalArr).map(day => `${day}`);
  }
  return (
  <div class={styles["cardWrapper"]}>
    <div class={styles["title"]}>
      <p class={styles["main"]}> { name } </p>
      <p class={styles["sub"]}> { teacher } </p>
    </div>
    <div class={styles["body"]}>
      <div>
        <h2 class={styles["relevant"]}> {distributedDocuments} </h2>
        <text class={styles["new"]}> new </text>
        <text> documents </text>
      </div>
      <Show when={grade}>
        <div>
          <text> Grade: {grade} </text>
        </div>
      </Show>
    </div>
  </div>
  )
}
