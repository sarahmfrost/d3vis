function sarahData() {

//d3.select("#bar").selectAll("svg").remove(); //removes an existing svg, this is to prevent graphs from appearing over and over
//d3.select("#pie").selectAll("svg").remove();
d3.selectAll("svg").remove();
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

var svg = d3.select("body").append("div").attr("id","bar").append("svg") //
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

var svg = d3.select("body").append("div").attr("id","pie").append("svg") //
          .attr("height","500")
          .attr("width","100%")
          .style("background", "pink");

var details = [{size:"S", number:15}, {size:"M", number:7}, {size:"L", number:14}];

var data = d3.pie().sort(null).value(function(d){return d.number;})(details); //using pie function for only numbers

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

// Histogram of when I saw dogs - days of week on x axis and # of dogs on Y
//19 on Saturday
//1 on sunday
//5 on Monday
// 5 on Tuesday
// 1 on wednesday
// 3 on thursday
// 2 on Friday

 var lineData = [{
    'x': 1,
    'y': 19
  }, {
    'x': 2,
    'y': 1
  }, {
    'x': 3,
    'y': 5
  }, {
    'x': 4,
    'y': 5
  }, {
    'x': 5,
    'y': 1
  }, {
    'x': 6,
    'y': 3
  }, {
    'x': 7,
    'y': 2
  }];

var margin = {top: 150, right: 150, bottom: 150, left: 150}
  , width = window.innerWidth - margin.left - margin.right // Use the window's width
  , height = window.innerHeight - margin.top - margin.bottom; // Use the window's height
// X scale will use the index of our data
var xScale = d3.scaleLinear()
    .domain([0, 8]) // input
    .range([0, width])
 // output
// Y scale will use the randomly generate number
var yScale = d3.scaleLinear()
    .domain([0, 22]) // input
    .range([height, 0]); // output
// d3's line generator
var line = d3.line()
    .x(function(d) { return xScale(d.x); }) // set the x values for the line generator
    .y(function(d) { return yScale(d.y); }) // set the y values for the line generator

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//add title to graph
text = svg.append('text').text('Best days for dog watching: ')
                .attr('x', 180)
                .attr('y', 10)
                .attr('fill', 'red')
                .attr('font-family', 'Verdana')
                .attr('font-size', '20');

// Call the x axis in a group tag
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale))
 // Create an axis component with d3.axisBottom
// check out .axisBottom, see if I can pass in days of the week !!!
// Call the y axis in a group tag
svg.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft
//  Append the path, bind the data, and call the line generator
svg.append("path")
    .datum(lineData) // Binds data to the line
    .attr("class", "line") // Assign a class for styling
    .attr("d", line) //  Calls the line generator
    .style("fill", "none")
    .style("stroke", "black")
//  Appends a circle for each datapoint
svg.selectAll(".dot")
    .data(lineData)
  .enter().append("circle") // Uses the enter().append() method
    .attr("class", "dot") // Assign a class for styling
    .attr("cx", function(d) { return xScale(d.x) })
    .attr("cy", function(d) { return yScale(d.y) })
    .attr("r", 5)
    .attr('fill', 'red')

//add x-axis labeling
svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width - 450)
    .attr("y", height + 40)
    .text("Days, Day 1 = Saturday");
// add y-axis labeling
svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("x", -110)
    .attr("y", height - 440)
    .attr("transform", "rotate(-90)")
    .text("number of dogs");


//time series database , call back that will run the step
//window.setInterval - function will be called every so often

// Was the dog fluffy? Y or N
//20 no
//16 yes
// with drawings of fluffy and un-fluffy dogs

var svg = d3.select("body").append("div").append("svg") //
          .attr("height","800")
          .attr("width","100%");

text = svg.append('text').text('How many fluffy and non-fluffy dogs did I see?')
                .attr('x', 50)
                .attr('y', 40)
                .attr('fill', 'black')
                .attr('font-family', 'Verdana')
                .attr('font-size', '20');

//20 non-fluffy dogs
text = svg.append('text').text('20')
                .attr('x', 400)
                .attr('y', 570)
                .attr('fill', 'black')
                .attr('font-family', 'Verdana')
                .attr('font-size', '90');
//16 fluffy dogs
text = svg.append('text').text('16')
                .attr('x', 760)
                .attr('y', 570)
                .attr('fill', 'black')
                .attr('font-family', 'Verdana')
                .attr('font-size', '90');

//image of fluffy dog
var myimage = svg.append('image')
    .attr('xlink:href', 'https://static1.squarespace.com/static/587605301b631b0b57d35dab/t/5bedfb9a0e2e72ea2f92c22c/1542323099451/10000012954.jpg')
    .attr('x', 650)
    .attr('y', 50)
    .attr('width', 400)
    .attr('height', 400)

//image of non-fluffy dog
var myimage = svg.append('image')
    .attr('xlink:href', 'https://static1.squarespace.com/static/587605301b631b0b57d35dab/t/5bedf5d24d7a9cdd1f4e5a04/1542321618999/american-hairless-terrier.jpg')
    .attr('x', 250)
    .attr('y', 50)
    .attr('width', 400)
    .attr('height', 400)
}
