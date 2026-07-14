import { z } from 'zod';

export const demoSchema = z.object({
  text: z
    .string()
    .min(1, 'Message is required')
    .max(100, 'Message must be 100 characters or fewer'),
});
