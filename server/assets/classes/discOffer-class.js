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

    static update(id, disc) {
        return new Promise((next) => {
            if (id) {
                if (disc) {
                    discs.findById(id)
                        .then((result) => {
                            if (!result)
                                next(new Error('Offer not found.'));
                            else
                                discs.update(   {
                                    Status: disc.Status
                                },{
                                    where: {
                                        Id: id,

                                    }
                                })
                                    .then(() => {
                                        discs.findById(id)
                                            .then((result) => next(result))
                                            .catch((err) => next(err.message))
                                    })
                                    .catch((err) => next(err.message))
                        })
                        .catch((err) => next(err.message))
                } else {
                    next(new Error('Offer is undefined.'));
                }
            } else {
                next(new Error('Id is undefined.'));
            }
        });

    }
};
module.exports = DiscOffer;

