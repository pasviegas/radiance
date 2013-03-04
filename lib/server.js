var page = require('./page');
var engine = require('./engine');
var server = require('./app');
var _ = require('underscore');


engine.deletePages(function(){
	page.find({}, function(err, docs){
		_.each(docs, function(doc){
			engine.writePage(doc);
		});
		server.listen(3000);
	})
})