const db = require("../db/_config.db");
const RolesEnum = require("../constants/roles.constants");
const User = db.users;
const Role = db.roles;
var jwt = require("jsonwebtoken");
const { hash, compare } = require("../util/bcrypt.util");

exports.signup = (req, res) => {
  var user_model = {
    full_name: req.body.full_name,
    username: req.body.username,
    email: req.body.email,
    password: hash(req.body.password)
  }

  var roles_signup = req.body.roles ? { type: req.body.roles } : { type: RolesEnum.USER }
  Role.findOne({ where: roles_signup }).then(roles => {
    user_model.roleId = roles.id
    User.create(user_model)
      .then(user => {
        res.send({ message: "User registered successfully!" });
      })
  })
    .catch(err => {
      res.status(500).send({ message: "Error! " + err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = compare(req.body.password, user.password);

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
        expiresIn: 86400
      });

      var authorities = '';
      Role.findOne({ where: { id: user.roleId } }).then(roles => {
        authorities = "ROLE_" + roles.type.toUpperCase();
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token
        });
      })
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
