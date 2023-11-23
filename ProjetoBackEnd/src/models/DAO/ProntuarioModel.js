const {DataTypes} = require("sequelize")
const sequelize = require('./connection')
const userModel = require('./usersModel')

const Prontuario = sequelize.define('Pronturario',{

    situacaoPaciente: {
        type: DataTypes.STRING,
        allowNull: true
     },
    dataRegistro: {
        type: DataTypes.DATE,
        allowNull:false
    },
    remedioPrescrito: {
        type: DataTypes.STRING,
        allowNull: true
    },
    sintomas:{
        type: DataTypes.STRING,
        allowNull: true
    }
})

module.exports = Prontuario;