var fs = require('fs');
var Post = require('./Post');
var exec = require('child_process').exec;

module.exports = function(req,res){
    if(req.files){
        //post 文件和标题
        var currentUser = req.session.user;
    	if(req.files.file.originalFilename == ""){
       	 	req.flash('error','上传文件不能为空');
            delete req.session.label_dir;
        	return res.redirect('/postmd');
    	}
        Post.count('article_infos',{},function(err,n){
        	req.session.postId = n;
    	});
        var create_time = new Date();
        var post_file = { //post文件信息
            user:req.session.user,
            file:req.files,
            time:create_time,
            post_id:req.session.postId
        }
        Post.save('post_files',post_file,function(err,file){
            if(err) return console.log(err);
        });
        exec('python ../../python/md.py ../../'+req.files.file.path+" "+req.body.md_options,function(err,stdout,stderr){
           	console.log(stdout);
            if(stderr || err){
                return console.log(stderr);
            }
            var update_article_info = {
                user:req.session.user,
                title:req.body.md_title||req.files.file.originalFilename.split(".")[0],
                time:create_time,
                postId:req.session.postId,
                article_state:1,
                catalog:req.body.md_catalog,
                label:req.body.label_dir || []
            }
            Post.save('article_infos',update_article_info,function(err){
                if(err) return console.log(err);
            });
            var update_article = {
                user:req.session.user,
                title:req.body.md_title||req.files.file.originalFilename.split(".")[0],
                time:create_time,
                postId:req.session.postId,
                article_state:1,
                label:req.body.label_dir || [],
                catalog:req.body.md_catalog,
                content:stdout
            }
            Post.save('articles',update_article,function(err){
                if(err) return console.log(err);
            });
        });
    }
    else{
        //什么都没添
        req.flash('error','请填写数据');
        res.redirect('/postmd');
    }
}