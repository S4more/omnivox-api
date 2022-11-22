import { createSignal, createContext, useContext } from "solid-js";

export const makeLeaContext = () => {
  const [omnivoxToken, setOmnivoxToken] = createSignal<string>("");
  return [{omnivoxToken}, {setOmnivoxToken}] as const;
    // `as const` forces tuple type inference
};

export const LeaContext = createContext<ReturnType<typeof makeLeaContext>>();

export function LeaProvider(props) {
  const [omnivoxToken, setOmnivoxToken] = createSignal("");

  return (
    <LeaContext.Provider value={[{omnivoxToken}, {setOmnivoxToken}]}>
      {props.children}
    </LeaContext.Provider>
  );
}

export function useLeaContext() { return useContext(LeaContext); }
