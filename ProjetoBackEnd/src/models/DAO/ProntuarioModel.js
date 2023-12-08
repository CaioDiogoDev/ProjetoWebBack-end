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
            console.error('Prontuario model - Falha ao salvar prontuario:', error);
            throw error;
        }
    },
    list: async function (pagina , limite) {
        try {
          
          const { rows: prontuarios } = await Prontuario.findAndCountAll({
            offset: (pagina - 1) * limite,
            limit: limite,
          });
      
          return { prontuarios};
        } catch (error) {
          console.error('Prontuario model - Falha ao listar prontuarios:', error);
          throw error;
        }
      },


    update: async function (codigo, paciente, situacaoPaciente, remedioPrescrito, sintomas) {
        try {
            const result = await Prontuario.update(
                { situacaoPaciente: situacaoPaciente, remedioPrescrito: remedioPrescrito, sintomas: sintomas },
                {
                    where: {
                        codigo: codigo,
                        paciente: paciente
                    },
                    returning: true
                }
            );
            return result;
        } catch (error) {

            console.error('Prontuario model - Falha ao atualizar prontuario:', error);
            throw error;
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
            console.error('Prontuario model - Falha ao deletar prontuario:', error);
            throw error;
        }
    }
}