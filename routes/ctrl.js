var models = require('../models');
var check = require('./check');

module.exports = function(app){
    app.get('/', function(req, res){
        res.render('index', { 
             title: '首页'
        });
    });
    
    /* 用户信息路由 */
    app.get('/reg', check.checkNotLogin);
    app.get('/reg', function(req, res){
        res.render('user/reg',{
            title:'注册',
            reg_error: req.flash("reg_error"),
            reg_success: req.flash("reg_success")
        });
    });
    app.post('/reg', function(req, res){
        models.reg(req,res);
    });
    
    app.get('/login',check.checkNotLogin);
    app.get('/login',function(req, res){
        res.render('user/login',{
            title:'登录',
            login_error: req.flash("login_error")
        });
    });
    app.post('/login',function(req,res){
        models.login(req,res);
    });
    
    app.get('/logout',check.checkLogin);
    app.get('/logout',function(req, res){
        req.session.user=null;
        res.redirect('/');
    });
    
    app.get('/article/:post_id',function(req,res){
        models.get_article(req.params.post_id,req,res);
    });
    app.get('/articles/:id',function(req, res){
        models.index_articles(req,res);
    });
    
    /* 后台路由 */
    app.get('/admin/:info',check.checkLogin);
    app.get('/admin/:info',function(req,res){
        models.get_admin(req,res);
    });
    app.post('/admin/:info',check.checkLogin);
    app.post('/admin/:info',function(req,res){
        models.post_admin(req,res);
    });
    
    app.get('/adminopt',check.checkManagerLogin);
    app.get('/adminopt',function(req,res){
        models.opt_admin(req,res);
    });
    
    //提交路由
    app.get('/postmd',check.checkManagerLogin);
 	app.get('/postmd',function(req,res){
        res.render('articles/post_md',{
            title:'上传Markdown文件',
            md_error:req.flash("md_error"), 
            md_success:req.flash("md_success")
        });
    });
    app.post('/postmd',check.checkManagerLogin);
    app.post('/postmd',function(req,res){
        models.post_marked(req,res)
    });
    
    app.get('/document',function(req,res){
        models.get_docuemt(req,res);
    });
    
    //辅助页面
    app.get('/404',function(req,res){
        res.render('error/404',{
            title:'Not Found'
        });
    });
  
};
