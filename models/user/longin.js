var User = require('./User');
var crypto = require('crypto');

module.exports = function(req,res){
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');
    User.get(req.body.username,function(err,user){
        if(!user){
            req.flash("login_error","该用户不存在");
            return res.redirect('/login');
        }
        if(user.password != password){
            req.flash("login_error","密码输入错误请重新输入");
            return res.redirect('/login');
        }
        req.session.user = user.name;
        req.session.power = user.power;
        res.redirect('/');
    });
};