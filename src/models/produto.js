// Define que estamos utilizando o sequelize
const Sequelize = require('sequelize');
 
// Obtem dados de conexão entre sequelize e banco de dados MySQL
const sequelize = require('../database/database.js');
 
// Cria tabela no BD e seus campos
const Produtos = sequelize.define("produtos", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    nome: {
        allowNull: false,
        type: Sequelize.STRING(100),
        validate: {
            len: [3, 100]
        }
    },
    preco: {
        allowNull: false,
        type: Sequelize.DOUBLE(),
        validate: {
            len: [1, 99999]
        }
    },
    quantidade: {
        allowNull: false,
        type: Sequelize.INTEGER(),
        validate: {
            len: [1, 1000]
        }
    },
    descricao:{
        allowNull: false,
        type: Sequelize.STRING(250),
        validate: {
            len: [3, 250]
        }
    },
    ativo: {
        allowNull: false,
        type: Sequelize.BOOLEAN(),
        defaultValue: true
    }
});
 
module.exports = Produtos;