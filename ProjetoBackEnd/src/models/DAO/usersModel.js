const { DataTypes } = require("sequelize")
const sequelize = require("./connection")


const Usuarios = sequelize.define('Usuarios',
    {
        nome: {
            type: DataTypes.STRING,
            allowNull: true
        },
        codigo: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        telefone: {
            type: DataTypes.STRING,
            allowNull: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true
        },
        tipUsuario: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }
)
module.exports = {
    list: async function () {
        try {
            const usuario = await Usuarios.findAll()
            return usuario;
        } catch (error) {
            return res.status(500).json({ error: 'Falha ao tentar listar usuarios' });
        }

    },

    save: async function (nome, telefone, password, tipUsuario) {
        try {
            const novoUsuario = await Usuarios.create({
                nome,
                telefone,
                password,
                tipUsuario
            });
            return novoUsuario;

        } catch (error) {
            return res.status(500).json({ error: 'Falha ao salvar novo usuario' });
        }
    },

    update: async function (nome, telefone, password, codigo) {
        try {
            const [linhasAfetadas, linhasAtualizadas] = await Usuarios.update(
                { nome: nome, telefone: telefone, password: password },
                {
                    where: {
                        codigo: codigo
                    },
                    returning: true
                }

            );
            return [linhasAfetadas, linhasAtualizadas];

        } catch (error) {
            return res.status(500).json({ error: 'Falha ao tentar realizar atualização do usuario' });
        }
    },

    getByidName: async function (nome, password) {
        try {
            return await Usuarios.findOne({
                where: {
                    nome: nome,
                    password: password
                }
            });
        } catch (error) {

            return res.status(500).json({ error: 'Falha ao buscar usuario por nome e password' });
        }
    },
    getByid: async function (codigo) {
        try {
            return await Usuarios.findOne({
                where: {
                    codigo: codigo
                }
            });
        } catch (error) {

            return res.status(500).json({ error: 'Falha ao buscar usuario por codigo' });
        }
    },
    delete: async function (nome, password, telefone, codigo) {
        try {
            const user = await Usuarios.findOne({
                where: {
                    nome: nome,
                    password: password,
                    telefone: telefone,
                    codigo: codigo
                }
            })
            return user.destroy()
        } catch (error) {
            return res.status(500).json({ error: 'Falha ao deletar usuario' });
        }
    },

}
