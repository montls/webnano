var User = require('../models/user/User');
var settings = require('../settings');

exports.checkLogin = function(req,res,next){
    if(req.session.user){
        next();
    }
    else{
        res.redirect('/404');
    }
};

exports.checkNotLogin = function(req,res,next){
    if(req.session.user){
        res.redirect('/404');
    }
    else{
        next();
    }
};

exports.checkAdminLogin = function(req,res,next){ 
};

exports.checkManagerLogin = function(req,res,next){
    User.get(req.session.user,function(err,user_doc){
        if(err){
            req.flash('error','未知错误，请联系管理员');
            res.redirect('/post');
        }
        else if(user_doc.power < settings.power.manager){
            
            req.flash('error','您没有足够权限执行操作，请联系管理员');
            res.redirect('/post');
        }
        else{
            next();
        }
    });
};