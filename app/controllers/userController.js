import db from '../database/db.js';
import { generate, getAll } from '../models/users.js';

export function create(req, res) {
  const { username, password, validationPassword } = req.body;

  if (!username || !password) {
    return res.status(400).send('É obrigatório preencher todos os campos');
  }

  if (password !== validationPassword) {
    res.status(403).send('As senhas devem coincidir.')
  }

  try {
    generate(username, password);
  } catch (error) {
    console.log(error);
    return res.status(403).send(error.message)
  }
  
  return res.status(201).send('Usuário cadastrado com sucesso');
}

export function login(req, res) {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).send('É obrigatório preencher todos os campos')
  }

  if (!db.find(user => user.username === username && user.password === password)) {
    return res.status(401).send('Usuário ou senha inválidos');
  }

  return res.status(204).send('');
}

export function list(req, res) {
  const db = getAll();
  res.status(200).send(db)
}