import { randomartStore } from '../store';

export function setActiveChannel(channel: 'red' | 'green' | 'blue'): void {
  randomartStore.setState({ activeChannel: channel });
}
