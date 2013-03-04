var util = require("util");
var _ = require("underscore");

var page = "<html><head><title>Radiance - %s</title><meta http-equiv='refresh' content='3'/><link rel='stylesheet' href='style/style.css' type='text/css' media='screen'><style type='text/css'>.status {width: 100%;height: %s%;}h1{margin-top: %spx;font-size: %spx;}</style></head><body>%s</body></html>";
var radiator = "<div class='status %s'><div class='border'><h1><a>%s</a></h1><p>Build was a <strong>%s</strong></p><p>%s</p></div></div>";
var pagetemplate = "<html><head><title>Radiance - <%= page.name %></title><meta http-equiv='refresh' content='3' /><link rel='stylesheet' href='/style/style.css' type='text/css' media='screen'><style type='text/css'>.status {width: 100%;height: <%= 100 / page.radiators.length %>%;}h1 {margin-top: <%= 50 / page.radiators.length %>px;font-size: <%= 100 / page.radiators.length * 3 %>px;}</style></head><body><% for(var i = 0; i < o.radiators.length; i++) { %><div class='status <%= o.radiators[i].status %>'><div class='border'><h1><a><%= page.radiators[i].name %></a></h1><p>Build</strong> was a <strong><%= page.radiators[i].status %></strong></p><p><%= page.radiators[i].causes %></p></div></div><% } %></body></html>";

// Constructor
var Template = function() {
  
}
// properties and methods
Template.prototype = {
  html: function(o) {
    var radiators = _.map(o.radiators, function(rad){
      var causes = Template.prototype.causes(rad).join(",");
          causes = (causes.length > 0) ? "(" + causes + ")" : "";
      return util.format(radiator,  Template.prototype.status(rad), 
                                    rad.name, 
                                    Template.prototype.status(rad),
                                    causes);
    });
    var length = radiators.length
    return util.format(page, o.name, 100/length, 50/length, 100/length*2, radiators.join(""));
  },
  reduce: function(rad) {
    var results = _.map(rad.metrics, function(met){
      return met.result;
    });
    return Math.floor(_.reduce(results, function(memo, num){return (memo + num) / 2 }, results[0]));
  },
  status: function(rad) {
    var reduced = Template.prototype.reduce(rad);
    var status  = (reduced <  2) ? "problem" : status;
        status  = (reduced <  1) ? "failure" : status;
        status  = (reduced == 2) ? "success" : status;
    return status;    
  },
  causes: function(rad) {
    var causeList = _.map(rad.metrics, function(met){
      return (met.result < 2) ? met.name: null;
    });
    return causeList.filter(function(e){return e});
  },
};
// node.js module export
module.exports = new Template();