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
const reg_numberOnly = new RegExp(`^[0-9]+(.[0-9]+)?$`);
const reg_id = new RegExp(`^[0-9]{13}$`);
const reg_name = new RegExp(`^[a-zA-Z]`);
const reg_phone = new RegExp(`^[0-9]{8}$`);
const reg_age = new RegExp(`^[0-9][0-9]?[0-9]?`);
const reg_email = new RegExp(`/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/`);

/*
Select Method
*/
router.get('/get_patients', (req, res, next) => {

    var values = [
        req.query.order,
        req.query.limit,
        req.query.skip,
    ].filter(val => val);

    var query = `SELECT * FROM patients ${req.query.order ? ' ORDER BY ?' : ''}${req.query.limit ? ` LIMIT ${req.query.skip ? `${req.query.skip}, ${req.query.limit}` : `${req.query.limit}`}` : ''};`;
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
});


/*
Insert Method
*/
router.post('/insert_patient', (req, res, next) => {
    var values = [
        req.body.id,
        req.body.firstName,
        req.body.lastName,
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
            label: 'firstName',
            value: req.body.firstName
        },
        {
            label: 'lastName',
            value: req.body.lastName
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

                    break;
                }
                case 'firstName': {

                    break;
                }
                case 'lastName': {

                    break;
                }
                case 'age': {

                    break;
                }
                case 'gender': {

                    break;
                }
                case 'phone': {

                    break;
                }
                case 'email': {

                    break;
                }
                case 'createdAt': {

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
                next(err);
                res.status(500).json({
                    message: 'Internal server error.'
                });
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
});


module.exports = router;