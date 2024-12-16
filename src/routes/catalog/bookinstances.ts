import { Router } from 'express';

import * as bookinstanceController from '../../controllers/bookinstanceController';
import { validateParamsId } from '../../middleware/validateParamsId';

const router = Router();

// GET request for creating a BookInstance
router.get(
  '/bookinstance/create',
  bookinstanceController.bookinstanceCreateGet,
);

// POST request for creating BookInstance.
router.post(
  '/bookinstance/create',
  bookinstanceController.bookinstanceCreatePost,
);

// GET delete
router.get(
  '/bookinstance/:id/delete',
  validateParamsId,
  bookinstanceController.bookinstanceDeleteGet,
);

// POST delete
router.post(
  '/bookinstance/:id/delete',
  validateParamsId,
  bookinstanceController.bookinstanceDeletePost,
);

// Get update
router.get(
  '/bookinstance/:id/update',
  validateParamsId,
  bookinstanceController.bookinstanceUpdateGet,
);

// Post update
router.post(
  '/bookinstance/:id/update',
  validateParamsId,
  bookinstanceController.bookinstanceUpdatePost,
);

// GET request for one BookInstance.
router.get(
  '/bookinstance/:id',
  validateParamsId,
  bookinstanceController.bookinstanceDetail,
);

// GET request for list of all BookInstances.
router.get('/bookinstances', bookinstanceController.bookinstanceList);

export default router;
