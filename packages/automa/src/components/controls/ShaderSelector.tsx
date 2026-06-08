import { Select } from '@repo/ui/Select';
import { getAllShaders } from '../../core/shaders/registry.ts';
import { setShader } from '../../stores/ui/actions.ts';
import { useShaderId } from '../../stores/ui/selectors.ts';
import { ShaderPropsControls } from './ShaderPropsControls.tsx';

function ShaderSelector() {
  const shaderId = useShaderId();
  const shaders = getAllShaders();

  return (
    <div className="flex flex-col gap-2">
      <Select
        label="Shader"
        value={shaderId}
        onChange={(e) => setShader(e.target.value)}
      >
        {shaders.map((shader) => (
          <option
            key={shader.id}
            value={shader.id}
          >
            {shader.name}
          </option>
        ))}
      </Select>
      <ShaderPropsControls />
    </div>
  );
}

export { ShaderSelector };
