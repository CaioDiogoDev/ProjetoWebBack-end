const {DataTypes, Op} = require("sequelize")
const sequelize = require("./connection")

const Usuarios = sequelize.define('Usuarios',
    {
        nome: {
           type: DataTypes.STRING,
           allowNull: true
        },
        codigo:{
            type: DataTypes.INTEGER,
            autoIncremeent: true,
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
        const usuario = await Usuarios.findAll()
        return usuario;
    },

    save: async function(nome, codigo , telefone, password, tipUsuario){
        try{
            const novoUsuario = await Usuarios.create({
                nome,
                codigo,
                telefone,
                password,
                tipUsuario
            });
            console.log('Novo usuario ${Usuarios.nome} salvo com sucesso');
        }
        catch{
            console.log('Não foi possivel salvar o ${Usuarios.nome}');
            throw error;
        }
    },

    update : async function(nome, codigo){
        return await Usuarios.update()
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
    }
}
