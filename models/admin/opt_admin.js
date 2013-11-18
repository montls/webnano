var Admin = require('./Admin');

module.exports = function(req,res){
    if(req.query.opt == 'power_m'){
        var query = {name:req.query.q_user};
        var sort = [['time',1]];
        if(req.query.power > 0 && req.query.power != 11){
            var update_doc = {$inc:{power:-1}};
            Admin.findAndModify('users',query,sort,update_doc,function(err,doc){
                if(err) return console.log(err);
            });
        }
        res.redirect('/admin/user');
    }
    else if(req.query.opt == 'power_p'){
        var query = {name:req.query.q_user};
        var sort = [['time',1]];
        if(req.query.power < 4 && req.query.power != 11){
            var update_doc = {$inc:{power:1}};
            Admin.findAndModify('users',query,sort,update_doc,function(err,doc){
                if(err) return console.log(err);
            });
        }
        res.redirect('/admin/user');
    }
    else if(req.query.opt == 'article_p'){
        var query = {postId:parseInt(req.query.q_postId)}; //req 全为字符串 ！！！！！！！！！！！！ funk js
        var sort = [['time',1]];
        if(req.query.state < 10){
            var update_doc = {$inc:{article_state:1}};
            console.log(update_doc);
            Admin.findAndModify('articles',query,sort,update_doc,function(err,doc){
                if(err) return console.log(err);
            });
            Admin.findAndModify('article_infos',query,sort,update_doc,function(err,doc){
                if(err) return console.log(err);
            });
        }
        res.redirect('/admin/articles');    
    }
    else if(req.query.opt == 'article_m'){
        var query = {postId:parseInt(req.query.q_postId)};
        var sort = [['time',1]];
        if(req.query.state > 1){
            var update_doc = {$inc:{article_state:-1}};
            Admin.findAndModify('articles',query,sort,update_doc,function(err,doc){
                if(err) return console.log(err);
            });
            Admin.findAndModify('article_infos',query,sort,update_doc,function(err,doc){
                if(err) return console.log(err);
            });
        }
        res.redirect('/admin/articles');      
    }
}