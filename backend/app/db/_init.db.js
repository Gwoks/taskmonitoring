const RolesEnum = require('../constants/roles.constants');
const db = require('./_config.db');
const { hash } = require("../util/bcrypt.util");

module.exports = function init() {
    db.roles.create({
        id: 1,
        type: RolesEnum.ADMIN
    });

    db.roles.create({
        id: 2,
        type: RolesEnum.MANAGER
    });

    db.roles.create({
        id: 3,
        type: RolesEnum.USER
    });

    db.users.create({
        full_name: "admin",
        email: "admin",
        username: "admin",
        password: hash("admin"),
        roleId: 1
    })

    db.users.create({
        full_name: "manager",
        email: "manager",
        username: "manager",
        password: hash("manager"),
        roleId: 2
    })

    db.users.create({
        full_name: "user",
        email: "user",
        username: "user",
        password: hash("user"),
        roleId: 3
    })

    db.users.create({
        full_name: "user 3",
        email: "user3",
        username: "user3",
        password: hash("user"),
        roleId: 3
    })

    db.users.create({
        full_name: "user2",
        email: "user2",
        username: "user2",
        password: hash("user"),
        roleId: 3
    })
}
