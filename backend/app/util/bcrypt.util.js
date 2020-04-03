var bcrypt = require("bcryptjs");

module.exports = {
    hash(p) {
        return bcrypt.hashSync(p, 8);
    },

    compare(p, h) {
        return bcrypt.compareSync(p, h);
    }
}