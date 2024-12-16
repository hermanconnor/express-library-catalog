import { RequestHandler } from 'express';
import createHttpError from 'http-errors';

import AuthorService from '../services/AuthorService';
import BookService from '../services/BookService';
import { authorSchema } from '../lib/validation';

export const authorList: RequestHandler = async (req, res, next) => {
  try {
    const authors = await AuthorService.getAllAuthors();

    res.render('authors/author_list', {
      title: 'Author List',
      author_list: authors,
    });
  } catch (error) {
    next(error);
  }
};

export const authorDetail: RequestHandler = async (req, res, next) => {
  try {
    const authorId = req.id as number;

    const [author, booksByAuthor] = await Promise.all([
      AuthorService.getAuthorById(authorId),
      BookService.getBooksByAuthor(authorId),
    ]);

    if (!author) {
      return next(createHttpError(404, 'Author not found'));
    }

    res.render('authors/author_detail', {
      title: 'Author Detail',
      author,
      author_books: booksByAuthor,
    });
  } catch (error) {
    next(error);
  }
};

export const authorCreateGet: RequestHandler = async (req, res, next) => {
  res.render('authors/author_form', { title: 'Create Author' });
};

export const authorCreatePost: RequestHandler = async (req, res, next) => {
  try {
    const parsedData = authorSchema.safeParse(req.body);

    if (!parsedData.success) {
      return res.render('authors/author_form', {
        title: 'Create Author',
        author: req.body,
        errors: parsedData.error.errors,
      });
    }

    const newAuthor = await AuthorService.createAuthor(parsedData.data);

    res.redirect(newAuthor.url);
  } catch (error) {
    next(error);
  }
};

export const authorDeleteGet: RequestHandler = async (req, res, next) => {
  try {
    const authorId = req.id as number;

    const [author, booksByAuthor] = await Promise.all([
      AuthorService.getAuthorById(authorId),
      BookService.getBooksByAuthor(authorId),
    ]);

    if (!author) {
      res.redirect('/catalog/authors');
    }

    res.render('authors/author_delete', {
      title: 'Delete Author',
      author,
      author_books: booksByAuthor,
    });
  } catch (error) {
    next(error);
  }
};

export const authorDeletePost: RequestHandler = async (req, res, next) => {
  try {
    const authorId = req.id as number;

    const [author, booksByAuthor] = await Promise.all([
      AuthorService.getAuthorById(authorId),
      BookService.getBooksByAuthor(authorId),
    ]);

    if (booksByAuthor.length > 0) {
      // Author has books. Render in same way as for GET route.
      return res.render('authors/author_delete', {
        titlle: 'Delete Author',
        author,
        author_books: booksByAuthor,
      });
    }

    await AuthorService.deleteAuthor(authorId);

    res.redirect('/catalog/authors');
  } catch (error) {
    next(error);
  }
};

export const authorUpdateGet: RequestHandler = async (req, res, next) => {
  try {
    const authorId = req.id as number;

    const author = await AuthorService.getAuthorById(authorId);

    if (!author) {
      return next(createHttpError(404, 'Author not found'));
    }

    res.render('authors/author_form', { title: 'Update Author', author });
  } catch (error) {
    next(error);
  }
};

// AUTHOR UPDATE form (POST)
export const authorUpdatePost: RequestHandler = async (req, res, next) => {
  try {
    const authorId = req.id as number;

    const parsedData = authorSchema.safeParse(req.body);

    if (!parsedData.success) {
      return res.render('authors/author_form', {
        title: 'Update Author',
        author: req.body,
        errors: parsedData.error.errors,
      });
    }

    const updatedAuthor = await AuthorService.updateAuthor(
      authorId,
      parsedData.data,
    );

    res.redirect(updatedAuthor.url);
  } catch (error) {
    next(error);
  }
};
