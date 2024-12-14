import { RequestHandler } from 'express';

import AuthorService from '../services/AuthorService';

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
