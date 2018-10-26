let db, config;
module.exports = (_db, _config) => {
    db = _db;
    config = _config;
    return Members;
};
let Members = class {
    static getById(id) {
        return new Promise((next) => {
            db.query('SELECT * FROM members WHERE id = ?', [id])
                .then((result) => {
                    if (result[0] !== undefined) next(result[0]);
                    else next(new Error('User not found.'));
                })
                .catch((err) => next(err.message));
            });
    }

    static getAll(max) {
        return new Promise((next) => {
            if (max && max > 0) {
                db.query('SELECT * FROM members LIMIT ?', [parseInt(max)])
                    .then((result) => next(result))
                    .catch((err) => next(err.message))
            }
            else if (max && max < 0) {
                next(new Error('Wrong max value.'));
            }
            else {
                db.query('SELECT * FROM members')
                    .then((result) => next(result))
                    .catch((err) => next(err.message))
            }
        });
    }

    static add(name) {
        return new Promise((next) => {
            if (name) {
                db.query('SELECT * FROM members WHERE name = ?', [name])
                    .then((result) => {
                        if (result[0]) next(new Error('Name already taken.'));
                        else
                            db.query('INSERT INTO members (`name`) VALUES (?)', [name])
                                .then((result) =>
                                    db.query('SELECT * from members WHERE id = ?', [result.insertId])
                                        .then((result) => next(result))
                                        .catch((err) => next(err.message)))
                                .catch((err) => next(err))
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
                    db.query('SELECT * FROM members WHERE id = ?', [id])
                        .then((result) => {
                            if (!result[0])
                                next(new Error('User not found.'));
                            else
                                db.query('UPDATE members SET name = ? WHERE id = ?', [name, id])
                                    .then(() => {
                                        db.query('SELECT * FROM members WHERE id = ?', [id])
                                            .then((result) => next({
                                                id: result[0].id,
                                                name: result[0].name
                                            }))
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
                db.query('SELECT * FROM members WHERE id = ?', [id])
                    .then((result) => {
                        if (!result[0]) next(new Error('No user found.'));
                        else
                            db.query('DELETE FROM members WHERE id = ?', [id])
                                .then(() => next('Member successfully deleted.'))
                                .catch((err) => next(err.message))

                    })
                    .catch((err) => next(err.message))
            } else {
                next(new Error('Id is undefined.'));
            }
        });
    }
};

