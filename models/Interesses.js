const db = require('./db')
const Usuarios = require('./Usuarios');

const Interesses = db.sequelize.define('interesses', {
    id: {
        type: db.Sequelize.INTEGER(2),
        autoIncrement: true,
        primaryKey: true
    },
    musicas: {
        type: db.Sequelize.STRING
    },
    jogos: {
        type: db.Sequelize.STRING
    },
    filmes: {
        type: db.Sequelize.STRING
    },
    livros: {
        type: db.Sequelize.STRING
    },
    esportes: {
        type: db.Sequelize.STRING
    },
    educação: {
        type: db.Sequelize.STRING
    }
})


//Interesses.sync({force: true})

module.exports = Interesses 