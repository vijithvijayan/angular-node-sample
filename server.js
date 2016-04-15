var express = require('express');
var app = express();
var mongoose = require('mongoose');
 var port     = process.env.PORT || 9999;  
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var favicon = require('serve-favicon');


 var database = require('./config/database');
 mongoose.connect(database.url)

 app.use(express.static(__dirname+'/public'));
 app.use(favicon(__dirname + '/public/images/favicon.ico'));
 app.use(morgan('dev'))
 app.use(bodyParser.urlencoded({'extended':true}))
 app.use(bodyParser.json());
 app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
 app.use(methodOverride());

 require('./app/routes')(app);

 app.listen(port);