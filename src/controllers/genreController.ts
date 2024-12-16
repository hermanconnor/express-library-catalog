import { RequestHandler } from 'express';
import createHttpError from 'http-errors';

import GenreService from '../services/GenreService';
import { genreSchema } from '../lib/validation';

export const genreList: RequestHandler = async (req, res, next) => {
  try {
    const genres = await GenreService.getAllGenres();

    res.render('genres/genre_list', {
      title: 'Genre List',
      list_genres: genres,
    });
  } catch (error) {
    next(error);
  }
};

export const genreDetail: RequestHandler = async (req, res, next) => {
  try {
    const genreId = req.id as number;

    const genre = await GenreService.getGenreWithBooks(genreId);

    if (!genre) {
      return next(createHttpError(404, 'Genre not found'));
    }

    res.render('genres/genre_detail', {
      title: 'Genre Detail',
      genre,
      genre_books: genre.books,
    });
  } catch (error) {
    next(error);
  }
};

export const genreCreateGet: RequestHandler = async (req, res, next) => {
  try {
    res.render('genres/genre_form', { title: 'Create Genre' });
  } catch (error) {
    next(error);
  }
};

export const genreCreatePost: RequestHandler = async (req, res, next) => {
  try {
    const parsedData = genreSchema.safeParse(req.body);

    if (!parsedData.success) {
      res.render('genres/genre_form', {
        title: 'Create Genre',
        genre: req.body,
        errors: parsedData.error.errors,
      });

      return;
    }

    const { name } = parsedData.data;

    const existingGenre = await GenreService.getGenreByName(name);

    if (existingGenre) {
      return res.redirect(existingGenre.url);
    }

    const genre = await GenreService.createGenre(parsedData.data);

    res.redirect(genre.url);
  } catch (error) {
    next(error);
  }
};

export const genreDeleteGet: RequestHandler = async (req, res, next) => {
  try {
    const genreId = req.id as number;

    const genre = await GenreService.getGenreWithBooks(genreId);

    if (!genre) {
      return res.redirect('/catalog/genres');
    }

    res.render('genres/genre_delete', {
      title: 'Delete Genre',
      genre,
      genre_books: genre.books,
    });
  } catch (error) {
    next(error);
  }
};

export const genreDeletePost: RequestHandler = async (req, res, next) => {
  try {
    const genreId = req.id as number;

    const genre = await GenreService.getGenreWithBooks(genreId);

    if (genre.books.length > 0) {
      return res.render('genres/genre_delete', {
        title: 'Delete Genre',
        genre,
        genre_books: genre.books,
      });
    }

    await GenreService.deleteGenre(genreId);

    res.redirect('/catalog/genres');
  } catch (error) {
    next(error);
  }
};

export const genreUpdateGet: RequestHandler = async (req, res, next) => {
  try {
    const genreId = req.id as number;

    const genre = await GenreService.getGenreById(genreId);

    if (!genre) {
      return next(createHttpError(404, 'Genre not found'));
    }

    res.render('genres/genre_form', { title: 'Update Genre', genre });
  } catch (error) {
    next(error);
  }
};

export const genreUpdatePost: RequestHandler = async (req, res, next) => {
  try {
    const genreId = req.id as number;

    const parsedData = genreSchema.safeParse(req.body);

    if (!parsedData.success) {
      return res.render('genres/genre_form', {
        title: 'Update Genre',
        genre: req.body,
        errors: parsedData.error.errors,
      });
    }

    const { name } = parsedData.data;

    const updatedGenre = await GenreService.updateGenre(genreId, name);

    res.redirect(updatedGenre.url);
  } catch (error) {
    next(error);
  }
};
