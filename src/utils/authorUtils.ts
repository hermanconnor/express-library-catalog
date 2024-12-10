import { format } from 'date-fns';
import { Author } from '@prisma/client';

export const addAuthorVirtualFields = (author: Author) => {
  return {
    ...author,
    name: `${author.family_name}, ${author.first_name}`,
    url: `/catalog/author/${author.id}`,
    lifespan: getLifespan(author),
    date_of_birth_yyyy_mm_dd: formatDate(author.date_of_birth),
    date_of_death_yyyy_mm_dd: formatDate(author.date_of_death),
  };
};

function formatDate(date: Date | null): string | null {
  if (!date) return null;

  return format(
    new Date(date).toLocaleDateString('en-US', {
      timeZone: 'UTC',
    }),
    'yyyy-MM-dd',
  );
}

function getLifespan(author: Author): string {
  let lifetimeString = '';

  if (author.date_of_birth) {
    // Format the date using a medium date format (e.g., Nov 15, 2024)
    lifetimeString = format(
      new Date(author.date_of_birth).toLocaleDateString('en-US', {
        timeZone: 'UTC',
      }),
      'MMM dd, yyyy',
    );
  }

  lifetimeString += ' - ';

  if (author.date_of_death) {
    // Format the date of death similarly
    lifetimeString += format(
      new Date(author.date_of_death).toLocaleDateString('en-US', {
        timeZone: 'UTC',
      }),
      'MMM dd, yyyy',
    );
  }

  return lifetimeString;
}
