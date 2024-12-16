interface GenreBook {
  id: number;
  title: string;
  summary: string;
}

export const addBookUrl = (book: GenreBook) => {
  return {
    ...book,
    url: `/catalog/book/${book.id}`,
  };
};

interface GenreDetails {
  id: number;
  name: string;
  books: {
    id: number;
    title: string;
    summary: string;
  }[];
}

export const addGenreWithBooks = (genre: GenreDetails) => {
  return {
    ...genre,
    url: `/catalog/genre/${genre.id}`,
  };
};
