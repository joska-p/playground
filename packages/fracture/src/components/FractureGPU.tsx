import { useEffect, useRef } from 'react';
import fragmentShaderSrc from './shaders/basic.frag';
import vertexShaderSrc from './shaders/basic.vert';

function FractureGPU() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = (canvas.width = canvas.clientWidth);
    const height = (canvas.height = canvas.clientHeight);

    const gl = canvas.getContext('webgl2');
    if (!gl) {
      console.error(
        'Unable to initialize WebGL. Your browser or machine may not support it.'
      );
      return;
    }

    gl.viewport(0, 0, width, height);
    gl.clearColor(0.1, 0.1, 0.1, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const program = gl.createProgram();
    if (!program) {
      console.error('program cannot be created.');
      return;
    }

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    if (!vertexShader) {
      console.error('vertexShader cannot be created.');
      return;
    }
    gl.shaderSource(vertexShader, vertexShaderSrc);
    gl.compileShader(vertexShader);
    gl.attachShader(program, vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    if (!fragmentShader) {
      console.error('fragmentShader cannot be created.');
      return;
    }
    gl.shaderSource(fragmentShader, fragmentShaderSrc);
    gl.compileShader(fragmentShader);
    gl.attachShader(program, fragmentShader);

    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getShaderInfoLog(vertexShader));
      console.error(gl.getShaderInfoLog(fragmentShader));
    }

    gl.useProgram(program);

    const uPositionLoc = gl.getUniformLocation(program, 'uPosition');
    gl.uniform2f(uPositionLoc, 0, -0.2);

    const uPointSizeLoc = gl.getUniformLocation(program, 'uPointSize');
    gl.uniform1f(uPointSizeLoc, 100);

    const uIndexLoc = gl.getUniformLocation(program, 'uIndex');
    const uColorsLoc = gl.getUniformLocation(program, 'uColors');
    gl.uniform1i(uIndexLoc, 1);
    gl.uniform4fv(uColorsLoc, [1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0]);

    gl.drawArrays(gl.POINTS, 0, 1);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="block h-full w-full"
    />
  );
}

export { FractureGPU };
