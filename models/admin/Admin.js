var db = require('../db');

exports.db = db;
exports.getAllCursor = function(collname,query,callback){
    db.collection(collname,function(err,collection){
        collection.find(query,function(err,user_cursor){
            if(err) return callback(err);
            return callback(null,user_cursor);
        });
    });
};

exports.getDbInfo = function(callback){
    var adminDb = db.admin();
    adminDb.buildInfo(function(err,info){
        if(err) return callback(err);
        callback(null,info);
    });
}

exports.getProfileInfo = function(callback){
    var adminDb = db.admin();
    adminDb.profilingInfo(function(err,info){
        if(err) return callback(err);
        callback(null,info);
    });
}

exports.getCollectionsInfo = function(collname,callback){
    if(typeof(collname) == "function"){
        callback = collname;
        db.collectionsInfo(function(err,cursor){
            if(err) return callback(err);
            callback(null,cursor);
        });
    }
    else{
        db.collectionsInfo(collname,function(err,cursor){
            if(err) return callback(err);
            callback(null,cursor);
        });
    }
}

exports.getDbStatus = function(callback){
    db.stats(function(err,stats){
        if(err) return callback(err);
        callback(null,stats);
    });
}

//opt用到的接口
exports.findAndModify = function(collname,query,sort,update_doc,callback){
    
    db.collection(collname,function(err,collection){
        collection.findAndModify(query,sort,update_doc,{safe:true},function(err,doc){
            console.log(doc);
            if(err) return callback(err);
            callback(null,doc);
        });
    });
}