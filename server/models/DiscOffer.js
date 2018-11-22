const Sequelize = require('sequelize');
const sequelize = require('../assets/config/database');
const Artist = require('./Artist');
const User = require('./User');
const Genre = require('./Genre');

const DiscOffer = sequelize.define('discoffer', {
        Id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            allowNull: false
        },
        Name: {
            type: Sequelize.STRING
        },
        ReleaseYear: {
            type: Sequelize.DATE
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
        },
        CoinLocked: {
            type: Sequelize.INTEGER
        }
    },
    {
        freezeTableName: true,
        createdAt: false,
        updatedAt: false
    }
);
DiscOffer.belongsTo(Genre, { foreignKey: 'Id_Genre'});
DiscOffer.belongsTo(Artist, {foreignKey: 'Id_Artist'});
DiscOffer.belongsTo(User, {foreignKey: 'vendeur'});
DiscOffer.belongsTo(User, {foreignKey: 'acheteur'});

DiscOffer.sync();

module.exports = DiscOffer;