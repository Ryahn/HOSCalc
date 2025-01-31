const BaseModel = require("./Base");

class Break extends BaseModel {
  static get tableName() {
    return "breaks";
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['deviceId', 'type', 'startTime', 'endTime'],
      properties: {
        id: { type: 'integer' },
        deviceId: { type: 'string' },
        type: { type: 'string', enum: ['34hour', '10hour'] },
        startTime: { type: 'string', format: 'date-time' },
        endTime: { type: 'string', format: 'date-time' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' }
      }
    };
  }
}

module.exports = Break;