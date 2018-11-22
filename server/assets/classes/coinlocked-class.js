const Coined = require('../../models/CoinBloked');
let CoinBlocked = class {
    static getById(id) {
        return new Promise((next) => {
            Coined.findById(id)
                .then(result => next(result))
                .then(json=>console.log(json))
                .catch(err => next(err.message))
        });
    }
};

module.exports = CoinBlocked;