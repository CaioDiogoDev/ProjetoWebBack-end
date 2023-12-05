const { DataTypes } = require("sequelize")
const sequelize = require('./connection')
const userModel = require('./usersModel')

const Prontuario = sequelize.define('Pronturario', {

    codigo: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    dataRegistro: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    paciente: {
        type: DataTypes.STRING,
        allowNull: true
    },
    situacaoPaciente: {
        type: DataTypes.STRING,
        allowNull: true
    },
    remedioPrescrito: {
        type: DataTypes.STRING,
        allowNull: true
    },
    sintomas: {
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

            return novoProntuario;
        }
        catch (error) {
            return res.status(500).json({ error: 'Falha ao tentar realizar atualização do cadastro' });
        }
    },
    list: async function () {
        try {
            const prontuario = await Prontuario.findAll()
            return prontuario;
        } catch (error) {
            return res.status(500).json({ error: 'Falha ao listar prontuarios' });
        }

    },
    update: async function (codigo, paciente, situacaoPaciente, remedioPrescrito, sintomas) {
        try {
            return await Prontuario.update({ situacaoPaciente, remedioPrescrito, sintomas }, {
                where: {
                    codigo: codigo,
                    paciente: paciente
                }
            });

        }
        catch (error) {
            return res.status(500).json({ error: 'Falha ao atualizar prontuario' });
        }

    },
    delete: async function (codigo, paciente, dataRegistro) {
        try {
            const ExcluProntuario = await Prontuario.findOne({
                where: {
                    codigo: codigo,
                    paciente: paciente,
                    dataRegistro: dataRegistro
                }
            });

            return await ExcluProntuario.destroy();
        }
        catch (error) {
            return res.status(500).json({ error: 'Falha ao deletar prontuario' });
        }
    }
}