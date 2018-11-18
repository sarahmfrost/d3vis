//scp d3vis/* jakutagawa@riverdance.soe.ucsc.edu:/soe/jakutagawa/.html/d3vis



function jonData() {

    // loads a css file
    function loadCssFile(filename) {
        var fileref = document.createElement("link")

        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
        document.head.insertBefore(fileref, document.head.childNodes[document.head.childNodes.length - 1].nextSibling);
    }

    loadCssFile("jon_style.css")

        // set base variables
    var margin = {
        top: 10,
        right: 20,
        bottom: 20,
        left: 40
    };

    var diameter = 600;
    var width = 5000 - margin.left - margin.right;
    var height = 600 - margin.top - margin.bottom;
    var clickToggle = false;
    //var color = d3.scaleOrdinal(["#FA8334", "#AFFC41", "#19647E", "#7FDDDD", "#949396", "#DCF763", "#00C6D0", "#C1C1C1", "#666666", "#FDCDAE"]);
    var color = d3.scaleOrdinal(["#50514F","#F25F5C","#FFE066","#247BA0","#70C1B3"])
    var radius = d3.scaleLinear()
        .domain([0, 4.5])
        .range([15, 23]);
    var x = d3.scaleBand().rangeRound([0, width]);
    var y = d3.scaleBand().rangeRound([height, 0]);

    // promise for loading files
    var files = ["./eVIP_data/eVIP_pathway_pvals.csv", "./eVIP_data/eVIP_pathway_overall_and_screen_calls.csv"];
    var promises = [];

    files.forEach(function(url) {
        promises.push(d3.csv(url))
    });

    Promise.all(promises).then(function(datasets) {
        d3.select("svg").remove();
        var svg = d3.select(".chart")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            //.call(responsivefy)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        var mutationNames = d3.keys(datasets[0][0]).filter(function(key) {
            return key !== "Pathway";
        })
        console.log(datasets[1])
        var pathwayPredictions = d3.values(datasets[1][0]).filter(function(value) {
            return value !== "HALLMARK_PANCREAS_BETA_CELLS";
        })

        var pval_data = datasets[0].slice(0, 15);
        var call_data = datasets[1].slice(0, 15);

        console.log(pval_data)
        console.log(call_data[0])

        // iterate through pval data to build data groups
        var k = 0;
        pval_data.forEach(function(d,k) {
            d.groups = mutationNames.map(function(name) {
                return {
                    name: name,
                    value: +d[name],
                    call: call_data[k][name]
                };
            });
            d.groups.sort(function(x, y) {

                return d3.descending(y.value, x.value);
            });
        k++;
        });

        /*call_data.forEach(function (e) {
            e.call = pathwayPredictions.map(function(name) {
                return{
                    name: name,
                    call: e[name]
                };
            });
        });
        console.log(pval_data)*/

        y.domain(pval_data.map(function(d) {
            return d["Pathway"];
        }));
        x.domain(mutationNames);


        //color.domain(mutationNames);
        color.domain(["NI","GOF","COF","LOF","Neutral"])

        console.log(mutationNames)
        console.log(pathwayPredictions)

        var div = d3.select('body')
            .append('div')
            .attr('class', 'tooltip')
            .style('opacity', 0);

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
            .filter(function(d) {
                return d.value <= 0.1
            })
            /*.style('fill', function(d, i) {
                return color(d.name);
            })*/
            .style('fill', function(d, i) {
                //console.log(d.call)
                return color(d.call);
            })
            .attr("cx", x.bandwidth() / 2)
            .attr("cy", y.bandwidth() / 2)
            .attr("r", function(d) {
                return d.value === 0 ? 0 : radius(-Math.log10(d.value));
            })
            .on("click", highlightCircles)
            .on("mouseover", function(d) {
                div.transition()
                    .duration(200)
                    .style('opacity', 0.9);
                div.html(d.name)
                    .style('left', d3.event.pageX + 'px')
                    .style('top', d3.event.pageY - 28 + 'px');
            })
            .on("mouseout", function(d) {
                div.transition()
                    .duration(500)
                    .style('opacity', 0);
            });

        var text = cells.append("text")
            .attr("class", function(d) {
                return d.className = d.name.replace(/[\ ,/-]+/g, "-").toLowerCase();
            })
            .attr("text-anchor", "middle")
            .style("fill", "#ffffff")
            .attr("dx", x.bandwidth() / 2)
            .attr("dy", y.bandwidth() / 2 + 4)
            .text(function(d) {
                return d.value !== 0 ? d.value.toExponential(1) : '';
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

    /*
    function (d, i) {
      console.log("mouseover on", this);
      // make the mouseover'd element
      // bigger and red
      d3.select(this)
        .transition()
        .duration(100)
        .attr('r', 20)
        .attr('fill', '#ff0000');
    }*/

    function highlightCircles(d) {
        if (!clickToggle) {
            var className = d.name.replace(/[\ ,/-]+/g, "-").toLowerCase();
            d3.selectAll("circle, text").transition().style("fill-opacity", function(elem) {
                if (elem.className !== className) return 0.07;
            })

        } else {
            d3.selectAll("circle, text").transition().style("fill-opacity", 1);
        }
        clickToggle = !clickToggle;
    }
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