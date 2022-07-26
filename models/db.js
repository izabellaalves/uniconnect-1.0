const Sequelize = require('sequelize');
const sequelize = new Sequelize('uniconnect', 'izabella', 'izabella', {
    host: 'localhost',
    dialect: 'mysql'
});


module.exports= {
    Sequelize: Sequelize,
    sequelize: sequelize,
}