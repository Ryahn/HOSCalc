const jwt = require("jsonwebtoken");
const config = require("../.config.js");
const User = require("../db/models/User");
const { Model } = require("objection");
const Knex = require("knex");
const knex = Knex(config.db);
Model.knex(knex);

const email = process.argv[2];
const expire = process.argv[3];

if (!email || !expire) {
  console.error("Usage: node generate_token.js <email> [expire]h,d,m,y");
  process.exit(1);
}

async function main() {
  const user = await User.query().where("email", email).first();
  if (!user) {
    console.error("User not found");
    process.exit(1);
  }
  const generateToken = () => {
    return jwt.sign(
      { id: user.id, email: user.email },
      config.jwt.secret,
      { expiresIn: expire }
    );
  };

  token = generateToken();
  await User.query().where("id", user.id).update({ api_key: token });
  console.log("Token generated and updated for user", user.email);
  console.log("Token:", token);
  process.exit(0);
}

main();
