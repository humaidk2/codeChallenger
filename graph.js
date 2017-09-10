const { buildSchema } = require('graphql');
const mysql = require('mysql');
mysql.createConnection({
  user: 'root',
  password: 'rocketleague',
  database: 'codechallenger'
});
const Sequelize = require('sequelize');
const sequelize = new Sequelize('codechallenger', 'root', 'rocketleague',{  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

sequelize
.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});

const schema = buildSchema(`
  type User {
    username: String
    id: Int
    email: String
    password: String
  }
  type Challenge {
    code: String
    user_id: Int
  }
  type Query {
    user(username: String): User
    hello: String
    code: String
    challenge: Challenge
  }
  schema {
    query: Query
  }
`);

const User = require('./app/models/user.js');
const Challenge = require('./app/models/challenge.js');

// The root provides the top-level API endpoints
var root = {
  user: (args, username) => {
    return User.find({
              where: args
            }).then((ans)=>{return ans});
  },
  challenge: (args) => {
    return Challenge.find({
              where: args
            }).then((ans)=>{return ans});
  },
  hello: (args) => {
    return 'Hello World!';
  },
  code: (args) => {
    return 'Code!';
  },
}
module.exports = {root: root, schema: schema };
