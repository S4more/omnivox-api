import { createEffect } from "solid-js";
import { createRouteAction, Title, useNavigate } from "solid-start";
import toast, { Toaster } from "solid-toast";
import { useLeaContext } from "~/components/provider/omnivox-provider";
import { instance } from "~/graphql-client";
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
      try {
        const response = await loginRequest.execute({id: username, password});
        toast.success("Logged in", {id: loading});
        return response.token;
      } catch (error) {
        toast.error("Wrong username.", {id: loading});
      }
    } else {
      toast.error("Please write username and password.");
    }
  });

  createEffect(() => {
    if (logging.result) {
      leaSetters.setOmnivoxToken("" + logging.result);
      instance.defaults.headers.common = {Authorization: 'Bearer ' + logging.result};
      console.log(instance);
      navigate("/dashboard");
    }
  })

  return (
    <main>
      <div class={style.pageWrapper}>
        <Title>Hello World</Title>
        <h1> Nihilvox </h1>
        <h2> Login and be free </h2>
        <Form class={style.loginWrapper}>
          <label for="username">Student ID</label>
          <input type="text" name="username"/>
          <label for="password">Password</label>
          <input type="password" name="password"/>
          <input type="submit" value="LOGIN" disabled={logging.pending}/>
        </Form>
      </div>

    </main>
  );
}
