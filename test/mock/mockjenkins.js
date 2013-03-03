var nock = require("nock");
var red = {color: "red"};
var yellow = {color: "yellow"};
var blue = {color: "blue"};

nock('http://s028:8080')
  .get('/job/red/api/json')
  .reply(200, red, {'content-type': 'application/json; charset=utf-8'});

nock('http://s028:8080')
  .get('/job/yellow/api/json')
  .reply(200, yellow, {'content-type': 'application/json; charset=utf-8'});

 nock('http://s028:8080')
  .get('/job/green/api/json')
  .reply(200, blue, {'content-type': 'application/json; charset=utf-8'});


