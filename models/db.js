var settings = require('../settings');
var mongod = require('mongodb');

var db = new mongod.Db(settings.db, new mongod.Server(settings.host,27017),{auto_reconnect:true})

db.open(function(err,db){
    if(err) console.log(err);
})

module.exports = db;
