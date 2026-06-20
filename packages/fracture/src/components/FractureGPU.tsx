import { useEffect, useRef } from 'react';
import fragShader from './shaders/basic.frag?raw';
import vertShader from './shaders/basic.vert?raw';

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

    gl.clearColor(0.8, 0.1, 0.1, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    if (!vertexShader) return;
    gl.shaderSource(vertexShader, vertShader);
    gl.compileShader(vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    if (!fragmentShader) return;
    gl.shaderSource(fragmentShader, fragShader);
    gl.compileShader(fragmentShader);

    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    const bucket = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bucket);

    const vertices = new Float32Array([
      0.0,
      0.5, // Top Point
      -0.5,
      -0.5, // Bottom Left Point
      0.5,
      -0.5 // Bottom Right Point
    ]);

    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    gl.linkProgram(program);
    gl.useProgram(program);

    // 1. Ask the shader program where the "position" variable lives
    const positionAttributeLocation = gl.getAttribLocation(program, 'position');

    // 2. Turn on the data stream for this attribute location
    gl.enableVertexAttribArray(positionAttributeLocation);

    // 3. Describe how to read the data (2 floating point numbers per vertex)
    const size = 2; // 2 components per iteration (X, Y)
    const type = gl.FLOAT; // the data is 32bit floats
    const normalize = false; // don't normalize the data
    const stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
    const offset = 0; // start at the beginning of the buffer
    gl.vertexAttribPointer(
      positionAttributeLocation,
      size,
      type,
      normalize,
      stride,
      offset
    );

    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="block h-full w-full"
    />
  );
}

export { FractureGPU };
