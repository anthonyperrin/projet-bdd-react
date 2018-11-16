const buys = require('../../models/Buy');
const users = require('../../models/User');
const discs = require('../../models/Disc');

let Buy = class {
    static getById(id) {
        return new Promise((next) => {
            buys.findById(id, {
                include: [users, discs]
            })
                .then(result => next(result))
                .catch(err => next(err.message))
        });
    }

    static getAll(max) {
        return new Promise((next) => {
            if (max && max > 0) {
                buys.findAll({
                    limit: parseInt(max),
                    include: [users, discs]
                })
                    .then(result => next(result))
                    .catch(err => next(err.message))
            }
            else if (max && max < 0) {
                next(new Error('Wrong max value.'));
            }
            else {
                buys.findAll({
                    include: [users, discs]
                })
                    .then(result => next(result))
                    .catch(err => next(err.message))
            }
        });
    }
};
module.exports = Buy;

