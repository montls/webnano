var db = require('../db');

function User(user){
    this.name = user.name;
    this.password = user.password;
};
module.exports = User;

User.prototype.save = function save(callback){
    var user={
        name:this.name,
        password:this.password
    };

    db.collection('users', function(err, collection){
        if(err){
            return callback(err);
        }
        collection.ensureIndex('name',{unique:true});
        collection.insert(user,{sate:true},function(err,user){
            console.log(err);
            callback(err,user);
        })
    })
};

User.get = function get(username,callback){
    db.collection('users',function(err,collection){
        if(err){
            return callback(err);
        }
        collection.findOne({name:username},function(err,doc){
            if(doc){
                callback(err,doc);
            }else{
                callback(err,null);
                console.log(1);
            }
        });
    });
}
            
