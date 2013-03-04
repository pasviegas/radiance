var rest = require('restler');
// Constructor
var Travis = function() {
  
}
// properties and methods
Travis.prototype = {
  get: function(url, callback) {
  	rest.get(url).on('complete', callback);
  },
  numberize: function(data, threshold, lastNumber){
  	var number  = (0 == data.lastBuildStatus) ? 2 : 0;
  	return number;
  }
};
// node.js module export
module.exports = new Travis();