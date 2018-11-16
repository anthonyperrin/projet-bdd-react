const Sequelize = require('sequelize');
const sequelize = require('../assets/config/database');
const Artist = require('./Artist');
const User = require('./User');
const Genre = require('./Genre');

const Disc = sequelize.define('disc', {
        Id: {
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allowNull: false
        },
        Name: {
            type: Sequelize.STRING
        },
        Category: {
            type: Sequelize.SMALLINT(6)
        },
        ReleaseYear: {
            type: Sequelize.DATE
        },
        Label: {
            type: Sequelize.STRING
        },
        Price: {
            type: Sequelize.INTEGER
        },
        DateAdd: {
            type: Sequelize.DATE
        },
        nbViews: {
            type: Sequelize.INTEGER
        },
        lastViewed: {
            type: Sequelize.DATE
        }
    },
    {
        freezeTableName: true,
        createdAt: false,
        updatedAt: false
    }
    );
Disc.belongsTo(Genre, { foreignKey: 'Id_Genre'});
Disc.belongsTo(Artist, {foreignKey: 'Id_Artist'});
Disc.belongsTo(User, {foreignKey: 'Id_User'});

Disc.sync();

module.exports = Disc;