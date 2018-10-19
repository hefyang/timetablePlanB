const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

const Students = require('../../models/student');

const RSA_PRIVATE_KEY = fs.readFileSync(path.join(__dirname, '../../server_env/private.key'));
const EMAIL_SECRET = process.env.EMAIL_SECRET;
const HOST_AND_PORT = process.env.DEVELOPMENT ? 'localhost:4200' : process.env.HOST;

//get current user information according to the studentId
exports.user = async (req, res) => {
    const studentId = req.body.studentId;

    let student = await Students.findOne({where: {id: studentId}});
    if (student) res.json({exist: true});
    else res.json(null);
};

//add the new user to the student table.
exports.register = async (req, res) => {
    const student = req.body;

    await Students.create(student);
    res.status(200).json({success: true, unconfirmed: true});

//    async email
    jwt.sign({
        id: student.id
    }, EMAIL_SECRET, {
        algorithm: "HS256",
        expiresIn: "1d"
    }, (err, emailToken) => {
        const url = `http://${HOST_AND_PORT}/api/confirmation/${emailToken}`;

        // Use Gmail account
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: '"Admin"<qijun.yang.developer@gmail.com>',    // sender address
            to: student.email,                                  // email receivers
            subject: 'Confirm Email',                           // Subject line
            html: `<b>Please click this link to confirm your email: <a href="${url}">${url}</a></b>`  // html body

        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) return next(err);
            console.log('Message sent: %s', info.messageId);
        });
    });
};
//email confirm
exports.confirm = (req, res) => {
    jwt.verify(req.params.token, EMAIL_SECRET,
        (err, student) => {
            if (err) return next(err);
            Students.update({confirmed: true}, {where: {id: student.id}});
            res.redirect('/#/login');
        });
};
//login checking function
exports.login = async (req, res) => {
    const studentId = req.body.studentId;
    const password = req.body.password;

    let student = await Students.findOne({ where: {id: studentId}});

    // email confirmation
    if (student && !student.confirmed) {
        res.json({unconfirmed: true});
    } else if (student && bcrypt.compareSync(password, student.hash)) {
        //set timeout information
        const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
            algorithm: "RS256",
            expiresIn: "1d",
            subject: studentId
        });

        res.status(200).json({
            studentId: student.id,
            idToken: jwtBearerToken,
            expiresIn: 1440
        });
    } else {
        res.json({unauthorized: true});
    }
};