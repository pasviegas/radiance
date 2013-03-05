var page      = require('../lib-cov/page')
var assert    = require('assert')
var mockpage  = require('./mock/mockpage')

describe('Page model', function(){
  it('should save a page', function(done){
    var newPage = page.create(mockpage);
    newPage.save(done);
  })
  it('should find a page', function(done){
    var newPage = page.create(mockpage);
    newPage.save(function(){
      page.find({name: mockpage.name}, function(err, docs){
        assert.equal(mockpage.name, docs[0].name)
        done();
      });
    })
  })    
  afterEach(function(done){
    page.remove({}, function() {
      done();
    });
  });
})