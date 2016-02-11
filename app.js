var express = require('express');
var exphbs  = require('express-handlebars');
const PORT = process.env.PORT || 8080;
var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
