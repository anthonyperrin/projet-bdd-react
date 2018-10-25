const Sequelize = require('sequelize');
const sequelize = require('../assets/config/database');
const User = sequelize.define('user', {
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
        },
        Rank: {
            type: Sequelize.INTEGER
        },
        Address1: {
            type: Sequelize.STRING
        },
        Address2: {
            type: Sequelize.STRING
        },
        Pseudo: {
            type: Sequelize.STRING
        },
        Mobile: {
            type: Sequelize.STRING
        },
        Email: {
            type: Sequelize.STRING
        },
        City: {
            type: Sequelize.STRING
        },
        Zipcode: {
            type: Sequelize.STRING(5)
        },
        Password: {
            type: Sequelize.STRING
        },
        Coins: {
            type: Sequelize.INTEGER
        }
    },
    {
        freezeTableName: true,
        createdAt: false,
        updatedAt: false
    });

User.sync();

module.exports = User;