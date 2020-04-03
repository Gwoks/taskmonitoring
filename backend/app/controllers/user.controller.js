const db = require("../db/_config.db");
const RolesEnum = require("../constants/roles.constants");
const User = db.users;
const Role = db.roles;

exports.findAll = (req, res) => {
  Role.findOne({ where: { type: RolesEnum.USER } }).then(role => {
    User.findAll({ where: { roleId: role.id }, attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'destroyTime'] } })
      .then(users => { res.send(users); })
      .catch(err => {
        res.status(500).send({
          message:
            err.message
        });
      });
  })
    .catch(err => {
      res.status(500).send({
        message:
          err.message
      });
    });
};