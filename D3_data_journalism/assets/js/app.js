// reading in csv and printing it to console to veiw data
// d3.csv("./assets/data/data.csv", function (data) {
//     console.log(data);
//     // });

// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 560;

// Define the chart's margins as an object
var chartMargin = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 30
}


// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;


// Select body, append SVG area to it, and set the dimensions
var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);


// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load data from hours-of-tv-watched.csv
d3.csv("./assets/data/data.csv").then(Data => {

    // Print the tvData
    console.log(Data);

    // Cast the hours value to a number for each piece of tvData
    Data.forEach(function (data) {
        data.poverty = +data.poverty;
        console.log(data.poverty)
    });

    // Cast the hours value to a number for each piece of income
    Data.forEach(function (data) {
        data.income = +data.income;
        console.log(data.income)

    });

    var x = d3.scaleTime().range([0, svgHeight]);
    var y = d3.scaleLinear().range([svgHeight, 0]);

    // Scale the range of the data
    x.domain(d3.extent(Data, function (d) {
        return d.poverty;
    }));
    y.domain([0, d3.max(Data, function (d) {
        return d.income;
    })]);

    //defining graph type
    var valueline = d3.line()
        .x(function (d) {
            return x(d.poverty);
        })
        .y(function (d) {
            return y(d.income);
        });

    var svg = d3.select("#scatter").append("svg")
        .attr("width", svgWidth + chartMargin.left + chartMargin.right)
        .attr("height", svgHeight + chartMargin.top + chartMargin.bottom)
        .append("g")
        .attr("transform", "translate(" + chartMargin.left + "," + chartMargin.top + ")");


    var path = svg.selectAll("dot")
        .data(Data)
        .enter().append("circle")
        .attr("r", 5)
        .attr("cx", function (d) {
            return x(d.poverty);
        })
        .attr("cy", function (d) {
            return y(d.income);
        })
        .attr("stroke", "#32CD32")
        .attr("stroke-width", 1.5)
        .attr("fill", "#FFFFFF");

});
