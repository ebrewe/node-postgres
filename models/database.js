var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://postgres:password123@localhost:5432/todo';

var client = new pg.Client(connectionString);
client.connect();
var query = client.query('CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
query.on('en', function(){client.end();});
