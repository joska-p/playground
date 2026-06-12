// graph/Legend.tsx
// Fixed legend overlay + reusable Dot indicator.

import { communityColor } from './palette';
import { styles } from './styles';

const Dot = ({ c }: { c: string }) => (
  <span
    style={{
      display: 'inline-block',
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: c,
      marginRight: 5
    }}
  />
);

const ITEMS = [
  { c: communityColor(32), label: 'Community cluster' },
  { c: '#4cc9f0', label: 'Code node' },
  { c: '#f77f00', label: 'Document node' },
  { c: '#06d6a0', label: 'Image node' }
];

const Legend = () => (
  <div style={styles.legend}>
    {ITEMS.map((it) => (
      <div
        key={it.label}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <Dot c={it.c} />
        <span style={styles.legendLabel}>{it.label}</span>
      </div>
    ))}
  </div>
);

export { Dot, Legend };
