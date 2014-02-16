var User = require('./User');
var crypto = require('crypto');

module.exports = function(req,res){
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');
    User.get(req.body.username,function(err,user){
        if(!user){
            req.flash('error','用户不存在');
            return res.redirect('/login');
        }
        if(user.password != password){
            req.flash('error','密码输入错误');
            return res.redirect('/login');
        }
        req.session.user = user.name;
        req.session.info = user;
        req.flash('success','登录成功，请自行跳转！');
        res.redirect('/');
    });
};