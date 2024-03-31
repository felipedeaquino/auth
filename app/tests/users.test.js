import assert from 'assert';
import { SignJWT as jwt } from 'jose';
import { describe, it } from 'node:test';
import { TextEncoder } from 'util';

import { UserModel } from '../models/users.js';

const dbMock = [];
const secretKey = new TextEncoder().encode(process.env.SECRET_KEY);
const Users = new UserModel(dbMock);

async function testAddNewUser() {
  const password = 'password';
  const username = 'newUser';

  it('should add a new user to the database', async () => {
    await Users.create({ password, username });
    const newUser = dbMock.find((user) => user.username === username);
    assert.ok(newUser);
    assert.deepStrictEqual(newUser, { password, username });
  });
}

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

async function testUserLogin() {
  const password = 'password';
  const username = 'newUser';

  it('should successfully login a user and return a JWT bearer token', async () => {
    const payload = await Users.login({ password, username });

    assert.strictEqual(payload.status, 200);
    assert.ok(payload.send);

    const token = await new jwt({ username })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('15min')
      .sign(secretKey);
    
    assert.deepStrictEqual(payload, { send: token, status: 200 });
  })
}

describe('User Model Tests', () => {
  testAddNewUser();
  testUserExistsError();
  testUserLogin();
});
