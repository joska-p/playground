import { useSearchParams } from "@/hooks/use-searchparams";
import { StrictMode } from "react";
import { Button } from "../ui/button";

const Example01 = () => {
  const { storeParams, getParams, clearParams, getAllParams } = useSearchParams();

  return (
    <section className="flex flex-col items-start gap-8">
      <h2>example01</h2>

      <div>
        <p>The value1: {JSON.stringify(getParams(["key1"]))}</p>
        <Button onClick={() => storeParams([{ key: "key1", value: "value1" }])}>store value1</Button>
      </div>

      <div>
        <p>The value2: {JSON.stringify(getParams(["key2"]))}</p>
        <Button onClick={() => storeParams([{ key: "key2", value: "value2" }])}>store value2</Button>
      </div>

      <div>
        <p>The value3 is null: {JSON.stringify(getParams(["key3"]))}</p>
        <Button onClick={() => storeParams([{ key: "key3", value: "value3" }])}>store </Button>
      </div>

      <div>
        <p>All params: {JSON.stringify(getAllParams())}</p>
        <Button onClick={clearParams}>clear all</Button>
      </div>
    </section>
  );
};

const StrictModeExample01 = () => {
  return (
    <StrictMode>
      <Example01 />
    </StrictMode>
  );
};

export { Example01, StrictModeExample01 };
