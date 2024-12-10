import prisma from './lib/prisma';

const genres = ['Fantasy', 'Science Fiction', 'French Poetry'];
const authors = [
  {
    first_name: 'Patrick',
    family_name: 'Rothfuss',
    date_of_birth: '1973-06-06',
    date_of_death: null,
  },
  {
    first_name: 'Ben',
    family_name: 'Bova',
    date_of_birth: '1932-11-08',
    date_of_death: null,
  },
  {
    first_name: 'Isaac',
    family_name: 'Asimov',
    date_of_birth: '1920-01-02',
    date_of_death: '1992-04-06',
  },
  {
    first_name: 'Bob',
    family_name: 'Billings',
    date_of_birth: null,
    date_of_death: null,
  },
  {
    first_name: 'Jim',
    family_name: 'Jones',
    date_of_birth: '1971-12-16',
    date_of_death: null,
  },
];

const books = [
  {
    title: 'The Name of the Wind (The Kingkiller Chronicle, #1)',
    isbn: '9781473211896',
    summary:
      'I have stolen princesses back from sleeping barrow kings. I burned down the town of Trebon. I have spent the night with Felurian and left with both my sanity and my life. I was expelled from the University at a younger age than most people are allowed in. I tread paths by moonlight that others fear to speak of during day. I have talked to Gods, loved women, and written songs that make the minstrels weep.',
    authorIndex: 0,
    genreIndexes: [0],
  },
  {
    title: "The Wise Man's Fear (The Kingkiller Chronicle, #2)",
    isbn: '9788401352836',
    summary:
      'Picking up the tale of Kvothe Kingkiller once again, we follow him into exile, into political intrigue, courtship, adventure, love and magic... and further along the path that has turned Kvothe, the mightiest magician of his age, a legend in his own time, into Kote, the unassuming pub landlord.',
    authorIndex: 0,
    genreIndexes: [0],
  },
  {
    title: 'The Slow Regard of Silent Things (Kingkiller Chronicle)',
    isbn: '9780756411336',
    summary:
      'Deep below the University, there is a dark place. Few people know of it: a broken web of ancient passageways and abandoned rooms. A young woman lives there, tucked among the sprawling tunnels of the Underthing, snug in the heart of this forgotten place.',
    authorIndex: 0,
    genreIndexes: [0],
  },
  {
    title: 'Apes and Angels',
    isbn: '9780765379528',
    summary:
      'Humankind headed out to the stars not for conquest, nor exploration, nor even for curiosity. Humans went to the stars in a desperate crusade to save intelligent life wherever they found it. A wave of death is spreading through the Milky Way galaxy, an expanding sphere of lethal gamma ...',
    authorIndex: 1,
    genreIndexes: [1],
  },
  {
    title: 'Death Wave',
    isbn: '9780765379504',
    summary:
      "In Ben Bova's previous novel New Earth, Jordan Kell led the first human mission beyond the solar system. They discovered the ruins of an ancient alien civilization. But one alien AI survived, and it revealed to Jordan Kell that an explosion in the black hole at the heart of the Milky Way galaxy has created a wave of deadly radiation, expanding out from the core toward Earth. Unless the human race acts to save itself, all life on Earth will be wiped out...",
    authorIndex: 1,
    genreIndexes: [1],
  },
  {
    title: 'Test Book 1',
    isbn: 'ISBN111111',
    summary: 'Summary of test book 1',
    authorIndex: 4,
    genreIndexes: [0, 1],
  },
  {
    title: 'Test Book 2',
    isbn: 'ISBN222222',
    summary: 'Summary of test book 2',
    authorIndex: 4,
    genreIndexes: [],
  },
];

