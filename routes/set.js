var express = require('express');
var router = express.Router();
var fs = require('fs');
var mysql = require('mysql');
const SimpleDateFormat = require("util");

router.use(express.json());

/* GET home page. */
router.get('/', function (req, res) {
    var set_name = req.query.set_name;
    console.log("Set skit " + set_name);

    var con = mysql.createConnection({
        host: "localhost",
        user: "user",
        password: "mcqueen",
        database: "flashcards"
    });

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");

        var sql = "SELECT *  FROM sets WHERE name = ?";

        con.query(sql, set_name, (function (err, result, fields) {
            if (err) throw err;
            res.send(result);
        }));
    });
});

router.get('/all', function (req, res) {
    var con = mysql.createConnection({
        host: "localhost",
        user: "user",
        password: "mcqueen",
        database: "flashcards"
    });

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");

        var sql = "SELECT *  FROM sets WHERE card_id = 0 ORDER BY date DESC";

        con.query(sql, (function (err, result, fields) {
            if (err) throw err;
            res.send(result);
        }));
    });
});

router.post('/', function(req, res, next) {
    var set_name = req.body.set_name;
    var course = req.body.course;
    var color = req.body.color;
    console.log("Sets setname: " + set_name);
    console.log("Sets course: " + course);
    console.log("Sets color: " +color);

    var con = mysql.createConnection({
        host: "localhost",
        user: "user",
        password: "mcqueen",
        database: "flashcards"
    });

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");

        var sql = "SELECT MAX(card_id) AS card_id FROM sets WHERE name = ?";

        con.query(sql, set_name, (function (err, result, fields) {
            if (err) throw err;
            var max_id = result[0].card_id;

            if(max_id == null) {
                var values =[[set_name, course, color, 0]];
                sql = "INSERT INTO sets (name, course, color, card_id) VALUES ?";

                con.query(sql, [values], (function (err, result, fields) {
                    if (err) throw err;
                    res.send(result);
                }));
            }
            else {
                res.status(400).send({message: 'No set of that name'});
            }
        }));

    });
});

module.exports = router;
