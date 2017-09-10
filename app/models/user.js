const Sequelize = require('sequelize');
//const config = require('../../config/config');
const sequelize = new Sequelize('codechallenger', 'root', 'rocketleague', {dialect: 'mysql'});
const bcrypt = require('bcrypt-nodejs');

//const Challenges = require('./challenges');

var User = sequelize.define('User', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      len: [1, 20]
    }
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    defaultValue: null,
    validate: {
      isEmail: true,
      notEmpty: true,
      len: [1, 255]
    }
  },
  password: {
    type: Sequelize.STRING,
    defaultValue: null
  },
  active: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  token: {
    type: Sequelize.TEXT,
    allowNull: true
  }
}, {
  freezeTableName: true,
  classMethods: {
    generateHash: function(password) {
      return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    },
    validPassword: function(password, hash) {
      console.log('hash in validPw:', hash);
      // return 'pacmanx';
      return bcrypt.compareSync(password, hash);
    }
  }
});

// force: true will drop the table if it already exists
User.sync({force: true}).then(function () {
  User.create({
    username: 'admin',
    email: 'testtest@gmail.com',
    password: 'admin'
  });
  User.create({
    username: 'humaidk2',
    email: 'humaidk2@gmail.com',
    password: 'hk2'
  });
  return 'users created'
});

module.exports = User;