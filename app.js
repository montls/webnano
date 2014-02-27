
/**
 * Module dependencies.
 */
var fs = require('fs');
var express = require('express');
var http = require('http');
var path = require('path');
var partials = require('express-partials');
var ctrl = require('./routes/ctrl');
var log4js = require('log4js');
var flash = require('connect-flash');
var MongoStore = require('connect-mongo')(express);
var st = require('./settings');
var app = express(); 

var f_access_log = fs.createWriteStream('access.log','w');

app.configure(function(){
    app.set('port', process.env.PORT || st.port);
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');
    app.use(express.favicon());
    app.use(express.logger({/*stream:f_access_log,*/format:":remote-addr; :date; :method; :url; :status"}));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(express.bodyParser({uploadDir:'./upload'}));
    app.use(express.cookieParser());
    app.use(express.session({ secret:st.cookieSecret }));
    app.use(flash());
    app.use(partials());//制定模板
    app.use(express.static(path.join(__dirname, 'public')));
});
app.use(function(req,res,next){
    res.locals.user = req.session.user || null;
    res.locals.power = req.session.power || null;
    next();
});
// router
ctrl(app);
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());

}

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});