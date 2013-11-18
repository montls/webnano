var db = require('../db');
var settings = require('../../settings');

function User(user){
    this.name = user.name;
    this.password = user.password;
};
module.exports = User;

User.prototype.save = function save(callback){
    var get_power = settings.power.read;
    if(this.name == settings.admin_master.cxh || this.name == settings.admin_master.hx){
        get_power = settings.power.admin;
    }
    var user={
        name:this.name,
        password:this.password,
        power:get_power,
        time:new Date()
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
            }
        });
    });
}