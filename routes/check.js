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
    if(req.session.state == "upload_admin")
        next();
    else
        res.redirect('/404');
};