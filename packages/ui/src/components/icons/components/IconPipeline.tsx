import { createIcon } from '../lib';

export const IconPipeline = createIcon({
  name: 'pipeline',
  viewBox: '0 0 80 60',
  children: (
    <>
      <rect x="4" y="18" width="18" height="24" rx="4" fill="currentColor" opacity={0.8} />
      <polygon points="26,30 34,24 34,36" fill="currentColor" opacity={0.4} />
      <rect x="38" y="16" width="16" height="28" rx="4" fill="currentColor" opacity={0.65} />
      <polygon points="58,30 66,24 66,36" fill="currentColor" opacity={0.4} />
      <rect x="62" y="20" width="14" height="20" rx="4" fill="currentColor" opacity={0.5} />
      <circle cx="13" cy="30" r="3" fill="currentColor" opacity={0.9} />
      <circle cx="46" cy="30" r="3" fill="currentColor" opacity={0.9} />
      <circle cx="69" cy="30" r="3" fill="currentColor" opacity={0.9} />
    </>
  ),
});
