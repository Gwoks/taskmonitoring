const jwt = require("jsonwebtoken");
const db = require("../db/_config.db");
const User = db.users;
const Role = db.roles;
const RolesEnum = require('../constants/roles.constants');

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    Role.findOne({ where: { id: user.roleId } }).then(roles => {
      if (roles.type === RolesEnum.ADMIN) {
        next();
        return;
      } else {
        res.status(403).send({
          message: "Require Admin Role!"
        });
        return;
      }
    });
  });
};

isManager = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    Role.findOne({ where: { id: user.roleId } }).then(roles => {
      if (roles.type === RolesEnum.MANAGER) {
        next();
        return;
      } else {
        res.status(403).send({
          message: "Require Manager Role!"
        });
        return;
      }
    });
  });
};

isUser = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    Role.findOne({ where: { id: user.roleId } }).then(roles => {
      if (roles.type === RolesEnum.USER) {
        next();
        return;
      } else {
        res.status(403).send({
          message: "Require User Role!"
        });
        return;
      }
    });
  });
};

isUserOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    Role.findOne({ where: { id: user.roleId } }).then(roles => {
      if (roles.type === RolesEnum.USER || roles.type === RolesEnum.ADMIN) {
        next();
        return;
      } else {
        res.status(403).send({
          message: "Require User Or Admin Role!"
        });
        return;
      }
    });
  });
};

isManagerOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    Role.findOne({ where: { id: user.roleId } }).then(roles => {
      if (roles.type === RolesEnum.MANAGER || roles.type === RolesEnum.ADMIN) {
        next();
        return;
      } else {
        res.status(403).send({
          message: "Require Manager Or Admin Role!"
        });
        return;
      }
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isManager: isManager,
  isUser: isUser,
  isUserOrAdmin: isUserOrAdmin,
  isManagerOrAdmin: isManagerOrAdmin
};

module.exports = authJwt;
