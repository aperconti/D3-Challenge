d3.csv("./assets/data/data.csv").then(Data => {
    // Define SVG area dimensions
    var svgWidth = 960;
    var svgHeight = 560;

    // Define the chart's margins as an object
    var chartMargin = {
        top: 30,
        right: 30,
        bottom: 50,
        left: 50
    }

    // Define dimensions of the chart area
    var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
    var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

    // Select body, append SVG area to it, and set the dimensions
    var svg = d3
        .select("#scatter")
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);

    // Append a group to the SVG area and shift ('translate') it to the right and down to adhere
    // to the margins set in the "chartMargin" object.
    var chartGroup = svg.append("g")
        .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);


    // Cast the hours value to a number for each piece of Data
    Data.forEach(function (data) {
        data.smokes = +data.smokes;
        data.age = +data.age;
    });

    // Add some padding in the graph
    var ageRange = d3.extent(Data, d => d.age)

    ageRange[0] = ageRange[0] - 1
    ageRange[1] = ageRange[1] + 1

    // Create scale functions
    var xScale = d3.scaleLinear()
        .domain(ageRange)
        .range([0, chartWidth]);
    var yScale = d3.scaleLinear()
        .domain([0, d3.max(Data, d => d.smokes)])
        .range([chartHeight, 0]);

    // Create axis functions
    var bottomAxis = d3.axisBottom(xScale);
    var leftAxis = d3.axisLeft(yScale);

    // Append axes to the chart
    chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(bottomAxis);

    chartGroup.append("g")
        .call(leftAxis);

    // Create circles
    chartGroup.selectAll("Circle")
        .data(Data)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d.age))
        .attr("cy", d => yScale(d.smokes))
        .attr("r", "20")
        // .attr("r", d => d.poverty)
        .attr("stroke", "green")
        .attr("fill", "darkred")
        .attr("stroke-width", 1.5)
        .attr("opacity", "0.8")
        .append("text");

    chartGroup.selectAll(null)
        .data(Data)
        .enter()
        .append("text")
        .attr("x", function (d) {
            return xScale(d.age);
        })
        .attr("y", function (d) {
            return yScale(d.smokes) + 5;
        })
        .text(function (d) {
            return d.abbr;
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "12px")
        .attr("text-anchor", "middle")
        .attr("fill", "white");

    // Create axes labels
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - chartMargin.left - 4)
        .attr("x", 0 - (chartHeight / 2))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Smokes");

    chartGroup.append("text")
        .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + chartMargin.top - 2})`)
        .attr("class", "axisText")
        .text("Age");
});