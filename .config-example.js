module.exports = {
  port: 3000,
  db: {
    client: 'mysql2',
    connection: {
      host: 'localhost',
      user: 'hoscalc',
      password: '',
      database: 'hoscalc'
    }
  },
  jwt: {
    secret: '',
    expiresIn: '1h'
  },
  bcrypt: {
    saltRounds: 10
  }
};
