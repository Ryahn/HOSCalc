const User = require('../db/models/User');
const { Model } = require('objection');
const config = require('../.config.js');
const Knex = require('knex');
const knex = Knex(config.db);
Model.knex(knex);
const crypto = require('crypto');

const email = process.argv[2];
let password = process.argv[3];

if (!email && !password) {
    console.error('Usage: node make_user.js <email> [password]');
    process.exit(1);
}

async function main() {
    if (!password) {
        password = crypto.randomBytes(16).toString('hex');
    }

    const user = await User.query().insert({
        email: email,
        password: password,
    });
    console.log(`User created: ${user.email}`);
    console.log(`Password: ${password}`);
    process.exit(0);
}

main();
