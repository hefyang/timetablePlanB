const Sequelize = require('sequelize');
const sequelize = require('./db');

// Define the schema of sections table
const Section = sequelize.define('section', {
    id: {
        type: Sequelize.NUMERIC,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    year: {
        type: Sequelize.NUMERIC
    },
    term: {
        type: Sequelize.STRING
    },
    type: {
        type: Sequelize.STRING
    },
    activity: {
        type: Sequelize.NUMERIC
    },
    day: {
        type: Sequelize.STRING
    },
    startTime: {
        type: Sequelize.STRING
    },
    endTime: {
        type: Sequelize.STRING
    },
    location1: {
        type: Sequelize.STRING
    },
    location2: {
        type: Sequelize.STRING
    },
    weeks: {
        type: Sequelize.STRING
    },
    info: {
        type: Sequelize.TEXT
    }
}, {
    timestamps: false
});

module.exports = Section;