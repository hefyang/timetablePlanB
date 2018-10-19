const Subject = require('../../models/subject');
const Section = require('../../models/section');
const Timetable = require('../../models/timetable');

exports.subjects = async (req, res) => {
    const studentId = req.params.studentId;

    let subjects = await Subject.findAll();
    let its = await Timetable.findAll({where: {studentId: studentId}});

    if (its.length > 0) {
        let subjectIds = [];
        its.map(it => {
            subjectIds.push(it.subjectId);
        });
        subjects = subjects.filter((subject) => {
            return subjectIds.indexOf(subject.id) === -1;
        });
    }

    res.status(200).json(subjects);
};

exports.subject = async (req, res) => {
    const subjectId = req.params.subjectId;

    let subject = await Subject.findOne({where: {id: subjectId}});
    res.status(200).json(subject);
};

exports.selectSubjectCount = async (req, res) => {
    const studentId = req.params.studentId;

    let c = await Timetable.count({
        where: {studentId: studentId},
        distinct: true,
        col: 'subjectId'
    });
    res.status(200).json({count: c});
};

exports.timetable = async (req, res) => {
    const studentId = req.params.studentId;
    let timetableItems = [];

    let items = await Timetable.findAll({where: {studentId: studentId}});
    for (let it of items) {
        let sec = await Section.findOne({where: {id: it.sectionId}});
        timetableItems.push(sec);
    }
    res.status(200).json(timetableItems);
};

exports.sections = async (req, res) => {
    const subjectId = req.params.subjectId;

    let sections = await Section.findAll({where: {subjectId: subjectId}});
    res.status(200).json(sections);
};

exports.updateTimetableSections = async (req, res) => {
    const timetableItems = req.body;
    const updateSubjectId = timetableItems[0].subjectId;

    let its = await Timetable.findOne({where: {subjectId: updateSubjectId}});

    if (!its) {
        await Timetable.bulkCreate(timetableItems);
        res.status(200).json({added: true});
    } else {
        await Timetable.destroy({where: {subjectId: updateSubjectId}});
        await Timetable.bulkCreate(timetableItems);
        res.status(200).json({added: true});
    }
};

exports.deleteTimetableSections = async (req, res) => {
    const delSubjectId = req.params.subjectId;

    await Timetable.destroy({where: {subjectId: delSubjectId}});
    res.status(200).json({deleted: true });
};