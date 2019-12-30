import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import webpackDevServer from './webpack/dev-server';
import routes from './routes';

//
dotenv.config({
  silent: true
});

// Express app setup
const app = express();
const DIST_DIR = path.join(__dirname, 'dist');
// HTML_FILE = path.join(DIST_DIR, "index.html");


// logger
app.use(logger('combined'));

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// cookie parser
app.use(cookieParser());

// include webpack-dev-server for development only
if (process.env.NODE_ENV !== 'production') {
  webpackDevServer(app);
}

// serve static files from 'public'
app.use(express.static(DIST_DIR));

// use routes
app.use('/', routes);

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});


export default app;
