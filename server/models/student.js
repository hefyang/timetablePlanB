const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('./db');

// Define the schema of students table
const Students = sequelize.define('student', {
    id: {
        type: Sequelize.NUMERIC,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull:false,
        // unique: true
    },
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    },
    salt: {
        type: Sequelize.STRING,
        allowNull: false
    },
    hash: {
        type: Sequelize.STRING,
        allowNull: false
    },
    confirmed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: false,
    setterMethods: {

        password(plaintextPassword) {
            const saltRounds = 12;

            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(plaintextPassword, salt);

            this.setDataValue('salt', salt);
            this.setDataValue('hash', hash);
        }
    }
});

// force: true will drop the table if it already exists
// Students.sync({force: true})
//     .then(() => {
//         console.log('Students have been established. ');
//     });

module.exports = Students;