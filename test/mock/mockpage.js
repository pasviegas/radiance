var nock = require("nock");
var red = {color: "red"};
var coverageRed = [{msr: [{val: 0}]}];

var green = {color: "blue"};
var coverageGreen = [{msr: [{val: 100}]}];

var fakeRequests = function(){
	nock('http://s028:8080')
  		.get('/job/tnt-radar/api/json')
  		.reply(200, red, {'content-type': 'application/json; charset=utf-8'});	
 	nock('http://s028:9000').get('/api/resources?resource=br.com.tnt:tnt-radar&amp;metrics=coverage')
  		.reply(200, coverageGreen, {'content-type': 'application/json; charset=utf-8'});

	nock('http://s028:8080')
  		.get('/job/tnt-core/api/json')
  		.reply(200, green, {'content-type': 'application/json; charset=utf-8'});

	nock('http://s028:9000').get('/api/resources?resource=br.com.tnt:tnt-core&amp;metrics=coverage')
  		.reply(200, coverageGreen, {'content-type': 'application/json; charset=utf-8'});
}

var mockPage = {
	name: "tnt",
	radiators: [{
		name: "tnt-radar",
		metrics: [{
				name: "build",
				from: "http://s028:8080/job/tnt-radar/api/json",
				source: "jenkins",
				threshold: "100",
			},{
				name: "coverage",
				from: "http://s028:9000/api/resources?resource=br.com.tnt:tnt-radar&amp;metrics=coverage",
				source: "sonar",
				threshold: "40",
			}]
	},{
		name: "tnt-core",
		metrics: [{
				name: "build",
				from: "http://s028:8080/job/tnt-core/api/json",
				source: "jenkins",
				threshold: "100",
			},{
				name: "coverage",
				from: "http://s028:9000/api/resources?resource=br.com.tnt:tnt-core&amp;metrics=coverage",
				source: "sonar",
				threshold: "40",
			}]
	}],
};

module.exports = mockPage;
module.exports.fakeRequests = fakeRequests;
