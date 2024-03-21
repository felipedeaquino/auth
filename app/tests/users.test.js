import assert from 'assert';
import { describe, it } from 'node:test';

import { UserModel } from '../models/users.js';

const dbMock = [];

const Users = new UserModel(dbMock);

async function testUserExistsError() {
  const existingUser = { password: 'password', username: 'existingUser' };
  dbMock.push(existingUser);

  it('should throw an error for existing user', async () => {
    try {
      await Users.create({ password: 'newPassword', username: existingUser.username });
      assert.fail('An error should be thrown for existing user.');
    } catch (error) {
      assert.strictEqual(error.message, 'User already exists');
    }
  });
}

async function testAddNewUser() {
  const username = 'newUser';
  const password = 'password';

  it('should add a new user to the database', async () => {
    await Users.create({ password, username });
    const newUser = dbMock.find((user) => user.username === username);
    assert.ok(newUser);
    assert.deepStrictEqual(newUser, { password, username });
  });
}

describe('User Model Tests', () => {
  testUserExistsError();
  testAddNewUser();
});
