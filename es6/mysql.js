const mysql = require('mysql');

var connection = mysql.createConnection({
  host     : '192.168.51.128',
  user     : 'root',
  password : '123456',
  database : 'xzjcy20171031'
});
 
connection.connect();
 
connection.query('SELECT * from t_user limit 1', function (error, results, fields) {
  if (error) throw error;
  console.log(results);
  console.log('-------');
  console.log(fields);
});

connection.end();