import { createIcon } from '../lib';

export const IconStorybook = createIcon({
  name: 'storybook',
  children: (
    <>
      <circle
        cx="12"
        cy="12"
        r="10"
      />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </>
  )
});
