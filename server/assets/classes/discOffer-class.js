const discs = require('../../models/DiscOffer');
const artists = require('../../models/Artist');
const users = require('../../models/User');
const genres = require('../../models/Genre');
let DiscOffer = class {
    static getById(id) {
        return new Promise((next) => {
            discs.findById(id, {
                include: [artists, users, genres]
            })
                .then(result => next(result))
                .catch(err => next(err.message))
        });
    }
    static getAll(max) {
        return new Promise((next) => {
            if (max && max > 0) {
                discs.findAll({
                    limit: parseInt(max),
                    include: [artists, genres, users]
                })
                    .then(result => next(result))
                    .catch(err => next(err.message))
            }
            else if (max && max < 0) {
                next(new Error('Wrong max value.'));
            }
            else {
                discs.findAll({
                    include: [artists, users, genres]
                })
                    .then(result => next(result))
                    .catch(err => next(err.message))
            }
        });
    }
};
module.exports = DiscOffer;

