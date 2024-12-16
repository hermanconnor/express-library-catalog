import { RequestHandler } from 'express';
import createHttpError from 'http-errors';

import BookinstanceService from '../services/BookinstanceService';
import { bookinstanceSchema } from '../lib/validation';
import BookService from '../services/BookService';

export const bookinstanceList: RequestHandler = async (req, res, next) => {
  try {
    const allBookInstances = await BookinstanceService.getAllBookInstances();

    res.render('bookinstances/bookinstance_list', {
      title: 'Book Instance List',
      bookinstance_list: allBookInstances,
    });
  } catch (error) {
    next(error);
  }
};

export const bookinstanceDetail: RequestHandler = async (req, res, next) => {
  try {
    const bookinstanceId = req.id as number;

    const bookinstance = await BookinstanceService.getBookInstanceById(
      bookinstanceId,
    );

    if (!bookinstance) {
      return next(createHttpError(404, 'Book copy not found'));
    }

    res.render('bookinstances/bookinstance_detail', {
      title: 'Bookinstance',
      bookinstance,
    });
  } catch (error) {
    next(error);
  }
};

export const bookinstanceCreateGet: RequestHandler = async (req, res, next) => {
  try {
    const books = await BookinstanceService.getBookCopies();

    res.render('bookinstances/bookinstance_form', {
      title: 'Create Book Instance',
      book_list: books,
    });
  } catch (error) {
    next(error);
  }
};

export const bookinstanceCreatePost: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const parsedData = bookinstanceSchema.safeParse(req.body);

    if (!parsedData.success) {
      const books = await BookinstanceService.getBookCopies();

      return res.render('bookinstances/bookinstance_form', {
        title: 'Create BookInstance',
        book_list: books,
        selected_book: req.body,
        bookinstance: req.body,
        errors: parsedData.error.errors,
      });
    }

    const bookinstance = await BookinstanceService.createBookinstance(
      parsedData.data,
    );

    res.redirect(bookinstance.url);
  } catch (error) {
    next(error);
  }
};

export const bookinstanceDeleteGet: RequestHandler = async (req, res, next) => {
  try {
    const bookinstanceId = req.id as number;

    const bookInstance = await BookinstanceService.getBookInstanceById(
      bookinstanceId,
    );

    if (!bookInstance) {
      return res.redirect('/catalog/bookinstances');
    }

    res.render('bookinstances/bookinstance_delete', {
      title: 'Delete BookInstance',
      bookinstance: bookInstance,
    });
  } catch (error) {
    next(error);
  }
};

export const bookinstanceDeletePost: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const bookinstanceId = req.id as number;

    await BookinstanceService.deleteBookinstance(bookinstanceId);

    res.redirect('/catalog/bookinstances');
  } catch (error) {
    next(error);
  }
};

export const bookinstanceUpdateGet: RequestHandler = async (req, res, next) => {
  try {
    const bookinstanceId = req.id as number;

    const [bookInstance, books] = await Promise.all([
      BookinstanceService.getBookInstanceById(bookinstanceId),
      BookService.getAllBooks(),
    ]);

    if (!bookInstance) {
      return next(createHttpError(404, 'Book copy not found'));
    }

    res.render('bookinstances/bookinstance_form', {
      title: 'Update BookInstance',
      book_list: books,
      selected_book: bookInstance.bookId,
      bookinstance: bookInstance,
    });
  } catch (error) {
    next(error);
  }
};

export const bookinstanceUpdatePost: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const bookinstanceId = req.id as number;

    const parsedData = bookinstanceSchema.safeParse(req.body);

    if (!parsedData.success) {
      const books = await BookinstanceService.getBookCopies();

      return res.render('bookinstances/bookinstance_form', {
        title: 'Update BookInstance',
        book_list: books,
        errors: parsedData.error.errors,
        selected_book: req.body,
        bookinstance: req.body,
      });
    }

    const updatedBookInstance = await BookinstanceService.updateBookinstance(
      bookinstanceId,
      parsedData.data,
    );

    res.redirect(updatedBookInstance.url);
  } catch (error) {
    next(error);
  }
};
