const Sequelize = require('sequelize');

const sequelize = new Sequelize('disc', 'antoine', 'password', {
    host: '192.168.0.25',
    dialect: 'mysql',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});
module.exports = sequelize;
