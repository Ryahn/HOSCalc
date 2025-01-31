const bcrypt = require('bcrypt');
const User = require('../src/db/models/User');
const { Model } = require('objection');
const Knex = require('knex');
const knexConfig = require('../src/config/database');
const knex = Knex(knexConfig.development);
Model.knex(knex);

const password = process.argv[2];
const email = process.argv[3];

if (!password && !email) {
    console.error('Usage: node generate_password.js <password> [email]');
    process.exit(1);
}

async function main() {
    let user;
    if (email) {
        user = await User.query().where('email', email).first();
        if (!user) {
            console.error('User not found');
            process.exit(1);
        }

        user.password = bcrypt.hashSync(password, 10);  
        await user.$query().patch();
        console.log(`Password updated for user ${user.email}`);
        process.exit(0);
    } else {
        console.log(bcrypt.hashSync(password, 10));
        process.exit(0);
    }
}

main();