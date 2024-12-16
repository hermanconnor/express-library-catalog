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

// Book validation schema
export const authorSchema = z.object({
  first_name: z
    .string()
    .trim()
    .min(1, 'First name is required')
    .max(100, 'First name must be at most 100 characters'),
  family_name: z
    .string()
    .trim()
    .min(1, 'Family name is required')
    .max(100, 'Family name must be at most 100 characters'),
  date_of_birth: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Date.parse(val)), {
      message: 'Invalid date format for date of birth',
    })
    .transform((val) => (val ? new Date(val) : null)),
  date_of_death: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Date.parse(val)), {
      message: 'Invalid date format for date of death',
    })
    .transform((val) => (val ? new Date(val) : null)),
});

export type AuthorType = z.infer<typeof authorSchema>;
