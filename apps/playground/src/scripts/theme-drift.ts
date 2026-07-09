import { driftConfig } from './theme-drift.config';

type DriftTarget = {
  variable: string;
  range: number;
  baseHue: number;
};

const root = document.documentElement;
let targets: DriftTarget[] = [];

function initHueVariables(): DriftTarget[] {
  const activeTargets: DriftTarget[] = [];
  const styles = getComputedStyle(root);

  // 1. Filter out disabled variables immediately
  const enabledConfigs = driftConfig.targets.filter((t) => t.enabled);

  enabledConfigs.forEach((target) => {
    const val = styles.getPropertyValue(target.variable).trim();
    const baseHue = parseFloat(val);

    if (!isNaN(baseHue)) {
      activeTargets.push({
        variable: target.variable,
        baseHue,
        // 2. Use specific range override if provided, else fall back to default
        range: target.range ?? driftConfig.defaultRange
      });
    }
  });

  return activeTargets;
}

function updateTheme(mouseX: number, mouseY: number) {
  const factorX = (mouseX / window.innerWidth) * 2 - 1;
  const factorY = (mouseY / window.innerHeight) * 2 - 1;
  const mouseFactor = (factorX + factorY) / 2;

  targets.forEach((target) => {
    const hueOffset = mouseFactor * target.range * driftConfig.sensitivity;
    // Keep standard 0-360 degree constraints intact during shifts
    const currentHue = (target.baseHue + hueOffset + 360) % 360;

    root.style.setProperty(target.variable, currentHue.toFixed(2));
  });
}

export function initDrift() {
  targets = initHueVariables();

  const handleMouseMove = (e: MouseEvent) => {
    requestAnimationFrame(() => {
      updateTheme(e.clientX, e.clientY);
    });
  };

  window.addEventListener('mousemove', handleMouseMove);
}
