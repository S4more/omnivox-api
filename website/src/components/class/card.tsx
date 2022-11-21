import styles from "./card.module.scss"
export interface ClassCardProps {
  teacher: string;
  name: string;
  distributedDocuments: number;
}

export default function ClassCard({teacher, name, distributedDocuments}: ClassCardProps) {
  return (
  <div class={styles["cardWrapper"]}>
    <div class={styles["title"]}>
      <p class={styles["main"]}> { name } </p>
      <p class={styles["sub"]}> { teacher } </p>
    </div>
    <div class={styles["body"]}>
      <h2 class={styles["relevant"]}> {distributedDocuments} </h2>
      <text class={styles["new"]}> new </text>
      <text> documents </text>
    </div>
  </div>
  )
}
