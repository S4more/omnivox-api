import { createEffect, createResource, createSignal, For, on, Show } from "solid-js";
import { createRouteAction, Title, useRouteData } from "solid-start";
import ClassCard from "~/components/class/card";
import { useLeaContext } from "~/components/provider/omnivox-provider"
import { query } from "~/graphql-client";
import styles from "./dashboard.module.scss";

export function routeData() {
  const [classes] = createResource(async () => {
    const resp = await query("LeaClass", "LeaClass", {search: "anres", lookUpType: "CODE"},
      ["code", "title", "teacher", "distributedDocuments", "grade", "schedule"]);
    console.log("Resp: " + resp);
    return resp
  })

  return { classes };

}

export interface DashboardProps {
  // props
}

export default function Dashboard({}: DashboardProps) {
  const [getleaContext, _] = useLeaContext();
  console.log("Token: " + getleaContext.omnivoxToken());
  const { classes } = useRouteData<ReturnType<typeof routeData>>();
  const [getClasses, setClasses] = createSignal([]);

  createEffect(() => console.log(classes()));

  createEffect(on(classes, courses => {
    setClasses(courses);
  }));

  return (
    <>
    <Show when={classes()}>
      <p> Loading: {classes.loading} </p>
        <div class={styles.dashboardWrapper}>
          <For each={classes().sort((a, b) => b.distributedDocuments - a.distributedDocuments)}>
            {(course) => 
              <Show when={course.distributedDocuments > 0}>
                <ClassCard
                  teacher={course.teacher}
                  name={course.title}
                  distributedDocuments={course.distributedDocuments}
                  grade={course.grade}
                  schedule={course.schedule}
                  />
              </Show>
            }
          </For>
        </div>
      </Show>
    </>
  )
}
