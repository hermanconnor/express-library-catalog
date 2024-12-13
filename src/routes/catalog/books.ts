import { Router } from 'express';
import * as bookController from '../../controllers/bookController';
import { validateParamsId } from '../../middleware/validateParamsId';

const router = Router();

// GET catalog home page
router.get('/', bookController.index);

// GET request for creating a Book. NOTE This must come before routes that display Book (uses id).
router.get('/book/create', bookController.bookCreateGet);

// POST request for creating Book.
router.post('/book/create', bookController.bookCreatePost);

// GET request to delete Book.
router.get('/book/:id/delete', validateParamsId, bookController.bookDeleteGet);

// POST request to delete Book
router.post(
  '/book/:id/delete',
  validateParamsId,
  bookController.bookDeletePost,
);

// GET request to Update Book.
router.get('/book/:id/update', validateParamsId, bookController.bookUpdateGet);

// POST request to Update Book.
router.post(
  '/book/:id/update',
  validateParamsId,
  bookController.bookUpdatePost,
);

// GET request for list of all Book.
router.get('/books', bookController.bookList);

export default router;
