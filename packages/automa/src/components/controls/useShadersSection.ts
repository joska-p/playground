import type { Control, ControlSection } from '@repo/ui/ControlPanel';
import { getAllShaders } from '../../shaders/registry';

import { setGlowColor, setShader } from '../../stores/ui/actions';
import { useGlowColor, useShaderId } from '../../stores/ui/selectors';

function useShadersSection() {
  const shaderId = useShaderId();
  const glowColor = useGlowColor();
  const shaders = getAllShaders();

  const shaderControl: Control = {
    id: 'shader',
    type: 'select',
    label: 'Shader',
    value: shaderId,
    options: shaders.map((s) => ({ label: s.name, value: s.id })),
    onChange: setShader
  };

  const glowColorControl: Control = {
    id: 'glowColor',
    type: 'color',
    label: 'Glow',
    value: glowColor,
    onChange: setGlowColor
  };

  const shadersSection: ControlSection = {
    id: 'shader',
    label: 'Shader',
    defaultOpen: true,
    controls: [shaderControl, glowColorControl]
  };

  return shadersSection;
}

export { useShadersSection };
