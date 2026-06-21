import { randomartStore } from '../store';

export function setActiveChannel(channel: 'red' | 'green' | 'blue'): void {
  randomartStore.setState(
    { activeChannel: channel },
    false,
    'display/setActiveChannel'
  );
}

export function setCorrelatedRGB(correlatedRGB: boolean): void {
  randomartStore.setState({ correlatedRGB }, false, 'display/setCorrelatedRGB');
}
