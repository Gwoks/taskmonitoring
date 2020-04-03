module.exports = (Database, Sequelize, DataTypes) => {
  const Task = Database.define("task", {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    title: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: Sequelize.STRING
    }
  },
    {
      timestamps: true,
      deletedAt: 'destroyTime',
      paranoid: true,
    });

  return Task;
};