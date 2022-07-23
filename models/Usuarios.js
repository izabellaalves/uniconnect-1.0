const db = require('./db')

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
        type: db.Sequelize.DOUBLE
    }
})

//Usuarios.sync({force: true})

module.exports = Usuarios