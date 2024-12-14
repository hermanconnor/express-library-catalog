import { Router } from 'express';

import * as authorController from '../../controllers/authorController';

const router = Router();

// GET request for list of All Authors.
router.get('/authors', authorController.authorList);

export default router;
