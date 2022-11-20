import { createRouteAction, redirect, Title, useNavigate } from "solid-start";
import toast, { Toaster } from "solid-toast";
import { useLeaContext } from "~/components/provider/omnivox-provider";
import loginRequest from "~/graphql-client/login";
// import { Form } from "solid-start/data/Form";
// import { LeaProvider } from "~/components/provider/omnivox-provider";

export function routeData() {
}

export default function Login() {
  const [logging, { Form }] = createRouteAction(async (formData: FormData) => {
    const username = formData.get("username") as string | undefined;
    const password = formData.get("password") as string | undefined;
    if (username && password) {
      const response = await loginRequest.execute({id: username, password});
      if (!response.token) {
        toast.error("Couldn't log in.");
        return;
      }
      toast.success("Logged in!");
      const [_, leaSetters] = useLeaContext();
      leaSetters.setOmnivoxToken(response.token);
      return redirect("/about");
    } else {
      toast.error("Please write username and password.");
    }
  });




  return (
    <main>
      <Title>Hello World</Title>
      <Form>
        <label for="username">Omnivox ID:</label>
        <input type="text" name="username"/>
        <label for="password">Password:</label>
        <input type="password" name="password"/>
        <input type="submit" value="submit" disabled={logging.pending}/>
      </Form>

    <Toaster/>
    </main>
  );
}
