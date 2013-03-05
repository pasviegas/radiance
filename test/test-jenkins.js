var jenkins     = require('../lib-cov/sources/jenkins')
var assert      = require('assert')
var mockJenkins = require('./mock/mockjenkins')

describe('Jenkins', function(){
  it('should return 0', function(done){
    jenkins.get("http://s028:8080/job/red/api/json", function(data){
      assert.equal(0, jenkins.numberize(data));
      done();
    })
  })
  it('should return 1', function(done){
    jenkins.get("http://s028:8080/job/yellow/api/json", function(data){
      assert.equal(1, jenkins.numberize(data));
      done();
    })
  })    
  it('should return 2', function(done){
    jenkins.get("http://s028:8080/job/green/api/json", function(data){
      assert.equal(2, jenkins.numberize(data));
      done();
    })
  })
})