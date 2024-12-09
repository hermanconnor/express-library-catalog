import { RequestHandler } from 'express';
import BookService from '../services/BookService';

export const bookList: RequestHandler = async (req, res, next) => {
  try {
    const books = await BookService.getAllBooks();
    res.render('book_list', { title: 'Book List', book_list: books });
  } catch (error) {
    next(error);
  }
};
