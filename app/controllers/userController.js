import db from '../database/db.js';
import { UserModel } from '../models/users.js';

const Users = new UserModel(db);

/**
 * Controller function to create a new user.
 * @param {import('express').Request} req - O objeto de solicitação Express.
 * @param {import('express').Response} res - O objeto de resposta Express.
 * @returns {Promise<string>} A promise that resolves with a message if the user is created.
 * @throws throws an error if validation fails, the user already exists, passwords do not match or the request is missing required fields.
 */
export async function create(req, res) {
  const { password, username, validationPassword } = req.body;

  if (!username || !password) {
    return res.status(400).send('All fields must be filled out.');
  }

  if (password !== validationPassword) {
    res.status(403).send('The passwords do not match.');
  }

  try {
    await Users.create({ password, username });
  } catch (error) {
    return res.status(403).send(error.message);
  }

  return res.status(201).send('User successfully registered.');
}

/**
 * Controller function to get a list of all users.
 * @param {import('express').Request} req - O objeto de solicitação Express.
 * @param {import('express').Response} res - O objeto de resposta Express.
 * @returns {Promise<Array<{username: string, password: string }>>} A promise that resolves with an array of all users or an empty array if there are no users.
 */
export async function list(req, res) {
  const users = await Users.getAll();
  res.status(200).send(users);
}

/**
 * Controller function to authenticate a user.
 * @param {import('express').Request} req - O objeto de solicitação Express.
 * @param {import('express').Response} res - O objeto de resposta Express.
 * @returns {Promise<string>} A promise that resolves with a JSON Web Token (JWT) if authentication is successful.
 * @throws an error if authentication fails.
 */
export async function login(req, res) {
  const { password, username } = req.body;

  const user = await Users.findByUsername({ username });
  if (!user || user.password !== password) {
    return res.status(401).send('Unauthorized.');
  }

  const token = await Users.auth({ user });
  return res.status(200).send(token);
}
