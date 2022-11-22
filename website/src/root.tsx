// @refresh reload
import { Suspense } from "solid-js";
import {
  A,
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start";
import { Toaster } from "solid-toast";
import { LeaProvider } from "./components/provider/omnivox-provider";
import "./root.css";

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>SolidStart - Bare</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <LeaProvider>
        <Suspense>
          <ErrorBoundary>
              <A href="/">Index</A>
              <A href="/about">About</A>
              <A href="/login">Login</A>
              <A href="/dashboard">Dashboard</A>
            <Routes>
              <FileRoutes />
            </Routes>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
        </LeaProvider>
        <Toaster toastOptions={{
          style: {
            background: '#0e1827',
            color: '#fff',
          }
        }}/>
      </Body>
    </Html>
  );
}
