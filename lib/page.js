var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/radiator');

var pageJson = {
  name: "string",
  radiators: [{
    name: "string",
    metrics: [{
      name: "string",
      from: "string",
      source: "string",
      threshold: "number"
    }]
  }]
};

var pageSchema = mongoose.Schema(pageJson);
var Page = mongoose.model('Page', pageSchema);


var PageFactory = function() {};

PageFactory.prototype = {
  create: function(o) {
    return new Page(o);
  },
  find: function(o, callback) {
    return Page.find(o, callback);
  },
  remove: function(o, callback) {
    return Page.remove(o, callback);
  }
};

// node.js module export
module.exports = new PageFactory();