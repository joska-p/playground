import { randomartStore, updateTreeConfig } from '../store';

export function setActiveChannel(channel: 'red' | 'green' | 'blue'): void {
  randomartStore.setState(
    { activeChannel: channel },
    false,
    'display/setActiveChannel'
  );
}

export function setCorrelatedRGB(correlatedRGB: boolean): void {
  updateTreeConfig(() => ({ correlatedRGB }), 'display/setCorrelatedRGB');
}
