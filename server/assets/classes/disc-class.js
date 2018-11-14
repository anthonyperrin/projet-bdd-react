const discs = require('../../models/Disc');
const artists = require('../../models/Artist');
const users = require('../../models/User');
let Disc = class {
    static getById(id) {
        return new Promise((next) => {
            discs.findById(id)
                .then(result => next(result))
                .catch(err => next(err.message))
        });
    }

    static getAll(max) {
        return new Promise((next) => {
            if (max && max > 0) {
                discs.findAll({
                    limit: parseInt(max)
                })
                    .then(result => next(result))
                    .catch(err => next(err.message))
            }
            else if (max && max < 0) {
                next(new Error('Wrong max value.'));
            }
            else {
                discs.findAll({
                    include: [artists, users]
                })
                    .then(result => next(result))
                    .catch(err => next(err.message))
            }
        });
    }

};
module.exports = Disc;

