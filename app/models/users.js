export class UserModel {
  constructor(database) {
    this.db = database;
  }

  async auth(username, password) {
    const user = await this.db.findByUsername(username);
    if (!user || user.password !== password) {
      throw new Error('User not found');
    }
  }

  async create({ password, username }) {
    const found = await this.findByUsername(username);

    if (found) {
      throw new Error('User already exists');
    }

    const newUser = { password, username };
    await this.db.push(newUser);
    return newUser;
  }

  async findByUsername(username) {
    return await this.db.find((user) => user.username === username);
  }

  async getAll() {
    return await this.db;
  }
}
