import { Router } from 'express';

import * as genreController from '../../controllers/genreController';
import { validateParamsId } from '../../middleware/validateParamsId';

const router = Router();

// GET request for creating a Genre. NOTE This must come before route that displays Genre (uses id).
router.get('/genre/create', genreController.genreCreateGet);

// POST request for creating Genre.
router.post('/genre/create', genreController.genreCreatePost);

// GET request to delete Genre.
router.get(
  '/genre/:id/delete',
  validateParamsId,
  genreController.genreDeleteGet,
);

// POST request to delete Genre.
router.post(
  '/genre/:id/delete',
  validateParamsId,
  genreController.genreDeletePost,
);

// GET request to update Genre.
router.get(
  '/genre/:id/update',
  validateParamsId,
  genreController.genreUpdateGet,
);

// POST request to update Genre.
router.post(
  '/genre/:id/update',
  validateParamsId,
  genreController.genreUpdatePost,
);

// GET request for one Genre.
router.get('/genre/:id', validateParamsId, genreController.genreDetail);

// GET request for list of all Genre.
router.get('/genres', genreController.genreList);

export default router;
