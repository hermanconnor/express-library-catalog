import { Router } from 'express';
import * as bookController from '../../controllers/bookController';
import { validateParamsId } from '../../middleware/validateParamsId';

const router = Router();

// GET catalog Home Page
router.get('/', bookController.index);

// GET request for creating a Book.
router.get('/book/create', bookController.bookCreateGet);

// POST request for Creating Book.
router.post('/book/create', bookController.bookCreatePost);

// GET request to Delete Book.
router.get('/book/:id/delete', validateParamsId, bookController.bookDeleteGet);

// POST request to Delete Book
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

// GET request for Single Book.
router.get('/book/:id', validateParamsId, bookController.bookDetail);

// GET request for list of all Book.
router.get('/books', bookController.bookList);

export default router;
