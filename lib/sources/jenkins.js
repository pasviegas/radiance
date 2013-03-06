var rest = require('restler');
// Constructor
var Jenkins = function() {

};
// properties and methods
Jenkins.prototype = {
  get: function(url, callback) {
    rest.get(url).on('complete', callback);
  },
  numberize: function(data, threshold, lastNumber){
    var number = (data.color === "red") ? 0 : number;
        number = (data.color === "yellow") ? 1 : number;
        number = (data.color === "blue") ? 2 : number;
        number = (lastNumber) ? (number+lastNumber)/ 2 : number;
    return number;
  }
};
// node.js module export
module.exports = new Jenkins();