var express = require('express');
var router = express.Router();
var fs = require('fs');
var mysql = require('mysql');

router.use(express.json());

/* GET home page. */
router.get('/', function (req, res) {
    var set_name = req.query.set_name;

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

        var sql = "SELECT *  FROM sets WHERE card_id = 0";

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
    console.log(set_name);
    console.log(course);
    console.log(color);

    var con = mysql.createConnection({
        host: "localhost",
        user: "user",
        password: "mcqueen",
        database: "flashcards"
    });

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var values =[[set_name, course, color, 0]];
        var sql = "INSERT INTO sets (name, course, color, card_id) VALUES ?";

        con.query(sql, [values], (function (err, result, fields) {
            if (err) throw err;
            res.send(result);
        }));
    });
});

module.exports = router;
