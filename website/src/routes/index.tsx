import { Title } from "solid-start";
import Login from "~/components/login/Login";
import { LeaProvider } from "~/components/provider/omnivox-provider";

export function routeData() {
}

export default function Home() {
  return (
    <main>
      <LeaProvider>
        <Title>Hello World</Title>
        <h1>Hello world!</h1>
        <Login />
        <p>
          Visit{" "}
          <a href="https://start.solidjs.com" target="_blank">
            start.solidjs.com
          </a>{" "}
          to learn how to build SolidStart apps.
        </p>
      </LeaProvider>
    </main>
  );
}
