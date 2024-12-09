import { RequestHandler } from 'express';

import AuthorService from '../services/AuthorService';
import BookinstanceService from '../services/BookinstanceService';
import BookService from '../services/BookService';
import GenreService from '../services/GenreService';

export const index: RequestHandler = async (req, res, next) => {
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

export const bookList: RequestHandler = async (req, res, next) => {
  try {
    const books = await BookService.getAllBooks();

    res.render('books/book_list', { title: 'Book List', book_list: books });
  } catch (error) {
    next(error);
  }
};

export const bookCreateGet: RequestHandler = async (req, res, next) => {
  try {
    const [allAuthors, allGenres] = await Promise.all([
      AuthorService.getAllAuthors(),
      GenreService.getAllGenres(),
    ]);

    res.render('books/book_form', {
      title: 'Create Book',
      authors: allAuthors,
      genres: allGenres,
    });
  } catch (error) {
    next(error);
  }
};
