#version 300 es
precision highp float;

in vec2 v_uv;
out vec4 fragColor;

uniform sampler2D u_stateTexture; // Read FBO texture
uniform vec2 u_resolution;        // Grid dimensions (e.g., 1024x1024)

int getCell(vec2 offset) {
    // Sample neighbor using pixel offsets
    vec2 uv = (gl_FragCoord.xy + offset) / u_resolution;
    // Standard R8 / RGBA sample (1.0 = alive, 0.0 = dead)
    return texture(u_stateTexture, uv).r > 0.5 ? 1 : 0;
}

void main() {
    int current = getCell(vec2(0.0, 0.0));

    // Sum 8 neighbors
    int neighbors = getCell(vec2(-1.0, -1.0)) + getCell(vec2(0.0, -1.0)) + getCell(vec2(1.0, -1.0)) +
                    getCell(vec2(-1.0,  0.0))                            + getCell(vec2(1.0,  0.0)) +
                    getCell(vec2(-1.0,  1.0)) + getCell(vec2(0.0,  1.0)) + getCell(vec2(1.0,  1.0));

    // Cellular Automaton Rule
    float nextState = 0.0;
    if (current == 1) {
        nextState = (neighbors == 2 || neighbors == 3) ? 1.0 : 0.0;
    } else {
        nextState = (neighbors == 3) ? 1.0 : 0.0;
    }

    fragColor = vec4(nextState, nextState, nextState, 1.0);
}
