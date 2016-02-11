var express = require('express');
var exphbs  = require('express-handlebars');
var bodyparser = require('body-parser');
const PORT = process.env.PORT || 8080;
var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : 'wish_list'
});
 
connection.connect();
 
app.use(bodyparser.urlencoded({extended:false}));

app.get("/", function (req, res) {
  connection.query("SELECT * FROM wishList", function(err, results) {
    if(err) {
      throw err;
    }
    var data = {
      wish: results
    }
    res.render('wishlist', data);
  });
});

app.post("/", function (req, res) {
  console.log(req.body.wish);
  connection.query('INSERT INTO wishList (wishitem) VALUES (?) ', [req.body.wish], function(err, result) {
    if (err) throw err;
    console.log(result);
    var data = {
      wish : result
    }
    res.redirect('/');
  });


});

app.listen(PORT, function() {
	console.log("Server is listening on %s", PORT);
});