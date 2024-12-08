import path from 'path';
import express from 'express';
import morgan from 'morgan';

import notFound from './middleware/notFound';
import errorHandler from './middleware/errorHandler';

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

// ROUTES

// 404 HANDLER
app.use(notFound);

// ERROR HANDLER
app.use(errorHandler());

export default app;
