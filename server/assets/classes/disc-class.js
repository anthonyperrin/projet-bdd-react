const discs = require('../../models/Disc');
const artists = require('../../models/Artist');
const users = require('../../models/User');
const genres = require('../../models/Genre');
let Disc = class {
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
    static add(req) {
        return new Promise((next) => {
            if (req.Name && req.Id_Genre && req.Id_User) {
                discs.findOne({
                    where: {
                        Name: req.Name,
                        Id_Genre: req.Id_Genre,
                        Id_User: req.Id_User,
                    }
                })
                    .then((result) => {
                        if (!result)
                            discs.create({
                                Name: req.Name,
                                Id_User: req.Id_User,
                                ReleaseYear: req.ReleaseYear,
                                Price: req.Price,
                                nbViews: 0,
                                Id_Artist: req.Id_Artist,
                                DateAdd: req.DateAdd,
                                Id_Genre: req.Id_Genre
                            })
                                .then((result) => next(result))
                                .catch((err) => next(err.message));
                        else
                            next(new Error("Disc already in sale."))
                    })
                    .catch((err) => next(err.message))
            } else {
                next(new Error('Some parameters are undefined.'));
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
                                next(new Error('Disc not found.'));
                            else
                                discs.update(   {
                                    Name: disc.Name,
                                    Price: disc.Price
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
                discs.findById(id)
                    .then((result) => {
                        if (!result) next(new Error('No disc found.'));
                        else
                            discs.destroy({
                                where: {
                                    Id: id
                                }
                            })
                                .then(() => next('Disc successfully deleted.'))
                                .catch((err) => next(err.message))

                    })
                    .catch((err) => next(err.message))
            } else {
                next(new Error('Id is undefined.'));
            }
        });
    }
};
module.exports = Disc;

