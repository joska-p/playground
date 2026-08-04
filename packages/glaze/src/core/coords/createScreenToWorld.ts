import { screenToWorld, type Camera } from './camera';

export function createScreenToWorld(camera: Camera) {
  return screenToWorld(camera);
}
