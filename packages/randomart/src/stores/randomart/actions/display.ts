import { randomartStore } from '../store';

export function setActiveChannel(channel: 'red' | 'green' | 'blue'): void {
  randomartStore.setState({ activeChannel: channel }, false, 'display/setActiveChannel');
}

export function setRenderMode(renderMode: 'canvas' | 'glsl'): void {
  randomartStore.setState({ renderMode }, false, 'display/setRenderMode');
}

export function setCorrelatedRGB(correlatedRGB: boolean): void {
  randomartStore.setState({ correlatedRGB }, false, 'display/setCorrelatedRGB');
}
