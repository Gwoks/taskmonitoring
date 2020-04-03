module.exports = (Database, Sequelize, DataTypes) => {
    const User = Database.define("user", {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        full_name: {
            type: Sequelize.STRING,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: Sequelize.STRING,
            validate: {
                notEmpty: true
            }
        },
        username: {
            type: Sequelize.STRING,
            validate: {
                notEmpty: true
            }
        },
        password: {
            type: Sequelize.STRING
        }
    },
        {
            timestamps: true,
            deletedAt: 'destroyTime',
            paranoid: true,
        });

    return User;
};