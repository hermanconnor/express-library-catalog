import { Router } from 'express';
import bookRouter from './books';
import authorRouter from './authors';

const router = Router();

router.use('/catalog', bookRouter);
router.use('/catalog', authorRouter);

export default router;
