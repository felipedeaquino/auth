  const express = require('express');
  const router = express.Router();
  const db = require('../database/db.js');

  router.get('/login', (req, res) => {
    res.send('TODO')
  })

  router.post('/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    if (!username || !password) {
      return res.status(400).send('É obrigatório preencher todos os campos')
    }

    if (!db.find(usermame => usermame.username === username && usermame.password === password)) {
      return res.status(401).send('Usuário ou senha inválidos');
    }

    return res.status(204);
  })

  router.get('/users', (req, res) => {
    res.status(200).send(db)
  })

  router.get('/register', (req, res) => {
    res.send('TODO')
  })

  router.post('/register', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const validationPassword = req.body.validationPassword

    if (password !== validationPassword) {
      res.status(403).send('As senhas devem coincidir.')
    }

    db.push({
      username,
      password
    })

    res.status(201).send('Usuário cadastrado com sucesso!')
  })

  module.exports = router;