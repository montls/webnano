var fs = require('fs');
var marked = require("marked");
var util = require('util');

var Post = require('./Post');
var st = require('../../settings');

module.exports = function(req,res){
    if(req.files && ((typeof req.session.user) != 'undefined') ){
        //post 文件和标题
        var currentUser = req.session.user;
    	if(req.files.file.originalFilename == ""){
       	 	req.flash("md_error", "上传文件名不能为空");
        	return res.redirect('/postmd');
    	}
        Post.count('article_infos',{},function(err,n){
            if(err) return console.log(err);
        	req.session.postId = n;
    	});
        
        ////储存文件信息
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
        
        //设置格式转换信息
        marked.setOptions({
            renderer: new marked.Renderer(),
            gfm: true,
            tables: true,
            breaks: false,
            pedantic: false,
            sanitize: true,
            smartLists: true,
            smartypants: false,
            highlight: function (code, lang, callback) {
                    require('pygmentize-bundled')({ lang: lang, format: 'html' }, code, function (err, result) {
                            callback(err, result.toString());
                    });
                    }
        });

        var post_filename = st.rootDir+req.files.file.path;
        fs.readFile(post_filename,function(err,data){
            if(err){ 
                req.flash("md_error", "上传文件名错误");
                return res.redirect('/postmd');
            }
            marked(data.toString(),
                function(err,stdout){
                    if(err){
                        return console.log(err);
                        req.flash('md_error','markdown 解析错误');
                        return res.redirect('/postmd');
                    }
                    ////储存文章信息
                    //分割label_string成list
                    var label_list = req.body.label_str.split(';');
                    
                    var update_article_info = {
                        user:req.session.user,
                        title:req.body.md_title||req.files.file.originalFilename.split(".")[0],
                        time:create_time,
                        postId:req.session.postId,
                        article_state:1,
                        catalog:req.body.md_catalog,
                        label:label_list || [] //client send
                    }
                    Post.save('article_infos',update_article_info,function(err){
                        if(err) return console.log(err);
                    });
                    
                    ////储存文章
                    var update_article = {
                        user:req.session.user,
                        title:req.body.md_title||req.files.file.originalFilename.split(".")[0],
                        time:create_time,
                        postId:req.session.postId,
                        article_state:1,
                        label:label_list || [],
                        catalog:req.body.md_catalog,
                        content:stdout
                    }
                    Post.save('articles',update_article,function(err){
                        if(err) return console.log(err);
                        req.flash("md_success","上传文件成功");
                        return res.redirect('/postmd');
                    });
            });
        });
    }
    else{
        //什么都没添
        if((typeof req.session.user) == 'undefined'){
            req.flash("md_error", "权限不足");
            res.redirect('/postmd');
            return;
        }
        if(!req.file){
            req.flash("md_error", "未添加文件");
            res.redirect('/postmd');
            return;
        }
        
    }
}