var express = require('express');
var router = express.Router();
var fs = require('fs')
var mysql = require('mysql');
var max_id = 0;




router.use(express.json());

/* GET home page. */
router.get('/', function (req, res) {

});

router.post('/', function(req, res, next) {
    var set_name = "asdasd";
    var course = req.body.course;
    var color = req.body.color;
    var card_question = "haaaalllå"//req.body.card_question;
    var card_answer = "adjööööööö"//req.body.card_answer;

    console.log(set_name);
    //console.log(course);
    //console.log(color);

    var con = mysql.createConnection({
        host: "localhost",
        user: "user",
        password: "mcqueen",
        database: "flashcards"
    });

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        //var values =[[set_name, course, color, 0]];
        var sql = "SELECT MAX(card_id) AS card_id FROM sets WHERE name = ?";


        con.query(sql, set_name, (function (err, result, fields) {
            if (err) throw err;
            max_id = result[0].card_id;
            console.log("First: " + max_id);

            sql = "INSERT INTO sets (name, course, color, card_id, card_question, card_answer) VALUES ?";
            var values =[[set_name, course, color, max_id + 1,card_answer,card_question ]];

            console.log("Second: " + max_id);
            con.query(sql, [values], (function (err, result, fields) {
                if (err) throw err;
                res.send();
            }));
        }));



    });
    //var sql = "INSERT INTO sets (name, course, color, card_id) VALUES ?";
});

module.exports = router;
