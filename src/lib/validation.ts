import { z } from 'zod';

// Book validation schema
export const bookSchema = z.object({
  title: z.string().min(1, 'Title is required.').trim(),
  author: z.string().min(1, 'Author is required.').trim(),
  summary: z.string().min(1, 'Summary is required.').trim(),
  isbn: z.string().min(1, 'ISBN is required.').trim(),
  genre: z
    .union([z.string(), z.array(z.string())])
    .transform((value) => (typeof value === 'string' ? [value] : value))
    .optional()
    .default([]),
});

export type BookType = z.infer<typeof bookSchema>;
