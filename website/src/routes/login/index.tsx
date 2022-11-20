import { createEffect } from "solid-js";
import { createRouteAction, Title, useNavigate } from "solid-start";
import toast, { Toaster } from "solid-toast";
import { useLeaContext } from "~/components/provider/omnivox-provider";
import loginRequest from "~/graphql-client/login";

import style from "./login.module.scss";

export default function Login() {
  const navigate = useNavigate();
  const [, leaSetters] = useLeaContext();

  const [logging, { Form }] = createRouteAction(async (formData: FormData) => {
    const username = formData.get("username") as string | undefined;
    const password = formData.get("password") as string | undefined;
    if (username && password) {
      const loading = toast.loading("just a sec");
      const response = await loginRequest.execute({id: username, password});
      if (!response.token) {
        toast.error("Couldn't log in.", {id: loading});
        return;
      }
      toast.success("Logged in", {id: loading});
      return response.token;
    } else {
      toast.error("Please write username and password.");
    }
  });

  createEffect(() => {
    if (logging.result) {
      leaSetters.setOmnivoxToken(logging.result);
      console.log("Inside.");
      navigate("/");
    }
  })

  return (
    <main>
      <div class={style.pageWrapper}>
        <Title>Hello World</Title>
        <h1> Nihilvox </h1>
        <h2> Login and be free </h2>
        <Form class={style.loginWrapper}>
          <label for="username">Omnivox ID</label>
          <input type="text" name="username"/>
          <label for="password">Password</label>
          <input type="password" name="password"/>
          <input type="submit" value="submit" disabled={logging.pending}/>
        </Form>
      </div>

    </main>
  );
}
