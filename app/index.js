import bodyParser from 'body-parser';
import express from 'express';

import { usersRoutes } from './routes/users.js';

/**
 * The express() function is a top-level function exported by the express module
 * @type {function}
 */
const app = express();

/**
 * Port where server will be listening.
 * @type {number|string}
 */
const port = process.env.PORT || 3000;

app.use(bodyParser.json()).use('/api/v1', usersRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port);
