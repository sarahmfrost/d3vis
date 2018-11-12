
function sarahData() {


//Where did i see dogs?
//ALSO PLOT ON MAP
  //17 - Seabright
  //4 - UCSC
  //6 - Westside
  //1 - Capitola
  //2 -Tenderloin
  //6 -Noe Valley
//var dataArray = [1, 4, 6, 17, 2, 6];
var dataArray = [[1, "Capitola"], [4, "UCSC"], [6, "Westside"], [17, "Seabright"], [2, "Tenderloin"], [6, "Noe Valley"]];

d3.select("svg").remove(); //removes an existing svg, this is to prevent graphs from appearing over and over

var svg = d3.select("body").append("svg") //
          .attr("height","300")
          .attr("width","100%");

svg.selectAll("rect")
    .data(dataArray)
    .enter().append("rect")
          .attr("class", "bar")
          .attr("fill", "pink") // makes bars pink
          .attr("stroke", "black")
          .attr("height", function(d, i) {return (d[0] * 10)})
          .attr("width","40")
          .attr("x",function(d, i) {return i * 60 + 25})
          .attr("y",function(d, i) {return 300 - (d[0] * 10)});

svg.selectAll("text")
    .data(dataArray)
    .enter().append("text")
    .text(function(d) {return d;})
          .attr("x",function(d, i) {return i * 60 + 25})
          .attr("y",function(d, i) {return 300 - (d[0] * 10)});

text = svg.append('text').text('Where did I see dogs this week?')
                .attr('x', 50)
                .attr('y', 100)
                .attr('fill', 'black')
                .attr('font-family', 'Verdana')
                .attr('font-size', '20');


//Size of dogs (S/M/L) in pie chart form
//15 S 41.6%
//7 M 19.4 %
//14 L  38.8 %
//Total: 36
var colors = d3.scaleOrdinal(d3.schemeDark2);

var svg = d3.select("body").append("svg") //
          .attr("height","500")
          .attr("width","100%")
          .style("background", "pink");

var details = [{size:"S", number:15}, {size:"M", number:7}, {size:"L", number:14}];

var data = d3.pie().sort(null).value(function(d){return d.number;})(details); //using pie function for only numbers
console.log(data);
var segments = d3.arc() //arc generator function
                .innerRadius(0)
                .outerRadius(200)
                .padAngle(.05)
                .padRadius(50);

var sections = svg.append("g").attr("transform", "translate(250,250)") //g element is container element for grouping together graphics elements
                    .selectAll("path").data(data);
sections.enter().append("path").attr("d", segments).attr("fill", function(d){return colors(d.data.number);});

var content = d3.select("g").selectAll("text").data(data);
content.enter().append("text").each(function(d){
    var center = segments.centroid(d);
    d3.select(this).attr("x", center[0]).attr("y", center[1])
                    .text(d.data.number);

});

var legends = svg.append("g").attr("transform", "translate(500, 100)")
                    .selectAll(".legends").data(data);
var legend = legends.enter().append("g").classed("legends", true).attr("transform", function(d,i){return "translate(0," + (i + 1)*30 + ")";});
legend.append("rect").attr("width", 20).attr("height", 20).attr("fill", function(d){return colors(d.data.number);});

legend.append("text").text(function(d){return d.data.size;})
        .attr("fill", function(d){return colors(d.data.number);})
        .attr("x", 25)
        .attr("y", 15);

text = svg.append('text').text('What size of dogs did I see this week?')
                .attr('x', 50)
                .attr('y', 40)
                .attr('fill', 'black')
                .attr('font-family', 'Verdana')
                .attr('font-size', '20');
}

