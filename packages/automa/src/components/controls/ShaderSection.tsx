import { ControlRow, ControlSection, Select } from '@repo/ui';
import { getAllShaders } from '../../shaders/registry';
import { setGlowColor, setShader } from '../../stores/ui/actions';
import { useGlowColor, useShaderId } from '../../stores/ui/selectors';

function ShaderSection() {
  const shaderId = useShaderId();
  const glowColor = useGlowColor();
  const shaders = getAllShaders();

  return (
    <ControlSection
      title="Shader"
      defaultOpen
    >
      <ControlRow label="Shader">
        <Select
          value={shaderId}
          onChange={(e) => {
            setShader(e.target.value);
          }}
        >
          {shaders.map((s) => (
            <option
              key={s.id}
              value={s.id}
            >
              {s.name}
            </option>
          ))}
        </Select>
      </ControlRow>
      <ControlRow label="Glow">
        <input
          type="color"
          value={glowColor}
          onChange={(e) => {
            setGlowColor(e.target.value);
          }}
          className="h-8 w-full cursor-pointer rounded border"
        />
      </ControlRow>
    </ControlSection>
  );
}

export { ShaderSection };
