var reg = require('./user/reg');
var login = require('./user/longin');
exports.reg = reg;
exports.login = login;

var post_article = require('./post/post_article');
var get_article = require('./post/get_article');
var index_articles = require('./post/index_articles');
var post_md = require('./post/post_md');
exports.post_article = post_article;
exports.get_article = get_article;
exports.index_articles = index_articles;
exports.post_md = post_md;

var get_admin = require('./admin/get_admin');
var opt_admin = require('./admin/opt_admin');
exports.get_admin = get_admin;
exports.opt_admin = opt_admin;
