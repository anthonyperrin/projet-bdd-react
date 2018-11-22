const users = require('../../models/User');

let User = class {
    static getById(id) {
        return new Promise((next) => {
            users.findById(id)
                .then(result => next(result))
                .catch(err => next(err.message))
        });
    }

    static getAll(max) {
        return new Promise((next) => {
            if (max && max > 0) {
                users.findAll({
                    limit: parseInt(max)
                })
                    .then(result => next(result))
                    .catch(err => next(err.message))
            }
            else if (max && max < 0) {
                next(new Error('Wrong max value.'));
            }
            else {
                users.findAll()
                    .then(result => next(result))
                    .catch(err => next(err.message))
            }
        });
    }

    static update(id, user) {
        return new Promise((next) => {
            if (id) {
                if (user) {
                    users.findById(id)
                        .then((result) => {
                            if (!result)
                                next(new Error('User not found.'));
                            else
                                users.update(   {
                                    FirstName: user.FirstName,
                                    Lastname: user.LastName,
                                    Rank: user.Rank,
                                    Address1: user.Address1,
                                    Address2: user.Address2,
                                    Pseudo: user.Pseudo,
                                    Mobile: user.Mobile,
                                    Email: user.Email,
                                    City: user.City,
                                    Zipcode: user.Zipcode,
                                    Password: user.Password,
                                    Coins: user.Coins
                                },{
                                    where: {
                                        Id: id,
                                    }
                                })
                                    .then(() => {
                                        users.findById(id)
                                            .then((result) => next(result))
                                            .catch((err) => next(err.message))
                                    })
                                    .catch((err) => next(err.message))
                        })
                        .catch((err) => next(err.message))
                } else {
                    next(new Error('This user is undefined.'));
                }
            } else {
                next(new Error('Id is undefined.'));
            }
        });
    }
    static delete(id){
        return new Promise((next) => {
            if (id) {
                users.findById(id)
                    .then((result) => {
                        if (!result) next(new Error('No user found.'));
                        else
                            users.destroy({
                                where: {
                                    Id: id
                                }
                            })
                                .then(() => next('User successfully deleted.'))
                                .catch((err) => next(err.message))

                    })
                    .catch((err) => next(err.message))
            } else {
                next(new Error('Id is undefined.'));
            }
        });
    }
};

module.exports = User;