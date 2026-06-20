import { getAllShaders } from '@repo/automa-engine/shaders/registry';
import { Select } from '@repo/ui/Select';
import { setShader } from '../../stores/ui/actions';
import { useShaderId } from '../../stores/ui/selectors';
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
