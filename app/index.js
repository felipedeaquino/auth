import bodyParser from 'body-parser';
import express from 'express';

import { usersRoutes } from './routes/users.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json()).use('/api/v1', usersRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port);
