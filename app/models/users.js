import { SignJWT as jwt } from 'jose';
import { TextEncoder } from 'util';

const secretKey = new TextEncoder().encode(process.env.SECRET_KEY);

/**
 * Class to handle user data.
 * @class
 */
export class UserModel {
  /**
   * UserModel class constructor.
   * @constructor
   * @param {Object} database - Database object injected.
   */
  constructor(database) {
    this.db = database;
  }

  /**
   * User auth method.
   * @async
   * @param {string} username
   * @param {string} password
   * @returns {Promise<string>} A promise that resolves with a JSON Web Token (JWT) if authentication is successful
   */
  async auth({ user }) {
    const token = await new jwt({ username: user.username })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('15min')
    .sign(secretKey);
  return token;
  }

  /**
   * Method to create a new user.
   * @async
   * @param {string} username
   * @param {string} password
   * @returns {Promise<string>} A promise that resolves with a message if the user is created.
   * @throws Throws an error if the user already exists.
   */
  async create({ password, username }) {
    const found = await this.findByUsername({ username });

    if (found) {
      throw new Error('User already exists');
    }

    const newUser = { password, username };
    await this.db.push(newUser);
    return 'User registered successfully!';
  }

  /**
   * Method to find a user by username.
   * @async
   * @param {string} username The username of the user to be found.
   * @returns {Promise<{username: string, password: string}|null>} A promise that resolves with the found user or null if not found.
   */
  async findByUsername({ username }) {
    return await this.db.find((user) => user.username === username);
  }

  /**
   * Method to get all users.
   * @async
   * @returns {Promise<Array<{username: string, password: string }>>} A promise that resolves with an array of all users or an empty array if there are no users.
   */
  async getAll() {
    return await this.db;
  }
}
