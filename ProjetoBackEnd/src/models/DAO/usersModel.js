const {DataTypes} = require("sequelize")
const sequelize = require("./connection")


const Usuarios = sequelize.define('Usuarios',
    {
        nome: {
           type: DataTypes.STRING,
           allowNull: true
        },
        codigo:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        telefone: {
            type: DataTypes.STRING,
            allowNull: true
        },
        password:{
            type: DataTypes.STRING,
            allowNull: true
        },
        tipUsuario:{
            type: DataTypes.STRING,
            allowNull: true
        }
    }
)
module.exports = {
    list: async function() {
        try {
            const usuario = await Usuarios.findAll()
            return usuario;
        } catch (error) {
            console.error("Erro ao buscar usuário", error);
            throw error;
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
            console.log('Novo usuário salvo com sucesso');
            return novoUsuario;

        } catch (error) {
            console.error('Não foi possível salvar o usuário', error.message);
            throw error;
        }
    },

    update : async function(nome, codigo){
        try {
            return await Usuarios.update()

        } catch (error) {
            console.error("Erro ao dados do cliente.", error);
            throw error;
        }
    },
    
    getByidName: async function(nome, password) {
        try {
            return await Usuarios.findOne({
                where: {
                    nome: nome,
                    password: password
                }
            });
        } catch (error) {
           
            console.error("Erro ao buscar usuário por nome e código:", error);
            throw error;
        }
    },
    delete: async function(nome, telefone, id) {
         const user = await Usuarios.findOne({
            where: {
                nome: nome,
                telefone: telefone,
                id: id
            }
         })
        return user.destroy()
    },

}
