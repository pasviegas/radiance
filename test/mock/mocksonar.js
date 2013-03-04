var nock = require("nock");
var violationsRed = [{msr: [{val: 0}]}];
var violationsYellow = [{msr: [{val: 38}]}];
var violationsGreen = [{msr: [{val: 80}]}];

var coverageRed = [{msr: [{val: 0}]}];
var coverageYellow = [{msr: [{val: 38}]}];
var coverageGreen = [{msr: [{val: 80}]}];

var scope = nock('http://s028:9000');

scope.get('/api/resources?resource=zero&amp;metrics=violations_density')
  .reply(200, violationsRed, {'content-type': 'application/json; charset=utf-8'});

scope.get('/api/resources?resource=zero&amp;metrics=coverage')
  .reply(200, coverageRed, {'content-type': 'application/json; charset=utf-8'});

scope.get('/api/resources?resource=one&amp;metrics=violations_density')
  .reply(200, violationsYellow, {'content-type': 'application/json; charset=utf-8'});

scope.get('/api/resources?resource=one&amp;metrics=coverage')
  .reply(200, coverageYellow, {'content-type': 'application/json; charset=utf-8'});

scope.get('/api/resources?resource=two&amp;metrics=violations_density')
  .reply(200, violationsGreen, {'content-type': 'application/json; charset=utf-8'});

scope.get('/api/resources?resource=two&amp;metrics=coverage')
  .reply(200, coverageGreen, {'content-type': 'application/json; charset=utf-8'});

