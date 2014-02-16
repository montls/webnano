var db = require('../db');

function Post(username,post,time,id){
};
module.exports = Post;

Post.save = function save(collname,docs,callback){
    db.collection(collname,function(err,collection){
        if(err) return callback(err);
        collection.ensureIndex('user');
        collection.insert(docs,{safe:true},function(err,post){
            callback(err,post);
        });
    })
};

Post.getOne = function getOne(collname,query,callback){
    db.collection(collname,function(err,collection){
        if(err) return callback(err);
        collection.findOne(query,function(err,doc){
            if(err) return callback(err);
            return callback(null,doc);
        });
    });
};

Post.count = function count(collname,query, callback){
    db.collection(collname,function(err,collection){
        if(err) return callback(err);
        collection.count(query,function(err,n){
            if(err) return callback(err);
            return callback(null,n);
        });
    });
};

Post.get = function get(collname, query, callback){
    db.collection(collname,function(err,collection){
        if(err) return callback(err);
        collection.find(query,function(err,cursor){
            if(err) return callback(err);
            return callback(null,cursor);
        });
    });
};

        
