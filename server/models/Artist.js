const Sequelize = require('sequelize');
const sequelize = require('../assets/config/database');
const Artist = sequelize.define('artist', {
        Id: {
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allowNull: false
        },
        FirstName: {
            type: Sequelize.STRING
        },
        Lastname: {
            type: Sequelize.STRING
        }
    },
    {
        freezeTableName: true,
        createdAt: false,
        updatedAt: false
    });

Artist.sync();
module.exports = Artist;