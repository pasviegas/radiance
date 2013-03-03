var page = require('./page');
var engine = require('./engine');
var server = require('./app');
var mock = require('../test/mock/mockpage');
var _ = require('underscore');

mock.fakeRequests();

page.remove({}, function() {
	page.create(mock).save(function(){
		engine.deletePages(function(){
			page.find({}, function(err, docs){
				_.each(docs, function(doc){
					engine.writePage(doc);
				});
				server.listen(3000);
			})
		})
	})
});

