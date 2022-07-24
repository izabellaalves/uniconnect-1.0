const db = require('./db')

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
        type: db.Sequelize.STRING}
    },
    {freezeTableName: true})

const Redessociais = db.sequelize.define('redessociais', {
    id: {
        type: db.Sequelize.INTEGER(2),
        autoIncrement: true,
        primaryKey: true
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
        allowNull: true}
    },
    {freezeTableName: true})

const Usuarios = db.sequelize.define('usuarios', {
    id: {
        type: db.Sequelize.INTEGER(2),
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: db.Sequelize.STRING
    },
    email: {
        type: db.Sequelize.STRING
    },
    matricula: {
        type: db.Sequelize.DOUBLE
    },
    curso: {
        type: db.Sequelize.STRING
    },
    senha: {
        type: db.Sequelize.DOUBLE,
    },
    },
    {freezeTableName: true})

Interesses.sync({force: true})
Redessociais.sync({force: true})
Usuarios.sync({force: true})

module.exports = Usuarios
module.exports = Redessociais
module.exports = Interesses