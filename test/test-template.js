var template  = require('../lib/template')
var assert  = require('assert')
var mockpage = require('./mock/mockpage')

describe('Template', function(){
  it('should return 1 cause', function(done){
    console.log(mockpage.radiators[0])
    var causes = template.causes(mockpage.radiators[0]);
    assert.equal(1, causes.length);
    done();
  })
  it('should be reduced to 1', function(done){
    var reduced = template.reduce(mockpage.radiators[0]);
    assert.equal(1, reduced);
    done();
  })
  it('should return color yellow', function(done){
    var status = template.status(mockpage.radiators[0]);
    assert.equal("problem", status);
    done();
  })
})