const express = require('express')

const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/login', (req, res) => {
  res.send('TODO')
})

app.post('/login', (req, res) => {
  const username = req.body.username
  const password = req.body.password
})


app.get('/register', (req, res) => {
  res.send('TODO')
})

app.post('/register', (req, res) => {
  const username = req.body.username
  const password = req.body.password
  const validationPassword = req.body.validationPassword
})

app.listen(port, () => {
  console.log(`App listening on port ${port}!`)
})