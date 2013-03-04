var request = require('supertest')
var app     = require('../lib/app')
var assert = require('assert')
var mockpage = require('./mock/mockpage')
var page     = require('../lib/page')

describe('POST /page/add', function(){
  it('should add new page and redirect', function(done){
    mockpage.fakeRequests();
    request(app).post('/page/add')
                .send(mockpage)
                .expect(200)
                .end(function(err, res){
                  assert.equal("/"+mockpage.name+".html", res.header["location"])
                  done();
                });  
  })    
})

describe('GET /page/refresh', function(){
  it('should update a page', function(done){
    mockpage.fakeRequests();
    var newPage = page.create(mockpage);
    newPage.save(function(){
      request(app).get('/page/refresh/'+mockpage.name).expect(200, done);
    })
  })    
})

describe('GET /page/delete', function(){
  it('should delete a page', function(done){
      request(app).get('/page/delete/'+mockpage.name).expect(200, done);
  })    
})

describe('GET /page/:name/json', function(){
  it('should return the page json', function(done){
    mockpage.fakeRequests();
    var newPage = page.create(mockpage);
    newPage.save(function(){
      request(app).get('/page/' + mockpage.name + "/json").expect(200)
      .end(function(err, res){
        assert.equal(mockpage.name, res.body.name)
        done();
      });  
    })
  })
})