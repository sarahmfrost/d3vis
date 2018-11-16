//scp d3vis/* jakutagawa@riverdance.soe.ucsc.edu:/soe/jakutagawa/.html/d3vis

function jonData() {

    var files = ["./eVIP_data/eVIP_pathway_pvals.csv", "./eVIP_data/eVIP_pathway_overall_and_screen_calls.csv"];
    var promises = [];
    var margin = {
        top: 10,
        right: 20,
        bottom: 20,
        left: 40
    };

    var diameter = 600;
    var width = 800 - margin.left - margin.right;
    var height = 600 - margin.top - margin.bottom;
    var clickToggle = false;
    var color = d3.scaleOrdinal(["#FA8334", "#AFFC41", "#19647E", "#7FDDDD", "#949396", "#DCF763", "#00C6D0", "#C1C1C1", "#666666", "#FDCDAE"]);
    var radius = d3.scaleLinear()
        .domain([0, 1.0])
        .range([15, 23]);
        var x = d3.scaleBand().rangeRound([0, width]);
            var y = d3.scaleBand().rangeRound([height, 0]);



    /*var svg = d3.select(".chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        //.call(responsivefy)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");*/

    files.forEach(function(url) {
        promises.push(d3.csv(url))
    });

    Promise.all(promises).then(function(values) {
        var svg = d3.select(".chart")
          .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            //.call(responsivefy)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        var mutationNames = d3.keys(values[0][0]).filter(function(key) {
            return key !== "Pathway";
        })

        var pval_data = values[0].slice(0,15);
        var call_data = values[1];

        console.log(pval_data)
        pval_data.forEach(function(d) {
            d.groups = mutationNames.map(function(name) {
                return {
                    name: name,
                    value: +d[name]
                };
            });
            d.groups.sort(function(x, y) {
                return d3.descending(y.value, x.value);
            });

        });
        console.log(pval_data)

        y.domain(pval_data.map(function(d) {
            return d["Pathway"];
        }));
        x.domain(mutationNames);

        color.domain(mutationNames);
        var rows = svg.selectAll(".row")
            .data(pval_data)
            .enter()
            .append("g")
            .attr("class", "row")
            .attr("transform", function(d) {
                return "translate(0," + y(d["Pathway"]) + ")";
            });

        var cells = rows.selectAll(".cell")
            .data(function(d) {
                return d.groups;
            })
            .enter()
            .append("g")
            .attr("transform", function(d, i) {
                return "translate(" + i * x.bandwidth() + ",0)";
            })
            .attr("class", "cell");

        var circle = cells.append("circle")
            .attr("class", function(d) {
                return d.className = d.name.replace(/[\ ,/-]+/g, "-").toLowerCase();
            })
            .style('fill', function(d, i) {
                return color(d.name);
            })
            .attr("cx", x.bandwidth() / 2)
            .attr("cy", y.bandwidth() / 2)
            .attr("r", function(d) {
                return d.value === 0 ? 0 : radius(d.value);
            })
            //.on("click", highlightCircles);

        var text = cells.append("text")
            .attr("class", function(d) {
                return d.className = d.name.replace(/[\ ,/-]+/g, "-").toLowerCase();
            })
            .attr("text-anchor", "middle")
            .style("fill", "#ffffff")
            .attr("dx", x.bandwidth() / 2)
            .attr("dy", y.bandwidth() / 2 + 4)
            .text(function(d) {
                return d.value !== 0 ? d.value : '';
            });

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .remove();

        svg.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(y));


        //.sum(function(d) { return d.name; });

        //console.log(d.groups)
        //console.log(nodes)
        /*var bubble = d3.pack(values[0][0])
            .size([diameter, diameter])
            .padding(1.5);
        var svg = d3.select("body")
            .append("svg")
            .attr("width", diameter)
            .attr("height", diameter)
            .attr("class", "bubble");*/
        /*    var nodes = d3.hierarchy(values[0][0])
                .sum(function(d) {
                    return d.Count; });*/
        //console.log(rowNames)
    });

    /*d3.queue()
    .defer(d3.csv, "./eVIP_data/eVIP_pathway_pvals.csv")
    .defer(d3.csv, "./eVIP_data/eVIP_pathway_overall_and_screen_calls")
    .await(analyze);

    function analyze(error,eVIP_pathway_pvals,eVIP_pathway_overall_and_screen_calls) {
        if (error) {console.log(error)}
        console.log(eVIP_pathway_pvals['ZNF597_p.V21L'])
        console.log(eVIP_pathway_overall_and_screen_calls['ZNF597_p.V21L'])
    }*/

    /*
    d3.csv("./eVIP_data/eVIP_pathway_pvals.csv", function(data) {
    //d3.csv("http://localhost:8000/eVIP_pathway_pvals.csv", function(data) {
        //console.log(data[0]);
        //console.log('loaded');
        console.log(data)
        console.log(data['ZNF597_p.V21L'])

    });
    */
    //console.log(data)
}
