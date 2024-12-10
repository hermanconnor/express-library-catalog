import { Router } from 'express';
import * as bookController from '../../controllers/bookController';

const router = Router();

// GET catalog home page
router.get('/', bookController.index);

// GET request for creating a Book.
router.get('/book/create', bookController.bookCreateGet);

// GET request for list of all Book.
router.get('/books', bookController.bookList);

export default router;
