var models = require('../models');
var check = require('./check');

module.exports = function(app){
    app.get('/', function(req, res){
        res.render('index', { 
             title: '首页'
        });
    });
    
    app.get('/articles/:id',function(req, res){
        models.index_articles(req,res);
    });
    
    /* 用户信息路由 */
    app.get('/reg', check.checkNotLogin);
    app.get('/reg', function(req, res){
        res.render('user/reg',{
            title:'注册'
        });
    });
    app.post('/reg', function(req, res){
        models.reg(req,res);
    });
    
    app.get('/login',check.checkNotLogin);
    app.get('/login',function(req, res){
        res.render('user/login',{
            title:'登录'
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
    
    app.get('/post',check.checkLogin);
    app.get('/post',function(req,res){
        res.render('articles/post',{
            title:'提交文档'
        });
    });
    app.post('/post',check.checkManagerLogin);
    app.post('/post',function(req,res){
        models.post_article(req,res);
    });
    
    app.get('/404',function(req,res){
        res.render('error/404',{
            title:'Not Found'
        });
    });
    
    app.get('/article/:post_id',function(req,res){
        models.get_article(req.params.post_id,req,res);
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
    
 	app.get('/postmd',function(req,res){
        res.render('articles/post_md',{
            title:'上传Markdown文件',
        });
    });
    app.post('/postmd',function(req,res){
        models.post_marked(req,res);
    });
    
    app.get('/document',function(req,res){
        models.get_docuemt(req,res);
    });
  
};
