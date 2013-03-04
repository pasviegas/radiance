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
  it('should delete all pages', function(done){
    fs.writeFileSync("./lib/pages/mockPage.html", template);
    engine.deletePages(function(){
      fs.readdir("./lib/pages/", function(err, files) {
        assert.equal(1, files.length);
        done();
      });
    });
  })
})