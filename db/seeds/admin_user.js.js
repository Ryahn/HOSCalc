const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../.config.js');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('users').del();
  
  const hashedPassword = await bcrypt.hash('admin', 10);
  const [userId] = await knex('users').insert([
    {
      password: hashedPassword,
      email: 'admin@admin.com',
      is_admin: true,
      api_key: crypto.randomBytes(16).toString('hex')
    }
  ]);

  const user = await knex('users').where('id', userId).first();
  
  const token = jwt.sign(
    { id: user.id, email: user.email },
    config.jwt.secret,
    { expiresIn: '20y' }
  );

  await knex('users').where('id', user.id).update({ api_key: token });
};