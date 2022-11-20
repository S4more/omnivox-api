import { Toaster } from 'solid-toast';
import { createSignal, } from "solid-js";
import "./Login.css";
import { useLeaContext } from '../provider/omnivox-provider';
import leaClassRequest from '~/graphql-client/lea-classes';
import loginRequest from '~/graphql-client/login';
import { Form } from 'solid-start/data/Form';


export default function Login() {
  const [count, setCount] = createSignal(0);

return (
    <>
      <Form>
      </Form>
      <button class="increment" onClick={() => setCount(count() + 1)}>
        Clicks: {count()}
      </button>
      <Toaster/>
    </> );
}
