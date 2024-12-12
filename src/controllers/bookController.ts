import { RequestHandler } from 'express';

import AuthorService from '../services/AuthorService';
import BookinstanceService from '../services/BookinstanceService';
import BookService from '../services/BookService';
import GenreService from '../services/GenreService';
import { bookSchema } from '../lib/validation';

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

export const bookCreatePost: RequestHandler = async (req, res, next) => {
  try {
    const parsedData = bookSchema.safeParse(req.body);

    if (!parsedData.success) {
      const [allAuthors, allGenres] = await Promise.all([
        AuthorService.getAllAuthors(),
        GenreService.getAllGenres(),
      ]);

      return res.render('books/book_form', {
        title: 'Create Book',
        authors: allAuthors,
        genres: allGenres,
        book: req.body,
        errors: parsedData.error.errors,
      });
    }

    const newBook = await BookService.createBook(parsedData.data);

    res.redirect(newBook.url);
  } catch (error) {
    next(error);
  }
};

export const bookDeleteGet: RequestHandler = async (req, res, next) => {
  try {
    const bookId = req.id;

    const [book, bookInstances] = await Promise.all([
      BookService.getBookById(bookId as number),
      BookinstanceService.getBookInstancesByBookId(bookId as number),
    ]);

    if (!book) {
      return res.redirect('/catalog/books');
    }

    res.render('books/book_delete', {
      title: 'Delete Book',
      book,
      book_instances: bookInstances,
    });
  } catch (error) {
    next(error);
  }
};

export const bookDeletePost: RequestHandler = async (req, res, next) => {
  try {
    const bookId = req.id;

    const [book, bookInstances] = await Promise.all([
      BookService.getBookById(bookId as number),
      BookinstanceService.getBookInstancesByBookId(bookId as number),
    ]);

    if (!book) {
      return res.redirect('/catalog/books');
    }

    if (bookInstances.length > 0) {
      // Book has book_instances. Render in same way as for GET route.
      return res.render('books/book_delete', {
        title: 'Delete Book',
        book,
        book_instances: bookInstances,
      });
    }

    // Book has no BookInstance objects. Delete object and redirect to the list of books.
    await BookService.deleteBook(bookId as number);

    res.redirect('/catalog/books');
  } catch (error) {
    next(error);
  }
};
