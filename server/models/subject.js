const Sequelize = require('sequelize');
const sequelize = require('./db');
const Section = require('./section');

// Define the schema of subjects table
const Subjects = sequelize.define('subject', {
    id: {
        type: Sequelize.NUMERIC,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    credit: {
        type: Sequelize.NUMERIC,
        allowNull: true
    },
    type: {
        type: Sequelize.STRING,
        allowNull: true
    },
    info: {
        type: Sequelize.STRING,
        allowNull: true
    }
}, {
    timestamps: false
});
//set the relationship between section table and subject table.
Subjects.hasMany(Section);

module.exports = Subjects;