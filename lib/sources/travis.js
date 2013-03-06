var rest = require('restler');
// Constructor
var Travis = function() {

};
// properties and methods
Travis.prototype = {
  get: function(url, callback) {
    rest.get(url).on('complete', callback);
  },
  numberize: function(data, threshold){
    var number  = (0 === data.last_build_status) ? 2 : 0;
    return number;
  }
};
// node.js module export
module.exports = new Travis();