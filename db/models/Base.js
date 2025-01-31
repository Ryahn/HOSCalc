const { Model } = require("objection");

class BaseModel extends Model {
  static get modelPaths() {
    return [__dirname];
  }

  $beforeInsert() {
    this.created_at = this.formatDateForMySQL(new Date());
    this.updated_at = this.formatDateForMySQL(new Date());

    if (this.expires_at) {
      this.expires_at = this.formatDateForMySQL(new Date(this.expires_at));
    }
  }

  $beforeUpdate() {
    this.updated_at = this.formatDateForMySQL(new Date());
  }

  $afterFind() {
    // Format expires_at after fetching from database
    if (this.expires_at) {
      this.expires_at = this.formatDateForMySQL(new Date(this.expires_at));
    }
  }

  formatDateForMySQL(date) {
    return date.toISOString().slice(0, 19).replace('T', ' ');
  }
}

module.exports = BaseModel;
