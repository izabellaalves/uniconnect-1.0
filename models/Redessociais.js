const db = require('./db')
const Usuarios = require('./Usuarios');

const Redessociais = db.sequelize.define('redessociais', {
    id: {
        type: db.Sequelize.INTEGER(2),
        autoIncrement: true,
        primaryKey: true
    },
    whatsapp: {
        type: db.Sequelize.STRING
    },
    discord: {
        type: db.Sequelize.STRING
    },
    instagram: {
        type: db.Sequelize.DOUBLE
    },
    twitter: {
        type: db.Sequelize.STRING
    },
    UsuarioId: {
        type: db.Sequelize.INTEGER(2),
        }
})

Redessociais.belongsTo(Usuarios, {
    foreignKey: 'UsuarioId',
    allowNull: true
});

//Redessociais.sync({force: true})

module.exports = Redessociais