var Admin = require('./Admin');
var fs = require('fs');

var g_collname_list = [];
var g_req , g_res;
var g_result = []
var g_db_status = [];
var g_db_info = [];

module.exports = function(req,res){
    if(req.params.info == "index"){
        res.render('admin/admin_index',{
            title:"admin",
            layout:'admin_layout'
        });
    }
    else if(req.params.info == "user"){
        var query = {};
        Admin.getAllCursor('users',query,function(err,cursor){
            cursor.sort({user:1}).toArray(function(err,user_list){
                if(err) return console.log(err);
                res.render('admin/admin_user',{
                    title:"用户管理",
                    layout:'admin_layout',
                    header:"用户信息表",
                    user_list:user_list,
                    length:user_list.length
                });
            });
        });
	}
    else if(req.params.info == "articles"){
        var query = {};
        Admin.getAllCursor('article_infos',query,function(err,cursor){
            cursor.sort({postId:1}).toArray(function(err,doc_list){
                if(err) return console.log(err);
                res.render("admin/admin_articles",{
                    title:"文章管理",
                    layout:'admin_layout',
                    header:"文章信息表",
                    doc_list:doc_list,
                    length:doc_list.length
                });
            });
        });
    }
    else if(req.params.info == 'dbs'){
        var query = {}
        Admin.getDbInfo(function(err,db_info){
            g_db_info = db_info;
            Admin.getDbStatus(function(err,db_status){
                g_db_status = db_status;
            	Admin.getCollectionsInfo(function(err,colls_cursor){
                    colls_cursor.toArray(function(err,colls_info){
                        g_collname_list = [];
                        g_result = [];
                        for(i in colls_info){
                            var name = colls_info[i].name;
                            var name_list = name.split('.');
                            if(name_list[2])
                                continue;
                            g_collname_list.push(name_list[1]);
                        }
                        g_req = req;
                        g_res = res;
                        _getCollStat(0);
                    });
                });
            });
        });
    }
    
};

                        
function _getCollStat(i){
    Admin.db.collection(g_collname_list[i],function(err,collection){
        if(err) return console.log(err);
        collection.stats(function(err,coll_stat_info){
            if(err) return console.log(err);
            g_result.push(coll_stat_info);
            if(g_collname_list[i+1]){
                _getCollStat(i+1);
            }
            else{
               	g_res.render('admin/admin_dbs',{
                    title:'数据库控制台',
                    header:'数据库信息',
                    collname_list:g_collname_list,
                    db_status:g_db_status,
                    db_info:g_db_info,
                    colls_info:g_result,
                    layout:'admin_layout'
                });
            }
        });
    });
};