var Post = require('./Post');

module.exports = function(req,res){
    var _each_page_count = 10;
    
    var q_id = parseInt(req.params.id) || 1;
    Post.count("post_articles",{},function(err,n){
        req.session._q_count = n;
    });
    
    Post.get("post_articles",{postId:{$gte:(q_id-1)*10}},function(err,cursor){
        cursor.limit(_each_page_count).sort({time:-1}).toArray(function(err,docs){
            res.render("index_articles",{
                title:'文章',
                post_list:docs,
                n_sum:''+q_id+'.'+Math.ceil((req.session._q_count)/10)
            });
        });
    });
};
                   