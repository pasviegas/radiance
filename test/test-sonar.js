var sonar     = require('../lib/sources/sonar')
var assert      = require('assert')
var mocksonar = require('./mock/mocksonar')

describe('Sonar coverage', function(){
  it('should return 0', function(done){
    sonar.get("http://s028:9000/api/resources?resource=zero&amp;metrics=coverage", function(data){
      assert.equal(0, sonar.numberize(data, 40));
      done();
    })
  })
  it('should return 1', function(done){
    sonar.get("http://s028:9000/api/resources?resource=one&amp;metrics=coverage", function(data){
      assert.equal(1, sonar.numberize(data, 40));
      done();
    })
  })
  it('should return 2', function(done){
    sonar.get("http://s028:9000/api/resources?resource=two&amp;metrics=coverage", function(data){
      assert.equal(2, sonar.numberize(data, 40));
      done();
    })
  })    
})

describe('Sonar violations', function(){
  it('should return 0', function(done){
    sonar.get("http://s028:9000/api/resources?resource=zero&amp;metrics=violations_density", function(data){
      assert.equal(0, sonar.numberize(data, 40));
      done();
    })
  })
  it('should return 1', function(done){
    sonar.get("http://s028:9000/api/resources?resource=one&amp;metrics=violations_density", function(data){
      assert.equal(1, sonar.numberize(data, 40));
      done();
    })
  })
  it('should return 2', function(done){
    sonar.get("http://s028:9000/api/resources?resource=two&amp;metrics=violations_density", function(data){
      assert.equal(2, sonar.numberize(data, 40));
      done();
    })
  })  
})