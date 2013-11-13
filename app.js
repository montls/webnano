
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var partials = require('express-partials');
var flash = require('connect-flash');
var ctrl = require('./routes/ctrl');
var MongoStore = require('connect-mongo')(express);
var settings = require('./settings');

var app = express();

// all environments
app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(express.bodyParser({uploadDir:'./upload'}));
    app.use(express.cookieParser());
    app.use(express.session({
        secret:settings.cookieSecret,
        store: new MongoStore({
            db:settings.db
        })
    }));
    app.use(flash());
    app.use(partials());
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure(function(){
    app.locals({
        user:false,
        error:false,
        success:false
    });
    app.use(function(req,res,next){
        res.locals.user = req.session.user;
        res.locals.error = req.flash('error').toString();
        res.locals.success = req.flash('success').toString();
        next();
    });       
});

ctrl(app);
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());

}
if (0) {
    http.createServer(app).listen(8789,"192.168.1.192", function(){
        console.log('Express server listening on port ' + 8789);
    });
}
else{
    http.createServer(app).listen(app.get('port'), function(){
        console.log('Express server listening on port ' + app.get('port'));
    });
}