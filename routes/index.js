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

//READ
router.get('/api/v1/todos', function(req, res){
  var results = [];

  pg.connect(connectionString, function(err, client, done){
      if(err){
        done();
        console.log(err);
        return res.status(500).json({success:false, data:err});
      }

      var query = client.query("SELECT * FROM items ORDER BY id ASC");

      //stream results back one row at a time
      query.on('row', function(row){
        results.push(row);
      });

      query.on('end', function(){
          done();
          return res.json(results);
      });

  });
});


//update
router.put('/api/v1/todos/:todo_id', function(req, res){var results = [];

    var results = [];

    var id = req.params.todo_id;

    var data = {text:req.body.text, complete:req.body.complete};

    pg.connect(connectionString, function(err, client, done){
        if(err){
          done();
          console.log(err);
          return res.status(500).json({success:false, data:err});
        }

        client.query("UPDATE items SET text =($1), complete=($2) WHERE id=($3)", [data.text, data.complete, id]);


        var query = client.query("SELECT * FROM items ORDER BY id ASC");

        //stream results back one row at a time
        query.on('row', function(row){
          results.push(row);
        });

        query.on('end', function(){
            done();
            return res.json(results);
        });

    });

});

//delete
//update
router.delete('/api/v1/todos/:todo_id', function(req, res){var results = [];

    var results = [];

    var id = req.params.todo_id;


    pg.connect(connectionString, function(err, client, done){
        if(err){
          done();
          console.log(err);
          return res.status(500).json({success:false, data:err});
        }

        client.query("DELETE FROM items WHERE id=($1)", [id]);


        var query = client.query("SELECT * FROM items ORDER BY id ASC");

        //stream results back one row at a time
        query.on('row', function(row){
          results.push(row);
        });

        query.on('end', function(){
            done();
            return res.json(results);
        });

    });

});

module.exports = router;
