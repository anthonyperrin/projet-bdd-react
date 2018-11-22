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
    static add(req) {
        return new Promise((next) => {
            if (req.Id && req.Id_User) {
                buys.findOne({
                    where: {
                        Id: req.Id,
                        Id_User: req.Id_User,
                    }
                })
                    .then((result) => {
                        if (!result)
                            buys.create({
                                Id: req.Id,
                                Id_User: req.Id_User,
                                Status: 0,
                                CoinLocked: req.CoinLocked,
                            })
                                .then((result) => next(result))
                                .catch((err) => next(err.message));
                        else
                            next(new Error("You already make an offer."))
                    })
                    .catch((err) => next(err.message))
            } else {
                next(new Error('Some parameters are undefined.'));
            }
        });
    }

    static update(id, buy) {
        return new Promise((next) => {
            if (id) {
                if (buy) {
                    buys.findById(id)
                        .then((result) => {
                            if (!result)
                                next(new Error('Offer not found.'));
                            else
                                buys.update(   {
                                    Status: 1
                                },{
                                    where: {
                                        Id: id,
                                        Id_User: buy.Id_User,
                                    }
                                })
                                    .then(() => {
                                        buys.findById(id)
                                            .then((result) => next(result))
                                            .catch((err) => next(err.message))
                                    })
                                    .catch((err) => next(err.message))
                        })
                        .catch((err) => next(err.message))
                } else {
                    next(new Error('Your offer is undefined.'));
                }
            } else {
                next(new Error('Id is undefined.'));
            }
        });

    }
};

module.exports = Buy;

