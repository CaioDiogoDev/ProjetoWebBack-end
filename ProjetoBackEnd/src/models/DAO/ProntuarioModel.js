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

module.exports = {
    save: async function(situacaoPaciente,  dataRegistro, remedioPrescrito, sintomas){
        try{
            const novoProntuario = await Prontuario.create({
                situacaoPaciente,
                dataRegistro,
                remedioPrescrito,
                sintomas
            });
            console.log('Novo prontuario salvo com sucesso');
            return novoProntuario;
        }
        catch{
            console.log('Não foi possivel salvar o prontuario', error.message);
            throw error;
        }
    },
    list: async function() {
        const prontuario = await Prontuario.findAll()
        return prontuario;
    },
    update : async function(nome, codigo){
        return await Prontuario.update()
    }
};