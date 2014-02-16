var db = require('../db');

function Documents(username,post,time,id){
};
module.exports = Documents;

Documents.getOne = function getOne(collname,query,callback){
    db.collection(collname,function(err,collection){
        if(err) return callback(err);
        collection.findOne(query,function(err,doc){
            if(err) return callback(err);
            return callback(null,doc);
        });
    });
};

Documents.count = function count(collname,query, callback){
    db.collection(collname,function(err,collection){
        if(err) return callback(err);
        collection.count(query,function(err,n){
            if(err) return callback(err);
            return callback(null,n);
        });
    });
};

Documents.get = function get(collname, query, callback){
    db.collection(collname,function(err,collection){
        if(err) return callback(err);
        collection.find(query,function(err,cursor){
            if(err) return callback(err);
            return callback(null,cursor);
        });
    });
};