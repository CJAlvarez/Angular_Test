const express = require('express');
const router = express.Router();
const http = require('http');
var mysql = require('mysql');

var con = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "admin123",
    database: 'at',
    insecureAuth: true,
    multipleStatements: true
});


// Regex
const reg_real = new RegExp(`^[0-9]+(.[0-9]+)?$`);
const reg_numberOnly = new RegExp(`^[0-9]+$`);
const reg_id = new RegExp(`^[0-9]{13}$`);
const reg_name = new RegExp(`^([^0-9]*)$`);
const reg_phone = new RegExp(`^[0-9]{8}$`);
const reg_age = new RegExp(`^[0-9](([0-9])?[0-9])?$`);
const reg_email = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

/*
Select Method
*/
router.get('/get_patientcount', (req, res, next) => {
    if (req.query.angular == 'true') {

        var query = `SELECT COUNT(*) FROM patients;`;
        con.query(query, (err, result, fields) => {
            if (err) {
                next(err);
                res.status(500).json({
                    message: 'Internal server error.'
                });
            } else {
                res.status(200).json(result);
            }
        });
    } else {
        res.status(430).json({
            message: 'Forbidden, you don\'t have permission to access on this server.'
        });
    }
});


/*
Select Method
*/
router.get('/get_patients', (req, res, next) => {
    if (req.query.angular == 'true') {

        const limit = reg_numberOnly.test(req.query.limit) ? req.query.limit : null;
        const skip = reg_numberOnly.test(req.query.skip) ? req.query.skip : null;
        const order = req.query.order;
        var values = [
            order
        ].filter(val => val);

        var query = `SELECT * FROM patients ${order ? ' ORDER BY ?' : ''}${limit ? ` LIMIT ${skip ? `${skip}, ${limit}` : `${limit}`}` : ''};`;
        con.query(query, values, (err, result, fields) => {
            if (err) {
                next(err);
                res.status(500).json({
                    message: 'Internal server error.'
                });
            } else {
                res.status(200).json(result);
            }
        });
    } else {
        res.status(430).json({
            message: 'Forbidden, you don\'t have permission to access on this server.'
        });
    }
});


/*
Insert Method
*/
router.post('/insert_patient', (req, res, next) => {
    if (req.query.angular == 'true') {

        var values = [
            req.body.id,
            req.body.firstname,
            req.body.lastname,
            req.body.age,
            req.body.gender,
            req.body.phone,
            req.body.email,
            req.body.createdAt
        ].filter(val => val);

        var validate_values = [
            {
                label: 'id',
                value: req.body.id
            },
            {
                label: 'firstname',
                value: req.body.firstname
            },
            {
                label: 'lastname',
                value: req.body.lastname
            },
            {
                label: 'age',
                value: req.body.age
            },
            {
                label: 'gender',
                value: req.body.gender
            },
            {
                label: 'phone',
                value: req.body.phone
            },
            {
                label: 'email',
                value: req.body.email
            },
            {
                label: 'createdAt',
                value: req.body.createdAt
            }
        ];

        var errors = [];

        /* VALIDATIONS */

        validate_values.forEach(value => {

            // No exist
            if (!value.value) {
                errors.push({
                    status: 400,
                    message: `Error: ${value.label} field is missing.`
                });
            }

            // Exist but Ambiguous
            else if (Array.isArray(value.value)) {
                errors.push({
                    status: 400,
                    message: `Error: Ambiguous ${value.label} field.`
                });
            }

            // Other
            else {
                switch (value.label) {
                    case 'id': {
                        if (!reg_id.test(value.value)) {
                            errors.push({
                                status: 400,
                                message: `Error: Erroneous ${value.label} value.`
                            });
                        }
                        break;
                    }
                    case 'firstname': { }
                    case 'lastname': { }
                    case 'gender': {
                        if (!reg_name.test(value.value)) {
                            errors.push({
                                status: 400,
                                message: `Error: Erroneous ${value.label} value.`
                            });
                        }
                        break;
                    }
                    case 'age': {
                        if (!reg_age.test(value.value)) {
                            errors.push({
                                status: 400,
                                message: `Error: Erroneous ${value.label} value.`
                            });
                        }
                        break;
                    }
                    case 'phone': {
                        if (!reg_phone.test(value.value)) {
                            errors.push({
                                status: 400,
                                message: `Error: Erroneous ${value.label} value.`
                            });
                        }
                        break;
                    }
                    case 'email': {
                        if (!reg_email.test(value.value)) {
                            errors.push({
                                status: 400,
                                message: `Error: Erroneous ${value.label} value.`
                            });
                        }
                        break;
                    }
                    case 'createdAt': {
                        if (isNaN(Date.parse(value.value))) {
                            errors.push({
                                status: 400,
                                message: `Error: Erroneous ${value.label} value.`
                            });
                        }
                        break;
                    }

                    default: break;
                }
            }
        });

        // if OK
        if (errors.length == 0) {
            var query = `INSERT INTO patients
        ( id, firstName, lastName, age, gender, phone, email, createdAt )
        VALUES
        ( ?, ?, ?, ?, ?, ?, ?, ? )
        ;
        `;
            con.query(query, values, (err, result, fields) => {
                if (err) {
                    if (err.sqlState == "23000") {
                        res.status(400).json({
                            message: 'Error: Duplicate key.'
                        });
                    } else {
                        next(err);
                        res.status(500).json(err);
                    }
                } else {
                    res.status(200).json({
                        message: 'Patient has been inserted successfully!',
                        insert_id: result.insert_id
                    });
                }
            });
        }

        // if there are errors 
        else {
            res.status(400).json({
                errors: errors
            });
        }
    } else {
        res.status(430).json({
            message: 'Forbidden, you don\'t have permission to access on this server.'
        });
    }
});


/*
Delete Method
*/
router.delete('/delete_patient', (req, res, next) => {
    if (req.query.angular == 'true') {

        var values = [
            req.query.id
        ].filter(val => val);

        var errors = [];

        /* VALIDATIONS */

        // if id does not exist 
        if (!req.query.id) {
            errors.push({
                status: 400,
                message: 'Error: \'id\' field required.'
            });
        }

        /* AMBIGUOUS DATA */

        // if there are more ids 
        if (req.query.id instanceof Array && req.query.id.length > 1) {
            errors.push({
                status: 400,
                message: 'Error: Ambiguous id.'
            });
        }

        // if OK
        if (errors.length == 0) {
            var query = `DELETE FROM patients WHERE id=?;`;

            con.query(query, values, (err, result, fields) => {
                if (err) {
                    next(err);
                    res.status(500).json({
                        message: 'Internal server error.'
                    });
                } else {
                    res.status(200).json({
                        message: result.affectedRows > 0
                            ? 'Patient has been deleted successfuly!'
                            : `There is not a patient with id=${req.query.id}.`,
                        affectedRows: result.affectedRows
                    });
                }
            });
        }

        // if there are errors 
        else {
            res.status(400).json({
                errors: errors
            });
        }
    } else {
        res.status(430).json({
            message: 'Forbidden, you don\'t have permission to access on this server.'
        });
    }
});


module.exports = router;
