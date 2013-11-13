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
    
    app.get('/reg', check.checkNotLogin);
    app.get('/reg', function(req, res){
        res.render('reg',{
            title:'注册'
        });
    });
    app.post('/reg', function(req, res){
        models.reg(req,res);
    });
    
    app.get('/login',check.checkNotLogin);
    app.get('/login',function(req, res){
        res.render('login',{
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
        res.render('post',{
            title:'提交文档'
        });
    });
    app.post('/post',check.checkLogin);
    app.post('/post',function(req,res){
        models.post_article(req,res);
    });
    
    app.get('/404',function(req,res){
        res.render('404',{
            title:'Not Found'
        });
    });
    
    app.get('/article/:post_id',function(req,res){
        models.get_article(req.params.post_id,req,res);
    });
    
    app.get('/admin',check.checkLogin);
    app.get('/admin',function(req,res){
        models.get_admin(req,res);
    });
    app.post('/admin',check.checkLogin);
    app.post('/admin',function(req,res){
        models.post_admin(req,res);
    });
    app.put('/admin',check.checkLogin);
    app.put('/admin',function(req,res){
        models.put_admin(req,res);
    });
    app.del('/admin',check.checkLogin);
    app.del('/admin',function(req,res){
        models.del_admin(req,res);
    });
    
    app.get('/document',function(req,res){
        models.get_docuemt(req,res);
    });
  
};