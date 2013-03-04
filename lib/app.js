
var page = require('./page');
var express = require('express');
var engine = require('./engine');
var app = express();

app.use(express.bodyParser());
app.use("/", express.static(__dirname + '/pages'));

app.post('/page/add', function(req, res){
	var newPage = page.create(req.body);
	newPage.save(function(){
		engine.writePage(newPage, function(){
			res.redirect("/"+ req.body.name + ".html");
		})
	});
});

app.get('/page/refresh/:name', function(req, res){
	page.find({name: req.params.name }, function(err, docs){
		engine.writePage(docs[0], function(){
			res.end();
		})
	})
});

app.get('/page/delete/:name', function(req, res){
	engine.deletePage(req.params.name + ".html", function (err) {
		page.find({name: req.params.name }).remove();
  		res.end('Page deleted!');
	});
});

app.get('/page/:name/json', function(req, res){
	page.find({name: req.params.name }, function(err, docs){
		res.send(docs[0]);
		res.end();
	})
});

module.exports = app;