import { Router } from 'express';
import authorRouter from './authors';
import bookRouter from './books';
import bookinstanceRouter from './bookinstances';
import genreRouter from './genres';

const router = Router();

router.use('/catalog', bookRouter);
router.use('/catalog', authorRouter);
router.use('/catalog', bookinstanceRouter);
router.use('/catalog', genreRouter);

export default router;
