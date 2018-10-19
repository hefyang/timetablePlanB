const Sequelize = require('sequelize');
const sequelize = require('./db');
const Student = require('./student');
const Section = require('./section');

// Define the schema of subjects table
const Timetable = sequelize.define('timetable', {
    // id: {
    //     type: Sequelize.NUMERIC,
    //     primaryKey: true,
    //     unique: true,
    //     allowNull: false
    // },
    subjectId: {
        type: Sequelize.NUMERIC
    }

    // status: {
    //     type: Sequelize.STRING
    // }
}, {
    timestamps: false
});

//set the relationship between section table and timetable table.
Section.belongsToMany(Student, {through: Timetable});

module.exports = Timetable;