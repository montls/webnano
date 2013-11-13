var reg = require('./user/reg');
var login = require('./user/longin');
var post_article = require('./post/post_article');
var get_article = require('./post/get_article');
var index_articles = require('./post/index_articles');


exports.reg = reg;
exports.login = login;
exports.post_article = post_article;
exports.get_article = get_article;
exports.index_articles = index_articles;