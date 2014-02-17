var reg = require('./user/reg');
var login = require('./user/longin');
exports.reg = reg;
exports.login = login;

//var post_article = require('./post/post_article');
//var post_md = require('./post/post_md');
var post_marked = require('./post/post_marked');
//exports.post_article = post_article;
//exports.post_md = post_md;
exports.post_marked = post_marked;

var get_admin = require('./admin/get_admin');
var opt_admin = require('./admin/opt_admin');
exports.get_admin = get_admin;
exports.opt_admin = opt_admin;

var get_article = require('./document/get_article');
var index_articles = require('./document/index_articles');
exports.get_article = get_article;
exports.index_articles = index_articles;