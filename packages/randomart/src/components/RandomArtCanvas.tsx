import {
  useRunning,
  useTreeB,
  useTreeG,
  useTreeR
} from '../stores/randomart/selectors';
import { WebGLCanvas } from './WebGLCanvas';

export function RandomArtCanvas() {
  const treeR = useTreeR();
  const treeG = useTreeG();
  const treeB = useTreeB();
  const running = useRunning();

  return (
    <WebGLCanvas
      treeR={treeR}
      treeG={treeG}
      treeB={treeB}
      running={running}
    />
  );
}
