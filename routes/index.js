var express = require('express');
var router = express.Router();
var path = require('path');
var pg=require('pg');
var connectionString = require(path.join(__dirname, '../', 'config.js'));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//POST
router.post('/api/v1/todos', function(req, res){
  var results = [];

  var data ={ text:req.body.text, complete:false};

  pg.connect(connectionString, function(err, client, done){
    if(err){
      done();
      console.log(err);
      return res.status(500).json({success:false, data:err});
    }

    //insert the data
    client.query("INSERT INTO items(text, complete) values($1, $2)", [data.text, data.complete]);

    //check our results
    var query = client.query("SELECT * FROM items ORDER BY id ASC");

    //stream results one row at a tiem
    query.on('row', function(row){
        results.push(row);
    });

    //close connection and return results array
    query.on('end', function(){
        done();
        return res.json(results);
    });

  });
});

module.exports = router;
