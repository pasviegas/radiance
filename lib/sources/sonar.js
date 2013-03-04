var rest = require('restler');
// Constructor
var Sonar = function() {
  
}
// properties and methods
Sonar.prototype = {
  get: function(url, callback) {
  	rest.get(url).on('complete', callback);
  },
  numberize: function(data, threshold, lastNumber){
    var val = data[0].msr[0].val;
  	var number  = (val >= threshold) ? 2 : number;
        number  = (val <  threshold) ? 1 : number;
        number  = (val <= (threshold * 0.8)) ? 0 : number;
  		  
        number  = (lastNumber) ? (number+lastNumber)/ 2 : number;
  	return number;
  }
};
// node.js module export
module.exports = new Sonar();