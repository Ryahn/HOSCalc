const BaseModel = require('./Base');
const bcrypt = require('bcrypt');
const config = require('../../.config.js');

class User extends BaseModel {
  static get tableName() {
    return 'users';
  }

  static get relationMappings() {
    return {};
  }

  async $beforeInsert() {
    await super.$beforeInsert();
    this.password = await bcrypt.hash(this.password, config.bcrypt.saltRounds);
  }

  async verifyPassword(password) {
    return bcrypt.compare(password, this.password);
  }
}

module.exports = User;