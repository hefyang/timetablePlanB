const path = require('path');

// Setting up a connection
const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', null, null, {
    host: 'localhost',
    dialect: 'sqlite',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },

    storage: path.join(__dirname, 'database.db')
});

// Test the connection
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    }).catch( err => {
        console.error('Unable to connect to the database: ', err)
    });

// Create the tables
sequelize
    .sync()
    .then(() => {
        console.log('Tables have been established. ');
    });

module.exports = sequelize;