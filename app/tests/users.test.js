import { describe, it } from 'node:test';
import { generate } from '../models/users.js';
import assert from 'assert';
import db from '../database/db.js';

function testUserExistsError() {
  const existingUser = { username: 'existingUser', password: 'password' };
  db.push(existingUser);

  it('should throw an error for existing user', () => {
    try {
      generate(existingUser.username, 'newPassword');
      assert.fail('An error should be thrown for existing user.');
    } catch (error) {
      assert.strictEqual(error.message, 'User already exists');
    }
  });
}

function testAddNewUser() {
  const username = 'newUser';
  const password = 'password';
  
  it('should add a new user to the database', () => {
    generate(username, password);
    const newUser = db.find((user) => user.username === username);
    assert.ok(newUser);
    assert.deepStrictEqual(newUser, { username, password });
  });
}

describe('User Model Tests', () => {
  testUserExistsError();
  testAddNewUser();
});
