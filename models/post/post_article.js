var Post = require('./Post');
var fs = require('fs');

module.exports = function(req,res){
    var currentUser = req.session.user;
    if(req.files.file.originalFilename == ""){
        req.flash('error','上传文件不能为空')
        return res.redirect('/post');
    }
    Post.count('post_articles',{},function(err,n){
        req.session.postId = n;
    });
    var create_time = new Date();
    var post_file = {
        user:req.session.user,
        file:req.files,
        time:create_time,
        post_id:req.session.post_id
    }
    
    Post.save('post_files',post_file,function(err,file){ //先向post_files集合中存入文件信息
        if(err){
            req.flash('error',err);
            return res.redirect('/');
        }
        fs.readFile(req.files.file.path,"utf-8",function(err,mark_docs){
            var post_article = {
                user:req.session.user,
                title:req.files.file.originalFilename.split(".")[0],
                time:create_time,
                postId:req.session.postId,
                article_state:req.session.modified_article_state,
                description:req.body.description || [],
                content:mark_docs
            }
            Post.save('post_articles',post_article,function(err,docs){ //继续向post_articles集合中存入文档
                return res.redirect('/article/'+req.session.postId);
            });
        });
    });
};

