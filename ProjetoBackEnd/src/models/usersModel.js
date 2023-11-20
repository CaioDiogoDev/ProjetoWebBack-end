const {DataTypes, Op} = require("sequelize")
const sequelize = require("../helpers/bd")

const AdminModel = sequelize.define('Usuarios',
    {
        nome: DataTypes.STRING,
        codigo:{
            type: DataTypes.INTEGER,
            autoIncremeent: true,
            primaryKey: true
        },
        endereco:{
            type: DataTypes.STRING,
            allowNull: true

        },
        telefone: {
            type: DataTypes.STRING,
            allowNull: true
        },
        password:{
            type: DataTypes.STRING,
            allowNull: true
        }
    }
)