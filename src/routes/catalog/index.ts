import { Router } from 'express';
import * as indexController from '../../controllers/indexController';
import bookRouter from './book';

const router = Router();

router.use('/', indexController.allCounts);

router.use('/book', bookRouter);

export default router;
