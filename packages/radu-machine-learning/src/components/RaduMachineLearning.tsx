import { Charts } from './Charts.tsx';
import { Sessions } from './sessions/Sessions.tsx';

function RaduMachineLearning() {
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

export { RaduMachineLearning };
