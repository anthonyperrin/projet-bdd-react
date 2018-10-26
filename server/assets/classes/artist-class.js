const artists = require('../../models/Artist');

let Artist = class {
    static getById(id) {
        return new Promise((next) => {
            artists.findById(id)
                .then(result => next(result))
                .catch(err => next(err.message))
        });
    }

    static getAll(max) {
        return new Promise((next) => {
            if (max && max > 0) {
                artists.findAll({
                    limit: parseInt(max)
                })
                    .then(result => next(result))
                    .catch(err => next(err.message))
            }
            else if (max && max < 0) {
                next(new Error('Wrong max value.'));
            }
            else {
                artists.findAll()
                    .then(result => next(result))
                    .catch(err => next(err.message))
            }
        });
    }

    static add(artist) {
        return new Promise((next) => {
            if (artist) {
                artists.findOne({
                    where: {
                        FirstName: artist.FirstName,
                        LastName: artist.LastName
                    }
                })
                    .then((result) => {
                        if (!result)
                            artists.create({
                                FirstName: artist.FirstName,
                                LastName: artist.LastName
                            })
                                .then((result) => next(result))
                                .catch((err) => next(err.message));
                        else
                            next(new Error("Artist already created."))
                    })
                    .catch((err) => next(err.message))
            } else {
                next(new Error('Artist undefined.'));
            }
        });

    }

    static update(id, artist) {
        return new Promise((next) => {
            if (id) {
                if (artist) {
                    artists.findById(id)
                        .then((result) => {
                            if (!result)
                                next(new Error('Artist not found.'));
                            else
                                artists.update({
                                    where: {
                                        Id: id,
                                        FirstName: artist.FirstName,
                                        LastName: artist.LastName
                                    }
                                })
                                    .then(() => {
                                        artists.findById(id)
                                            .then((result) => next(result))
                                            .catch((err) => next(err.message))
                                    })
                                    .catch((err) => next(err.message))
                        })
                        .catch((err) => next(err.message))
                } else {
                    next(new Error('New artist is undefined.'));
                }
            } else {
                next(new Error('Id is undefined.'));
            }
        });

    }

    static delete(id) {
        return new Promise((next) => {
            if (id) {
                artists.findById(id)
                    .then((result) => {
                        if (!result) next(new Error('No artist found.'));
                        else
                            artists.destroy({
                                where: {
                                    Id: id
                                }
                            })
                                .then(() => next('Artist successfully deleted.'))
                                .catch((err) => next(err.message))

                    })
                    .catch((err) => next(err.message))
            } else {
                next(new Error('Id is undefined.'));
            }
        });
    }
};
module.exports = Artist;

