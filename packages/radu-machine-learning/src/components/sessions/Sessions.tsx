import type { SessionData } from '../../core/drawing.types.ts';
import sampleData from '../../data/sampleData.json';
import { Session } from './Session.tsx';

const sessions = sampleData as SessionData[];

function Sessions() {
  return (
    <>
      {sessions.map((session) => (
        <div key={session.session}>
          <Session drawings={session.drawings} />
        </div>
      ))}
    </>
  );
}

export { Sessions };
