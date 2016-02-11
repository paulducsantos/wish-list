var express = require('express');
var exphbs  = require('express-handlebars');
const PORT = process.env.PORT || 8080;
var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'wishlist'}));
app.set('view engine', 'handlebars');

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'wish_list'
});
 
connection.connect();
 
connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) throw err;
 
  console.log('The solution is: ', rows[0].solution);
});

app.get("/", function (req, res) {
	res.render("wishlist");
});

app.listen(PORT, function() {
	console.log("Server is listening on %s", PORT);
});