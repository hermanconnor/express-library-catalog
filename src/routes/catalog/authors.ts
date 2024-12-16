import { Router } from 'express';

import * as authorController from '../../controllers/authorController';
import { validateParamsId } from '../../middleware/validateParamsId';

const router = Router();

// GET request for creating Author. NOTE This must come before route for id (i.e. display author).
router.get('/author/create', authorController.authorCreateGet);

// POST request to Create Author.
router.post('/author/create', authorController.authorCreatePost);

// GET request to Delete Author.
router.get(
  '/author/:id/delete',
  validateParamsId,
  authorController.authorDeleteGet,
);

// POST request to Delete Author
router.post(
  '/author/:id/delete',
  validateParamsId,
  authorController.authorDeletePost,
);

// GET request to Update Author.
router.get(
  '/author/:id/update',
  validateParamsId,
  authorController.authorUpdateGet,
);

// POST request to Update Author.
router.post(
  '/author/:id/update',
  validateParamsId,
  authorController.authorUpdatePost,
);

// GET request for Single Author.
router.get('/author/:id', validateParamsId, authorController.authorDetail);

// GET request for list of All Authors.
router.get('/authors', authorController.authorList);

export default router;
