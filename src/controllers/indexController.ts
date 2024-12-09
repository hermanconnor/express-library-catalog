import { RequestHandler } from 'express';

import AuthorService from '../services/AuthorService';
import BookinstanceService from '../services/BookinstanceService';
import BookService from '../services/BookService';
import GenreService from '../services/GenreService';

export const allCounts: RequestHandler = async (req, res, next) => {
  try {
    const currentYear = new Date().getFullYear();

    const [
      numBooks,
      numBookInstances,
      numAvailableBookInstances,
      numAuthors,
      numGenres,
    ] = await Promise.all([
      BookService.getCount(),
      BookinstanceService.getCount(),
      BookinstanceService.getCount({ status: 'Available' }),
      AuthorService.getCount(),
      GenreService.getCount(),
    ]);

    res.render('index', {
      title: 'Express Library',
      book_count: numBooks,
      book_instance_count: numBookInstances,
      book_instance_available_count: numAvailableBookInstances,
      author_count: numAuthors,
      genre_count: numGenres,
      currentYear,
    });
  } catch (error) {
    next(error);
  }
};
