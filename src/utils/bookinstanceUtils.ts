import { format } from 'date-fns';

export function formatDueBack(dueBack: Date | null) {
  if (!dueBack) return null;

  return format(
    new Date(dueBack).toLocaleDateString('en-US', {
      timeZone: 'UTC',
    }),
    'MMM dd, yyyy',
  );
}

export function formatDueBackToISO(dueBack: Date | null) {
  if (!dueBack) return null;

  return format(
    new Date(dueBack).toLocaleDateString('en-US', {
      timeZone: 'UTC',
    }),
    'yyyy-MM-dd',
  );
}
