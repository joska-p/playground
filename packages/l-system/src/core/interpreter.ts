import type { Word } from '@repo/l-system-engine';
import * as THREE from 'three';

export interface TurtleOptions {
  /** Angle in degrees to turn on + / - symbols. */
  angle: number;
  /** Initial length of each forward step. */
  stepLength: number;
  /** Multiply step length by this factor each iteration (parametric). */
  lengthFactor: number;
  /** Initial line width. */
  lineWidth: number;
  /** Multiply line width by this factor per branch depth. */
  widthFactor: number;
}

export interface LineSegment {
  start: THREE.Vector3;
  end: THREE.Vector3;
  /** Depth at which this segment was drawn — used for colouring. */
  depth: number;
}

interface TurtleState {
  position: THREE.Vector3;
  /** Unit direction vector. */
  direction: THREE.Vector3;
  /** Up vector — for 3D rolls. */
  up: THREE.Vector3;
  depth: number;
}

const DEG = Math.PI / 180;

/**
 * Interprets a Word as 3D turtle-graphics commands and returns line segments.
 *
 * Symbol mapping:
 *  F / f  → move forward (F draws, f moves silently)
 *  +      → yaw left by angle
 *  -      → yaw right by angle
 *  ^      → pitch up by angle
 *  &      → pitch down by angle
 *  \      → roll left by angle
 *  /      → roll right by angle
 *  |      → turn around 180°
 *  [      → push state
 *  ]      → pop state
 */
export function interpretWord(word: Word, opts: TurtleOptions): LineSegment[] {
  const segments: LineSegment[] = [];
  const stack: TurtleState[] = [];

  const initialDir = new THREE.Vector3(0, 1, 0); // grow upward
  const initialUp = new THREE.Vector3(0, 0, 1);

  let state: TurtleState = {
    position: new THREE.Vector3(0, 0, 0),
    direction: initialDir.clone(),
    up: initialUp.clone(),
    depth: 0,
  };

  const rad = opts.angle * DEG;

  function yaw(sign: number) {
    const right = new THREE.Vector3().crossVectors(state.direction, state.up).normalize();
    const q = new THREE.Quaternion().setFromAxisAngle(state.up, sign * rad);
    state.direction.applyQuaternion(q).normalize();
    void right;
  }

  function pitch(sign: number) {
    const right = new THREE.Vector3().crossVectors(state.direction, state.up).normalize();
    const q = new THREE.Quaternion().setFromAxisAngle(right, sign * rad);
    state.direction.applyQuaternion(q).normalize();
    state.up.applyQuaternion(q).normalize();
  }

  function roll(sign: number) {
    const q = new THREE.Quaternion().setFromAxisAngle(state.direction, sign * rad);
    state.up.applyQuaternion(q).normalize();
  }

  for (const sym of word) {
    switch (sym.name) {
      case 'F': {
        const length = sym.params[0] !== undefined ? sym.params[0] * opts.lengthFactor : opts.stepLength;
        const next = state.position.clone().addScaledVector(state.direction, length);
        segments.push({ start: state.position.clone(), end: next, depth: state.depth });
        state.position = next;
        break;
      }
      case 'f': {
        const length = sym.params[0] !== undefined ? sym.params[0] * opts.lengthFactor : opts.stepLength;
        state.position.addScaledVector(state.direction, length);
        break;
      }
      case '+': yaw(1); break;
      case '-': yaw(-1); break;
      case '^': pitch(1); break;
      case '&': pitch(-1); break;
      case '\\': roll(1); break;
      case '/': roll(-1); break;
      case '|': {
        const q = new THREE.Quaternion().setFromAxisAngle(state.up, Math.PI);
        state.direction.applyQuaternion(q).normalize();
        break;
      }
      case '[':
        stack.push({
          position: state.position.clone(),
          direction: state.direction.clone(),
          up: state.up.clone(),
          depth: state.depth + 1,
        });
        state.depth += 1;
        break;
      case ']': {
        const popped = stack.pop();
        if (popped) state = popped;
        break;
      }
      default:
        break;
    }
  }

  return segments;
}