const bookInstances = [
  {
    bookIndex: 0,
    imprint: 'London Gollancz, 2014.',
    status: 'Available',
    due_back: null,
  },
  {
    bookIndex: 1,
    imprint: 'Gollancz, 2011.',
    status: 'Loaned',
    due_back: null,
  },
  {
    bookIndex: 2,
    imprint: 'Gollancz, 2015.',
    status: null,
    due_back: null,
  },
  {
    bookIndex: 3,
    imprint: 'New York Tom Doherty Associates, 2016.',
    status: 'Available',
    due_back: null,
  },
  {
    bookIndex: 4,
    imprint: 'New York Tom Doherty Associates, 2016.',
    status: 'Available',
    due_back: null,
  },
  {
    bookIndex: 5,
    imprint: 'New York Tom Doherty Associates, 2016.',
    status: 'Available',
    due_back: null,
  },
  {
    bookIndex: 6,
    imprint: 'New York, NY Tom Doherty Associates, LLC, 2015.',
    status: 'Available',
    due_back: null,
  },
  {
    bookIndex: 7,
    imprint: 'New York, NY Tom Doherty Associates, LLC, 2015.',
    status: 'Maintenance',
    due_back: null,
  },
  {
    bookIndex: 8,
    imprint: 'New York, NY Tom Doherty Associates, LLC, 2015.',
    status: 'Loaned',
    due_back: null,
  },
  {
    bookIndex: 0,
    imprint: 'Imprint XXX2',
    status: null,
    due_back: null,
  },
  {
    bookIndex: 1,
    imprint: 'Imprint XXX3',
    status: null,
    due_back: null,
  },
];

// Main function to populate the database
async function main() {
  try {
    // Clear existing data
    await prisma.bookInstance.deleteMany();
    await prisma.book.deleteMany();
    await prisma.author.deleteMany();
    await prisma.genre.deleteMany();

    console.log('Starting to populate the database...');

    await createGenres();
    await createAuthors();
    await createBooks();
    await createBookInstances();

    console.log('Database population complete.');
  } catch (error) {
    console.error('Error populating the database:', error);
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma Client after the operation
  }
}

// Function to create genres
async function createGenres() {
  console.log('Adding genres...');

  for (const genreName of genres) {
    await prisma.genre.create({
      data: { name: genreName },
    });
  }

  console.log('Genres added.');
}

// Function to create authors
async function createAuthors() {
  console.log('Adding authors...');

  for (const author of authors) {
    await prisma.author.create({
      data: {
        first_name: author.first_name,
        family_name: author.family_name,
        date_of_birth: author.date_of_birth
          ? new Date(author.date_of_birth)
          : null,
        date_of_death: author.date_of_death
          ? new Date(author.date_of_death)
          : null,
      },
    });
  }

  console.log('Authors added.');
}

// Function to create books
async function createBooks() {
  console.log('Adding books...');

  for (const book of books) {
    const author = await prisma.author.findUnique({
      where: { id: book.authorIndex + 1 }, // Adjusting index to match the database ID
    });

    const genres = await prisma.genre.findMany({
      where: {
        id: { in: book.genreIndexes.map((index) => index + 1) }, // Adjusting index to match the database ID
      },
    });

    await prisma.book.create({
      data: {
        title: book.title,
        summary: book.summary,
        isbn: book.isbn,
        authorId: author?.id || 1,
        genres: {
          connect: genres.map((genre) => ({ id: genre.id })),
        },
      },
    });
  }

  console.log('Books added.');
}

// Function to create book instances
async function createBookInstances() {
  console.log('Adding book instances...');

  for (const bookInstance of bookInstances) {
    const book = await prisma.book.findUnique({
      where: { id: bookInstance.bookIndex + 1 }, // Adjusting index to match the database ID
    });

    await prisma.bookInstance.create({
      data: {
        bookId: book?.id || 1, // Fallback to the first book if not found
        imprint: bookInstance.imprint,
        status: bookInstance.status || 'Maintenance',
        due_back: bookInstance.due_back
          ? new Date(bookInstance.due_back)
          : undefined,
      },
    });
  }

  console.log('Book instances added.');
}

// Execute the main function
main();
