const genres = require('../../models/Genre');

let Genre = class {
    static getById(id) {
        return new Promise((next) => {
            genres.findById(id)
                .then(result => next(result))
                .catch(err => next(err.message))
        });
    }

    static getAll(max) {
        return new Promise((next) => {
            if (max && max > 0) {
                genres.findAll({
                    limit: parseInt(max)
                })
                    .then(result => next(result))
                    .catch(err => next(err.message))
            }
            else if (max && max < 0) {
                next(new Error('Wrong max value.'));
            }
            else {
                genres.findAll()
                    .then(result => next(result))
                    .catch(err => next(err.message))
            }
        });
    }

    static add(name) {
        return new Promise((next) => {
            if (name) {
                genres.findOne({
                    where: {
                        Name: name
                    }
                })
                    .then((result) => {
                        if (!result)
                            genres.create({
                                Name: name
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
                    genres.findById(id)
                        .then((result) => {
                            if (!result)
                                next(new Error('User not found.'));
                            else
                                genres.update({
                                    where: {
                                        Id: id,
                                        Name: name
                                    }
                                })
                                    .then(() => {
                                        genres.findById(id)
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
                genres.findById(id)
                    .then((result) => {
                        if (!result) next(new Error('No genre found.'));
                        else
                            genres.destroy({
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
module.exports = Genre;

