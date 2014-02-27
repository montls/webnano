var Document = require('./Document');

module.exports = function(id,req,res){
    var query = {
        postId:parseInt(id)
    };
    Document.getOne("articles",query,function(err,doc){
        if(err) throw err;
        if(doc){
            var localtime = new Date(doc.time);
            var article_state = doc.article_state;
            res.render('articles/article',{
                title:doc.title,
                content:doc.content,
                author:doc.user,
                time:localtime.toLocaleString(),
                post_label:doc.label,
                status:doc.article_state,
                catalog:doc.catalog
            });
        }else{
            return res.redirect('/404');
        }
    });
};