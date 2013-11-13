var crypto = require('crypto');
var User = require('./User');

module.exports = function(req,res){
    if(req.body['password-repeat'] != req.body['password']){
        req.flash('error','两次密码输入不一致');
        return res.redirect('/reg');
    }
    var pw = req.body.password;
    var un = req.body.username;
    if(typeof(un) != "string" || un.length < 1 || un.length > 18){
        req.flash('error','用户名长度错误'+un.length);
        return res.redirect('/reg');
    }
    if(typeof(pw) != "string" || pw.length < 8 || pw.length > 18){
        req.flash('error','密码长度错误');
        return res.redirect('/reg');
    }
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');
    
    var newUser = new User({
        name: req.body.username,
        password: password
    });
    
    User.get(newUser.name,function(err, user){
        if(user){
            req.flash('error','用户名已经存在')
            return res.redirect('/reg');
        }
        if(err){
            req.flash('error',err);
            return res.redirect('/reg');
        }
        newUser.save(function(err){
            if(err){
                req.flash('err',err);
                return res.redirect('/reg');
            }
            req.session.user = newUser.name;
            req.flash('success','注册成功');
            return res.redirect('/');
        });
    });
}
        