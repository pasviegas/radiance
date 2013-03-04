var engine  = require('../lib/engine')
var fs      = require('fs')
var assert  = require('assert')
var jquery = require("jquery");
var jsdom  = require('jsdom')
var mockpage = require('./mock/mockpage')

describe('Engine', function(){

  var template = fs.readFileSync("./test/mock/mockpage.html").toString();

  it('should write a page', function(done){
    mockpage.fakeRequests();
    engine.writePage(mockpage, function(){
      jsdom.env({
        html: fs.readFileSync("./lib/pages/" + mockpage.name + ".html").toString(),
        done: function (errors, window) {
          var $ = jquery.create(window);
          done();
        }
      });
    });
  })
})