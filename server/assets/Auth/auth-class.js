const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const configSecret = require('../config/config');
const users = require('../../models/User');
let Auth = class {
    static login(email, password) {
        return new Promise(next => {
            users.findOne({
                    where: {
                        Email: email
                    }
                })
                    .then(res => {
                        if (!res) next(new Error('No user found.'));
                        const passwordIsValid = bcrypt.compareSync(password, res.Password);
                        if (!passwordIsValid) next(new Error('Wrong email or password.'));
                        const token = jwt.sign({id: res.id}, configSecret.secret, {expiresIn: 7200});
                        next({auth: true, token: token});
                    })
                    .catch(err => next(err.message))
            });
    }

    static logout() {
        return new Promise(next => {
            next({auth: false, token: null})
        })
    }
    static register(req) {
        return new Promise((next) => {
            const hashedPassword = bcrypt.hashSync(req.body.password, 8);
            console.log('registering');
            users.findOne({
                where: {
                    Email: req.body.email
                }
            })
                .then((user) => {
                    if (user) next(new Error("Email already used. Please use another one to register."));
                    users.create({
                        FirstName: req.body.firstName,
                        Lastname: req.body.lastName,
                        Email: req.body.email,
                        Password: hashedPassword,
                        Address1: req.body.address1,
                        Address2: req.body.address2,
                        City: req.body.city,
                        Zipcode: req.body.zipcode,
                        Coins: req.body.coins
                    })
                        .then(user => {
                            const token = jwt.sign({id: user.Id}, configSecret.secret, {expiresIn: 7200});
                            next({auth: true, token: token})
                        })
                        .catch(err => next(err));
                })
                .catch(err => next(err.message()))
        });
    }

    static getCurrent(headers) {
        return new Promise((next) => {

            const token = headers['x-access-token'];
            if (!token) next({
                auth: false,
                message: "Error 401, unauthorized. No token provided."
            });
            jwt.verify(token, configSecret.secret, (err, result) => {
                if (err) next(new Error('Failed to authenticate token.'));
                console.log(result.id);
                users.findById(result.id, {password: false})
                    .then(res => {
                        if (!res) next(new Error('No user found.'));
                        next(res)
                    })
                    .catch(err => next(err.message()))
            })
        });
    }
};
module.exports = Auth;