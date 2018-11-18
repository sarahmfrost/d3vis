// NFL concussion data 

var data = [{year: 2012, concussions: 265},
            {year: 2013, concussions: 244},
            {year: 2014, concussions: 212},
            {year: 2015, concussions: 279},
            {year: 2016, concussions: 250},
            {year: 2017, concussions: 291}];

// bar chart

var barWidth = 40;
var width = (barWidth + 10) * data.length;
var height = 200;

var x = d3.scale.linear().domain([0, data.length]).range([0, width]);
var y = d3.scale.linear().domain([0, d3.max(data, function(datum) { return datum.concussions; })]).
  rangeRound([0, height]);

var barChart = d3.select("#bar-chart").
  append("svg:svg").
  attr("width", width).
  attr("height", height);

barChart.selectAll("rect").
  data(data).
  enter().
  append("svg:rect").
  attr("x", function(datum, index) { return x(index); }).
  attr("y", function(datum) { return height - y(datum.concussions); }).
  attr("height", function(datum) { return y(datum.concussions); }).
  attr("width", barWidth).
  attr("fill", "#4286f4");

// add numbers to top of bars

barChart.selectAll("text").
  data(data).
  enter().
  append("svg:text").
  attr("x", function(datum, index) { return x(index) + barWidth; }).
  attr("y", function(datum) { return height - y(datum.concussions); }).
  attr("dx", -barWidth/2).
  attr("dy", "1.2em").
  attr("text-anchor", "middle").
  text(function(datum) { return datum.concussions;}).
  attr("fill", "white");

barChart.selectAll("text.yAxis").
  data(data).
  enter().append("svg:text").
  attr("x", function(datum, index) { return x(index) + barWidth; }).
  attr("y", height).
  attr("dx", -barWidth/2).
  attr("text-anchor", "middle").
  attr("style", "font-size: 12; font-family: Helvetica, sans-serif").
  text(function(datum) { return datum.year;}).
  attr("transform", "translate(0, 18)").
  attr("class", "yAxis");