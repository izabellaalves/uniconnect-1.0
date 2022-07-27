const db = require('./db')

const Usuarios = db.sequelize.define('usuarios', {
    nome: {
        type: db.Sequelize.STRING
    },
    email: {
        type: db.Sequelize.STRING
    },
    matricula: {
        type: db.Sequelize.DOUBLE,
        primaryKey: true
    },
    curso: {
        type: db.Sequelize.STRING
    },
    senha: {
        type: db.Sequelize.DOUBLE,
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
    },
    whatsapp: {
        type: db.Sequelize.STRING,
        allowNull: true
    },
    discord: {
        type: db.Sequelize.STRING,
        allowNull: true
    },
    instagram: {
        type: db.Sequelize.STRING,
        allowNull: true
    },
    twitter: {
        type: db.Sequelize.STRING,
        allowNull: true
    }
})
    
Usuarios.sync({force: true})

module.exports = Usuarios
