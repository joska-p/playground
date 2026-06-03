import { Charts } from "./components/charts/Charts";
import { Sessions } from "./components/sessions/sessions";

function App() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="sessions basis-2/3">
        <Sessions />
      </div>
      <div className="charts basis-1/3">
        <Charts />
      </div>
    </div>
  );
}

export { App };
