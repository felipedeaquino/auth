import db from '../database/db.js';

export function generate(username, password) {
  const found = db.find((user) => user.username === username);

  if (found) {
    throw new Error('User already exists');
  }

  db.push({ username, password });
};

export function getAll() {
  return db;
}