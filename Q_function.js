function quentinData() { //everything is contained within this one function

    //Width and height
    var w = 1500;
    var h = 804;

    var dataset = [
        ["MI-11", 6.4, "red", 4.8, "blue"],
        ["PA-1", .7, "red", 3.3, "blue"],
        ["FL-27", 10.4, "blue", 2.3, "blue"],
        ["CA-10", .8, "red", 2.2, "blue"],
        ["NV-4", 1.8, "blue", 1.8, "blue"],
        ["KY-6", 10.5, "red", 1.7, "blue"],
        ["KS-2", 19.1, "red", 1.7, "blue"],
        ["NV-3", 5.4, "red", 1.3, "blue"],
        ["CA-25", .1, "red", 1.2, "blue"],
        ["IL-6", 2, "red", 1.1, "blue"],
        ["NJ-3", 4.6, "red", 1.1, "blue"],
        ["NJ-7", 3.3, "red", 1, "blue"],
        ["IA-3", 2.4, "red", .9, "blue"],
        ["CA-45", 4.3, "red", .8, "blue"],
        ["UT-4", 20.1, "red", .8, "blue"],
        ["ME-2", 6.2, "red", .7, "blue"],
        ["VA-5", 14.4, "red", .4, "blue"],
        ["FL-26", 9.8, "blue", .1, "red"],
        ["NC-9", 13.6, "red", .2, "red"],
        ["NY-22", 12.8, "red", .2, "red"],
        ["NY-19", 4.8, "red", .3, "red"],
        ["TX32", 9.6, "red", .3, "red"],
        ["MN-1", 11, "red", .5, "red"],
        ["NM-2", 10.8, "red", .6, "red"],
        ["CA-39", .5, "blue", 1, "red"],
        ["FL-15", 13.4, "red", 1, "red"],
        ["TX-7", 11.8, "red", 1, "red"],
        ["MI-8", 7.2, "red", 1.3, "red"],
        ["VA-7", 12.6, "red", 1.7, "red"],
        ["CA-48", 6.7, "red", 1.9, "red"],
        ["NC-13", 10.5, "red", 4, "red"],
        ["WA-8", 1.3, "red", 4.3, "red"]
    ];

    //Create SVG element
    var svg = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    //create "leans" bar
    svg.selectAll("leans")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", function(d, i) {
            return i * 36; // Bar width of 20 plus 1 for padding
        })
        .attr("y", 20)
        .attr("width", 15)
        .attr("height", function(d) {
            return d[1] * 40;
        })
        .attr("fill", function(d) {
            return d[2];
        })
        .style("opacity", .5)

    //create "polls" bar
    svg.selectAll("polls")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", function(d, i) {
            return i * 36 + 16; // Bar width of 20 plus 1 for padding
        })
        .attr("y", 20)
        .attr("width", 15)
        .attr("height", function(d) {
            return d[3] * 40;
        })
        .attr("fill", function(d) {
            return d[4];
        })
    //.style("opacity", .5)

    //create bar graph labels
    svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .text(function(d) {
            return d[0];
        })
        .attr("x", function(d, i) {
            return i * 36 + 16;
        })
        .attr("y", 15)
        .attr("font-size", "11px")
        .attr("text-anchor", "middle")

    //create majority line
    svg.selectAll("line")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", 500) //function(d, i) {
        //return i*36; // Bar width of 20 plus 1 for padding
        //})
        .attr("y", 0)
        .attr("width", 3)
        .attr("height", function(d) {
            return d[1] * 40;
        })
}
