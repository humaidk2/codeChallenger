const Sequelize = require('sequelize');
//const config = require('../../config/config');
const sequelize = new Sequelize('codechallenger', 'root', 'rocketleague', {dialect: 'mysql'});


var Challenge = sequelize.define('Challenge', {
  code: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  user_id: {
    type: Sequelize.STRING,
    allowNull: true
  }
}, {
  freezeTableName: true
});

Challenge.sync({force: true}).then(function () {
  Challenge.create({
    code: '//check if palindrome',
    user_id: '2',
  });
  return 'default challenge created';
});

module.exports = Challenge;