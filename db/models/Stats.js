const BaseModel = require('./Base');
const { mysqlSafeTimestamp } = require('../../utils/functions');

class Stats extends BaseModel {
  static get tableName() {
    return 'stats';
  }

  static get relationMappings() {
    return {};
  }

  async $beforeInsert() {
    await super.$beforeInsert();
    this.date = mysqlSafeTimestamp(true);
  }

  static async addStats(hos_type, hours) {
    await this.query().insert({
      hos_type,
      hours,
      date: mysqlSafeTimestamp(true)
    });
  }

  static async getGlobalStats() {
    return await this.query().sum('hours as total');
  }

  static async getMonthlyStats(month, year) {
    return await this.query().whereRaw('MONTH(date) = ? AND YEAR(date) = ?', [month, year]);
  }

  static async getWeeklyStats() {
    return await this.query()
      .whereRaw('YEARWEEK(date, 0) = YEARWEEK(CURDATE(), 0)')
      .sum('hours as total')
      .first();
  }

}

module.exports = Stats;
