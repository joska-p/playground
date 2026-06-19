import {
  useCorrelatedRGB,
  useRenderMode,
  useRunning,
  useTreeB,
  useTreeG,
  useTreeR
} from '../stores/randomart/selectors';
import { CPUCanvas } from './CPUCanvas';
import { WebGLCanvas } from './WebGLCanvas';

export function RandomArtCanvas() {
  const treeR = useTreeR();
  const treeG = useTreeG();
  const treeB = useTreeB();
  const correlatedRGB = useCorrelatedRGB();
  const running = useRunning();
  const renderMode = useRenderMode();

  const canvasTreeR = correlatedRGB ? treeR.args[0] : treeR;
  const canvasTreeG = correlatedRGB ? treeR.args[1] : treeG;
  const canvasTreeB = correlatedRGB ? treeR.args[2] : treeB;

  if (renderMode === 'glsl') {
    return (
      <WebGLCanvas
        treeR={treeR}
        treeG={treeG}
        treeB={treeB}
        running={running}
      />
    );
  }

  return (
    <CPUCanvas
      treeR={canvasTreeR}
      treeG={canvasTreeG}
      treeB={canvasTreeB}
    />
  );
}
