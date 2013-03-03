var fs = require('fs');
var flow = require('flow');
var _ = require('underscore');
var template = require('./template');

var pagesDir    = __dirname + "/pages/";
var sourcesDir  = __dirname + "/sources/";
// Constructor
var Engine = function() {
  
}
// properties and methods
Engine.prototype = {
  deletePages: function(callback) {
    fs.readdir(pagesDir, function(err, files) {
      _.each(files, Engine.prototype.deletePageSync);
      callback();
    });
  },
  deletePageSync: function(file){
    var stats = fs.statSync(pagesDir + file);
    if(stats.isFile()){
      fs.unlinkSync(pagesDir + file);
    }
  },
  deletePage: function(file, callback){
    var stats = fs.stat(pagesDir + file, function(err, stats){
      if(stats.isFile()){
        fs.unlink(pagesDir + file, callback);
      }
    });
  },
  writePage: function(o, callback){
    Engine.prototype.refreshResults(o, function(){
      fs.writeFileSync(pagesDir + o.name + ".html", template.html(o))
      if(callback) callback();
    });
  },
  refreshResults: function(o, callback){
    syncArray(o.radiators, function(rad, irad, nextRad){
      syncArray(rad.metrics, function(met, imet, next){
        var source = require(sourcesDir+met.source);
        source.get(met.from, function(data) {
          met.result = source.numberize(data, met.threshold);
          next();
        }); 
      }, nextRad);
    }, callback)
  }
};

var syncArray = function(arr, fn, callback){
  var calls = _.map(arr, function(val, index){
    return function(){
      fn(val, index, this);
    };
  })
  if(callback) calls.push(callback);
  flow.exec.apply(flow.exec, calls);
}




// node.js module export
module.exports = new Engine();