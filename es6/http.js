var http = require('http');
var cheerio = require('cheerio');

var url = 'http://www.cnblogs.com/imwtr/p/4398652.html';
var $ = cheerio.load('<h2 class="title">Hello World!</h2>');

debugger;
console.log($('h2.title').text());

http.get(url, function(res){
	console.log(res);
});