var nock = require("nock");
var _ = require("underscore");
var config = require("./mockconfig");
var red = {color: "red"};
var coverageRed = [{msr: [{val: 0}]}];

var yellow = {color: "yellow"};

var green = {color: "blue"};
var travisGreen = {last_build_status: 0};
var coverageGreen = [{msr: [{val: 100}]}];

var fakeRequests = function(){
	nock('http://s028:8080')
  		.get('/job/tnt-radar/api/json')
  		.reply(200, red, {'content-type': 'application/json; charset=utf-8'});	

 	nock('http://s028:9000')
 		.get('/api/resources?resource=br.com.tnt:tnt-radar&amp;metrics=coverage')
  		.reply(200, coverageGreen, {'content-type': 'application/json; charset=utf-8'});

	nock('http://s028:9000')
		.get('/api/resources?resource=br.com.tnt:tnt-radar&amp;metrics=violations_density')
  		.reply(200, coverageGreen, {'content-type': 'application/json; charset=utf-8'});	

	nock('http://s028:8080')
  		.get('/job/tnt-core/api/json')
  		.reply(200, green, {'content-type': 'application/json; charset=utf-8'});

	nock('http://s028:9000')
		.get('/api/resources?resource=br.com.tnt:tnt-core&amp;metrics=coverage')
  		.reply(200, coverageGreen, {'content-type': 'application/json; charset=utf-8'});

  	nock('http://s028:9000')
  		.get('/api/resources?resource=br.com.tnt:tnt-core&amp;metrics=violations_density')
  		.reply(200, coverageGreen, {'content-type': 'application/json; charset=utf-8'});		

  	nock('http://s028:8080')
  		.get('/job/badesul-caa/api/json')
  		.reply(200, red, {'content-type': 'application/json; charset=utf-8'});

	nock('http://s028:9000')
		.get('/api/resources?resource=br.com.badesul:badesul-caa&amp;metrics=coverage')
  		.reply(200, coverageRed, {'content-type': 'application/json; charset=utf-8'});	

	nock('http://s028:9000')
		.get('/api/resources?resource=br.com.badesul:badesul-caa&amp;metrics=violations_density')
  		.reply(200, coverageRed, {'content-type': 'application/json; charset=utf-8'});	

  	nock('http://s028:8080')
  		.get('/job/badesul-crr/api/json')
  		.reply(200, red, {'content-type': 'application/json; charset=utf-8'});

	nock('http://s028:9000')
		.get('/api/resources?resource=br.com.badesul:badesul-crr&amp;metrics=coverage')
  		.reply(200, coverageGreen, {'content-type': 'application/json; charset=utf-8'});	

  	nock('http://s028:8080')
  		.get('/job/badesul-sca/api/json')
  		.reply(200, green, {'content-type': 'application/json; charset=utf-8'});

	nock('http://s028:9000')
		.get('/api/resources?resource=br.com.badesul:badesul-sca&amp;metrics=coverage')
  		.reply(200, coverageRed, {'content-type': 'application/json; charset=utf-8'});		

	nock('https://api.travis-ci.org')
		.get('/repos/pasviegas/radiance.json')
  		.reply(200, travisGreen, {'content-type': 'application/json; charset=utf-8'});		  		
}

var tntradar 	= config.radiator("tnt-radar", "br.com.tnt:tnt-radar");
var tntcore 	= config.radiator("tnt-core", "br.com.tnt:tnt-core");
var badesulcaa 	= config.radiator("badesul-caa", "br.com.badesul:badesul-caa");

var mockPage = {
	name: "cwi - java",
	radiators: [
		tntradar,
		tntcore,
		badesulcaa,
	{
		name: "badesul-crr",
		metrics: [{
				name: "build",
				from: "http://s028:8080/job/badesul-crr/api/json",
				source: "jenkins",
				threshold: "100",
			},{
				name: "coverage",
				from: "http://s028:9000/api/resources?resource=br.com.badesul:badesul-crr&amp;metrics=coverage",
				source: "sonar",
				threshold: "40",
			}]
	},{
		name: "badesul-sca",
		metrics: [{
				name: "build",
				from: "http://s028:8080/job/badesul-sca/api/json",
				source: "jenkins",
				threshold: "100",
			},{
				name: "coverage",
				from: "http://s028:9000/api/resources?resource=br.com.badesul:badesul-sca&amp;metrics=coverage",
				source: "sonar",
				threshold: "40",
			}]
	},{
		name: "radiance",
		metrics: [{
				name: "build",
				from: "https://api.travis-ci.org/repos/pasviegas/radiance.json",
				source: "travis",
				threshold: "100",
			}]
	}]
};

module.exports = _.clone(mockPage);
module.exports.fakeRequests = fakeRequests;
