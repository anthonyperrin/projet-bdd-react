const Sequelize = require('sequelize');
const sequelize = require('../assets/config/database');
const CoinBlocked = sequelize.define('coinlocked', {
        Id_User : {
            primaryKey: true,
            type: Sequelize.INTEGER,
            allowNull: false
        },

        CoinLocked : {
            type: Sequelize.FLOAT
        },
    },
    {
        freezeTableName: true,
        createdAt: false,
        updatedAt: false
    });


CoinBlocked.sync();

module.exports = CoinBlocked;