const Sequelize = require('sequelize');
const sequelize = require('../assets/config/database');

const Buy = sequelize.define('buy', {
        Id: {
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allowNull: false
        },
        Id_User: {
            type: Sequelize.INTEGER
        },
        Status: {
            type: Sequelize.SMALLINT(6)
        },
        CoinLocked: {
            type: Sequelize.INTEGER
        }
    },
    {
        freezeTableName: true,
        createdAt: false,
        updatedAt: false
    });

Buy.sync();

module.exports = Buy;