const { DataTypes } = require("sequelize")
const sequelize = require('./connection')
const userModel = require('./usersModel')

const Prontuario = sequelize.define('Pronturario', {

    situacaoPaciente: {
        type: DataTypes.STRING,
        allowNull: true
    },
    dataRegistro: {
        type: DataTypes.DATE,
        allowNull: false,
        primaryKey: true
    },
    remedioPrescrito: {
        type: DataTypes.STRING,
        allowNull: true
    },
    sintomas: {
        type: DataTypes.STRING,
        allowNull: true
    },
    paciente: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

module.exports = {
    save: async function (situacaoPaciente, dataRegistro, remedioPrescrito, sintomas, paciente) {
        try {
            const novoProntuario = await Prontuario.create({
                situacaoPaciente,
                dataRegistro,
                remedioPrescrito,
                sintomas,
                paciente
            });
            console.log('Novo prontuario salvo com sucesso');
            return novoProntuario;
        }
        catch (error) {
            console.log('Não foi possivel salvar o prontuario', error.message);
            throw error;
        }
    },
    list: async function () {
        try {
            const prontuario = await Prontuario.findAll()
            return prontuario;
        } catch (error) {
            console.error("Erro ao buscar prontuario", error);
            throw error;
        }

    },
    update: async function (paciente, dataRegistro) {
        try {
            return await Prontuario.update()
        } catch (error) {
            console.error("Erro ao atualizar prontuario", error);
            throw error;
        }
    },
    delete: async function (paciente, dataRegistro) {
        try {
            const ExcluProntuario = await Prontuario.findOne({
                where: {
                    paciente: paciente,
                    dataRegistro: dataRegistro
                }
            })
            return ExcluProntuario.destroy()
        } catch (error) {
            console.error("Erro ao excluir prontuario", error);
        }
    }
};