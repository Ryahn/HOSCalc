const User = require('../src/db/models/User');
const { Model } = require('objection');
const Knex = require('knex');
const knexConfig = require('../src/config/database');
const knex = Knex(knexConfig.development);
Model.knex(knex);
const crypto = require('crypto');
const bcrypt = require('bcrypt');

const email = process.argv[2];
let password = process.argv[3];

if (!email && !password) {
    console.error('Usage: node update_admin_password.js <email> [password]');
    process.exit(1);
}

async function main() {
    const user = await User.query().where('email', email).first();
    if (!user) {
        console.error('User not found');
        process.exit(1);
    }

    if (!user.is_admin) {
        console.error('User is not an admin');
        process.exit(1);
    }

    if (!password) {
        password = crypto.randomBytes(16).toString('hex');
    }

    user.password = await bcrypt.hash(password, 10);

    await user.$query().patch();
    console.log(`User password updated: ${user.email}`);
    console.log(`New password: ${password}`);
    process.exit(0);
}

main();