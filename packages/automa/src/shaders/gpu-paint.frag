#version 300 es
precision highp float;

in vec2 vUv;
out vec4 fragColor;

uniform sampler2D u_state;
uniform ivec2 u_targetCell;
uniform float u_value;

void main() {
        vec4 current = texture(u_state, vUv);
        ivec2 thisCell = ivec2(gl_FragCoord.xy);

        if (all(equal(thisCell, u_targetCell))) {
                float normalized = u_value / 255.0;
                fragColor = vec4(normalized, normalized, normalized, 1.0);
        } else {
                fragColor = current;
        }
}
