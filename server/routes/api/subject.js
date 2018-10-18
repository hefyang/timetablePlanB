const Subject = require('../../models/subject');
const Section = require('../../models/section');
const Timetable = require('../../models/timetable');

exports.subjects = (req, res) => {
    const studentId = req.params.studentId;
    Subject.findAll().then((subjects) => {
        Timetable.findAll({where: {studentId: studentId}})
            .then( its => {
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
            })

    })
};

exports.subject = (req, res) => {
    const subjectId = req.params.subjectId;
    Subject.findOne({where: {id: subjectId}})
        .then( subject => {
            res.status(200).json(subject);
        });
};

exports.selectSubjectCount = (req, res) => {
    const studentId = req.params.studentId;
    Timetable.count({
        where: {studentId: studentId},
        distinct: true,
        col: 'subjectId'
    }).then(c => {
        res.status(200).json({count: c});
    });
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

    // Timetable.findAll({where: {studentId: studentId}})
    //     .then((items) => {
    //         items.map(it => {
    //             Section.findOne({where: {id: it.sectionId}})
    //                 .then((sec) => {
    //                     timetableItems.push(sec);
    //                 });
    //         });
    //     });
    //
    // setTimeout(() => {
    //     res.status(200).json(timetableItems);
    // }, 300)
};

exports.sections = (req, res) => {
    const subjectId = req.params.subjectId;
    Section.findAll({where: {subjectId: subjectId}})
        .then((sections) => {
            res.status(200).json(sections);
        });
};

exports.updateTimetableSections = (req, res) => {
    const timetableItems = req.body;
    const updateSubjectId = timetableItems[0].subjectId;

    Timetable.findOne({where: {subjectId: updateSubjectId}})
        .then( its => {
            if (!its) {
                Timetable.bulkCreate(timetableItems)
                    .then(() => {
                        res.status(200).json({added: true});
                    });
            } else {
                Timetable.destroy({where: {subjectId: updateSubjectId}})
                    .then(() => {
                        Timetable.bulkCreate(timetableItems)
                            .then(() => {
                                res.status(200).json({added: true});
                            });
                    })
            }
        });
};

exports.deleteTimetableSections = (req, res) => {
    const delSubjectId = req.params.subjectId;
    Timetable.destroy({where: {subjectId: delSubjectId}})
        .then(() => {
            res.status(200).json({deleted: true });
        });
};