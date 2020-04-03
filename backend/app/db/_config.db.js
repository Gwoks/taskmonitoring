const { Sequelize, DataTypes } = require("sequelize");
const RolesEnum = require('../constants/roles.constants');

const Database = new Sequelize(
  process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALEC,
  operatorsAliases: false
});

const db = {};

db.Sequelize = Sequelize;
db.Database = Database;

//databases
db.tasks = require("../models/task.model.js")(Database, Sequelize, DataTypes);
db.users = require("../models/user.model.js")(Database, Sequelize, DataTypes);
db.roles = require("../models/role.model.js")(Database, Sequelize, DataTypes);

//relations
db.users.hasMany(db.tasks);
db.tasks.belongsTo(db.users);
db.roles.hasOne(db.users);

db.ROLES = [RolesEnum.ADMIN, RolesEnum.MANAGER, RolesEnum.USER];
module.exports = db;
