import db from '../database/db.js';
import { UserModel } from '../models/users.js';

const Users = new UserModel(db);

export async function create(req, res) {
  const { password, username, validationPassword } = req.body;

  if (!username || !password) {
    return res.status(400).send('All fields must be filled out.');
  }

  if (password !== validationPassword) {
    res.status(403).send('The passwords do not match.');
  }

  try {
    await Users.create(username, password);
  } catch (error) {
    return res.status(403).send(error.message);
  }

  return res.status(201).send('User successfully registered.');
}

export async function login(req, res) {
  const { password, username } = req.body;

  if (!username || !password) {
    return res.status(400).send('All fields must be filled out.');
  }

  const user = await Users.findByUsername(username);
  if (!user || user.password !== password) {
    return res.status(401).send('Incorrect username or password.');
  }

  return res.status(204).send('');
}

export function list(req, res) {
  const db = this.getAll();
  res.status(200).send(db);
}
