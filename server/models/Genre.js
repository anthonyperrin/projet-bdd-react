const Sequelize = require('sequelize');
const sequelize = require('../assets/config/database');
const Genre = sequelize.define('genre', {
        Id: {
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allowNull: false
        },
        Name: {
            type: Sequelize.STRING
        }
    },
    {
        freezeTableName: true,
        createdAt: false,
        updatedAt: false
    });

Genre.sync();

module.exports = Genre;