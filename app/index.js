import express from 'express';
import bodyParser from 'body-parser';
import { usersRoutes } from './routes/users.js';

const app = express()
const port = process.env.PORT || 3000

app
  .use(bodyParser.json())
  .use('/auth', usersRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`App listening on port ${port}!`)
})