#version 300 es
precision highp float;

in vec2 vUv;
out vec4 fragColor;

uniform highp sampler2D u_state;
uniform vec2 u_gridSize;
uniform int u_birth[9];
uniform int u_survive[9];
uniform int u_stateCount;

int cellAt(ivec2 coord) {
    ivec2 p = coord;
    p.x = (p.x + int(u_gridSize.x)) % int(u_gridSize.x);
    p.y = (p.y + int(u_gridSize.y)) % int(u_gridSize.y);
    // Red channel stores state
    return int(texelFetch(u_state, p, 0).r * 255.0 + 0.5);
}

void main() {
    ivec2 coord = ivec2(gl_FragCoord.xy);
    vec4 currentTexel = texelFetch(u_state, coord, 0);
    int current = int(currentTexel.r * 255.0 + 0.5);
    float currentAge = currentTexel.g;

    int neighbors = 0;
    for (int dy = -1; dy <= 1; dy++) {
        for (int dx = -1; dx <= 1; dx++) {
            if (dx == 0 && dy == 0) continue;
            // In Generations, usually state 1 represents active "Alive" neighbors
            if (cellAt(coord + ivec2(dx, dy)) == 1) neighbors++;
        }
    }

    // --- AUTOMATON STATE LOGIC ---
    float nextState = 0.0;
    if (current == 1) {
        nextState = u_survive[neighbors] != 0 ? 1.0 / 255.0 : u_stateCount > 2 ? 2.0 / 255.0 : 0.0;
    } else if (current > 1) {
        int maxState = u_stateCount - 1;
        nextState = float(current == maxState ? 0 : current + 1) / 255.0;
    } else {
        nextState = u_birth[neighbors] != 0 ? 1.0 / 255.0 : 0.0;
    }

    // --- AGE / TRAIL ACCUMULATION LOGIC ---
    float nextAge = currentAge;

    if (nextState == 1.0 / 255.0) {
        // Cell is active: increment age up to 1.0 (0.02 = takes 50 frames to max out glow)
        nextAge = min(1.0, currentAge + 0.02);
    } else {
        // Cell is dead or decaying: cool down slowly over time (decay rate)
        nextAge = max(0.0, currentAge - 0.015);
    }

    // R = State, G = Age / Heat, B = Unused, A = 1.0
    fragColor = vec4(nextState, nextAge, 0.0, 1.0);
}
