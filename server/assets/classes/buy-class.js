const Buy = require('../../models/Buy');
const User = require('../../models/User');

Buy.belongsTo(User);

let Buy = class {
    static getById(id) {
        return new Promise((next) => {
            Buy.findById(id, {include: [User]})
                .then(result => next(result))
                .catch(err => next(err.message))
        });
    }

    static getAll(max) {
        return new Promise((next) => {
            if (max && max > 0) {
                Buy.findAll({
                    limit: parseInt(max),
                    include: [User]
                })
                    .then(result => next(result))
                    .catch(err => next(err.message))
            }
            else if (max && max < 0) {
                next(new Error('Wrong max value.'));
            }
            else {
                Buy.findAll()
                    .then(result => next(result))
                    .catch(err => next(err.message))
            }
        });
    }

    static add(buy) {
        return new Promise((next) => {
            if (buy) {
                Buy.findOne({
                    where: {
                        Id_User: buy.Id_User,
                        Status: buy.Status,
                        CoinLocked: buy.CoinLocked
                    }
                })
                    .then((result) => {
                        if (!result)
                            Buy.create({
                                Id_User: buy.Id_User,
                                Status: buy.Status,
                                CoinLocked: buy.CoinLocked
                            })
                                .then((result) => next(result))
                                .catch((err) => next(err.message));
                        else
                            next(new Error("Name already used."))
                    })
                    .catch((err) => next(err.message))
            } else {
                next(new Error('Name undefined.'));
            }
        });

    }

    static update(id, name) {
        return new Promise((next) => {
            if (id) {
                if (name) {
                    Buy.findById(id)
                        .then((result) => {
                            if (!result)
                                next(new Error('User not found.'));
                            else
                                Buy.update({
                                    where: {
                                        Id: id,
                                        Name: name
                                    }
                                })
                                    .then(() => {
                                        Buy.findById(id)
                                            .then((result) => next(result))
                                            .catch((err) => next(err.message))
                                    })
                                    .catch((err) => next(err.message))
                        })
                        .catch((err) => next(err.message))
                } else {
                    next(new Error('New name is undefined.'));
                }
            } else {
                next(new Error('Id is undefined.'));
            }
        });

    }

    static delete(id) {
        return new Promise((next) => {
            if (id) {
                Buy.findById(id)
                    .then((result) => {
                        if (!result) next(new Error('No genre found.'));
                        else
                            Buy.destroy({
                                where: {
                                    Id: id
                                }
                            })
                                .then(() => next('Genre successfully deleted.'))
                                .catch((err) => next(err.message))

                    })
                    .catch((err) => next(err.message))
            } else {
                next(new Error('Id is undefined.'));
            }
        });
    }
};
module.exports = Buy;

