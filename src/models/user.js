const { DataTypes, Model } = require('sequelize')
const sequelize = require('../config/db')

class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true   
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false   
        }
    },
    {
        sequelize,
        modelName: 'users'
    }
)

module.exports = User