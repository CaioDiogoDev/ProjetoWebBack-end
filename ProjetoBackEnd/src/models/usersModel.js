const {DataTypes, Op} = require("sequelize")
const sequelize = require("./DAO/connection")
const validaTexto = require('./extensions/validaTexto')
const validaNumero = require('./extensions/validarCampoNumerico')

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
        const usuario = await Usuarios.findAll({})
        return usuario;
    },

    save: async function(nome, codigo , telefone, password, tipUsuario){
        try{
            validaTexto(nome);
            validaNumero(codigo);
            validaTexto(telefone);
            validaTexto(password);
            validaTexto(tipUsuario);

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
        }
    },
}
