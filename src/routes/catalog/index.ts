import { Router } from 'express';
import bookRouter from './books';

const router = Router();

router.use('/catalog', bookRouter);

export default router;
