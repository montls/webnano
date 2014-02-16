var Document = require('./Document');

module.exports = function(req,res){
    var _each_page_count = 10;
    
    var q_id = parseInt(req.params.id) || 1;
    Document.count("article_infos",{},function(err,n){
        req.session._q_count = n;
    });
    Document.get("article_infos",{postId:{$gte:(q_id-1)*10}},function(err,cursor){
        cursor.limit(_each_page_count).sort({time:-1}).toArray(function(err,docs){
            res.render("articles/index_articles",{
                title:'文章',
                post_list:docs,
                n_sum:''+q_id+'.'+Math.ceil((req.session._q_count)/10),
            });
        });
    });
};
                   