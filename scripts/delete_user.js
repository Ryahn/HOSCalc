const User = require('../src/db/models/User');
const { Model } = require('objection');
const Knex = require('knex');
const knexConfig = require('../src/config/database');
const knex = Knex(knexConfig.development);
Model.knex(knex);

const email = process.argv[2];
const id = process.argv[3];

if (!email && !id) {
    console.error('Usage: node delete_user.js <email> || <id>');
    process.exit(1);
}

async function main() {
    let user;
    if (id) {
        user = await User.query().where('id', id).delete();
    } else {
        user = await User.query().where('email', email).delete();
    }
    console.log(`User deleted`);
    process.exit(0);
}

main();