var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var max_id = 0;




router.use(express.json());

/* GET home page. */
router.get('/', function (req, res) {

});

router.post('/', function(req, res, next) {
    var set_name = req.body.set_name;
    var course = req.body.course;
    var color = req.body.color;
    var card_question = req.body.card_question;
    var card_answer = req.body.card_answer;

    console.log("Cards setname: " +set_name);
    console.log("Cards course: " + course);
    console.log("Cards color: " +color);
    console.log("Cards question: " +card_question);
    console.log("Cards answer: " +card_answer);



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
            console.log();
            console.log("MAx ID: " + max_id);
            console.log();

            if(max_id !== null) {
                sql = "INSERT INTO sets (name, course, color, card_id, card_question, card_answer) VALUES ?";
                var values = [[set_name, course, color, max_id + 1, card_question, card_answer]];

                con.query(sql, [values], (function (err, result, fields) {
                    if (err) throw err;

                    var sql = "UPDATE sets SET nr_cards = " + (max_id + 1) + " WHERE ( name = \'"+ set_name + "\' AND card_id = " + 0 + ")";
                    console.log(sql);
                    con.query(sql, (function (err, result, fields){
                        res.send();

                    }));
                }));
            }
            else {
                res.status(400).send({message: 'No set of that name'});
            }
        }));
    });
});

module.exports = router;
