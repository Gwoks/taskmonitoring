module.exports = (Database, Sequelize, DataTypes) => {
    const Role = Database.define("role", {
        type: {
            type: Sequelize.STRING,
            validate: {
                isAlphanumeric: true,
                notEmpty: true
            }
        }
    },
        {
            timestamps: true,
            deletedAt: 'destroyTime',
            paranoid: true,
        });

    return Role;
};