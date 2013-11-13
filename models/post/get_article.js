var Post = require('./Post');

module.exports = function(id,req,res){
    var query = {
        postId:parseInt(id)
    };
    Post.getOne("post_articles",query,function(err,doc){
        if(err) throw err;
        if(doc){
            var localtime = doc.time;
            var article_state = doc.article_state;
            res.render('article',{
                title:doc.title,
                content:doc.content,
                author:doc.user,
                time:localtime,
            });
        }else{
            return res.redirect('/404');
        }
    });
};