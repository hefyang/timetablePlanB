const Sequelize = require('sequelize');
const sequelize = require('./db');
const Student = require('./student');
const Section = require('./section');

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


Section.belongsToMany(Student, {through: Timetable});

module.exports = Timetable;