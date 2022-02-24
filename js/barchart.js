/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your bar charts in this file 


// Set dimensions and margins for plots 
const width = 900;
const height = 450;
const margin = { left: 50, right: 50, bottom: 50, top: 50 };
const yTooltipOffset = 15;


// Select the hard-coded-bar div and create an SVG
const svg1 = d3
  .select("#hard-coded-bar")
  .append("svg")
  .attr("width", width - margin.left - margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

// Hardcoded barchart data
const data1 = [
  { name: 'A', score: 92 },
  { name: 'B', score: 15 },
  { name: 'C', score: 67 },
  { name: 'D', score: 89 },
  { name: 'E', score: 53 },
  { name: 'F', score: 91 },
  { name: 'G', score: 18 }
];

/*

  Axes

*/

// Set the y-axis max to the max value in the data
let maxY1 = d3.max(data1, function (d) { return d.score; });

// Set the scale of the y-axis
`x`
let yScale1 = d3.scaleLinear()
  .domain([0, maxY1])
  .range([height - margin.bottom, margin.top]);

// Set the scale of the x-axis
let xScale1 = d3.scaleBand()
  .domain(d3.range(data1.length))
  .range([margin.left, width - margin.right])
  .padding(0.1);

// Create the y-axis
svg1.append("g")
  .attr("transform", `translate(${margin.left}, 0)`)
  .call(d3.axisLeft(yScale1))
  .attr("font-size", '20px');

// Create the x-axis
svg1.append("g")
  .attr("transform", `translate(0,${height - margin.bottom})`)
  .call(d3.axisBottom(xScale1)
    .tickFormat(i => data1[i].name))
  .attr("font-size", '20px');

/* 

  Tooltip Set-up  

*/

// Add a tooltip to the bar chart
const tooltip1 = d3.select("#hard-coded-bar")
  .append("div")
  .attr('id', "tooltip1")
  .style("opacity", 0)
  .attr("class", "tooltip");

// Show the tooltip on mouseover of the bar chart
const mouseover1 = function (event, d) {
  tooltip1.html("Name: " + d.name + "<br> Score: " + d.score + "<br>")
    .style("opacity", 1);
}

// Move the tooltip when the mouse moves
const mousemove1 = function (event, d) {
  tooltip1.style("left", (event.x) + "px")
    .style("top", (event.y + yTooltipOffset) + "px");
}

// Hide the tooltip
const mouseleave1 = function (event, d) {
  tooltip1.style("opacity", 0);
}

/* 

  Bars 

*/

// Add the bars to the actual bar chart
svg1.selectAll(".bar")
  .data(data1)
  .enter()
  .append("rect")
  .attr("class", "bar")
  .attr("x", (d, i) => xScale1(i))
  .attr("y", (d) => yScale1(d.score))
  .attr("height", (d) => (height - margin.bottom) - yScale1(d.score))
  .attr("width", xScale1.bandwidth())
  .on("mouseover", mouseover1)
  .on("mousemove", mousemove1)
  .on("mouseleave", mouseleave1);


/*

  CSV - Bar

*/

// Select the csv-bar div and create an SVG
const svg2 = d3
  .select("#csv-bar")
  .append("svg")
  .attr("width", width - margin.left - margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

d3.csv("data/barchart.csv").then((data) => {
  // Set the y-axis max to the max value in the data
  let maxY2 = d3.max(data, function (d) { return d.score; });

  // Set the scale of the y-axis
  let yScale2 = d3.scaleLinear()
    .domain([0, maxY2])
    .range([height - margin.bottom, margin.top]);

  // Set the scale of the x-axis
  let xScale2 = d3.scaleBand()
    .domain(d3.range(data.length))
    .range([margin.left, width - margin.right])
    .padding(0.1);

  // Create the y-axis
  svg2.append("g")
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(yScale2))
    .attr("font-size", '20px');

  // Create the x-axis
  svg2.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(xScale2)
      .tickFormat(i => data[i].name))
    .attr("font-size", '20px');

  // Add a tooltip to the bar chart
  const tooltip2 = d3.select("#csv-bar")
    .append("div")
    .attr('id', "tooltip2")
    .style("opacity", 0)
    .attr("class", "tooltip");

  // Show the tooltip on mouseover of the bar chart
  const mouseover2 = function (event, d) {
    tooltip2.html("Name: " + d.name + "<br> Score: " + d.score + "<br>")
      .style("opacity", 1);
  }

  // Move the tooltip when the mouse moves
  const mousemove2 = function (event, d) {
    tooltip2.style("left", (event.x) + "px")
      .style("top", (event.y + yTooltipOffset) + "px");
  }

  // Hide the tooltip
  const mouseleave2 = function (event, d) {
    tooltip1.style("opacity", 0);
  }

  // Add the bars to the actual bar chart
  svg2.selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d, i) => xScale2(i))
    .attr("y", (d) => yScale2(d.score))
    .attr("height", (d) => (height - margin.bottom) - yScale2(d.score))
    .attr("width", xScale2.bandwidth())
    .on("mouseover", mouseover2)
    .on("mousemove", mousemove2)
    .on("mouseleave", mouseleave2);
});


const svg3 = d3
  .select("#csv-scatter")
  .append("svg")
  .attr("width", width - margin.left - margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

d3.csv("data/scatter.csv").then((data) => {
  // Set the y-axis max to the max value in the data
  let maxY3 = d3.max(data, function (d) { return d.score; });

  // Set the scale of the y-axis
  let yScale3 = d3.scaleLinear()
    .domain([0, maxY3])
    .range([height - margin.bottom, margin.top]);

  // Set the x-axis max to the max value in the data
  let maxX3 = d3.max(data, function (d) { return d.day; });

  // Set the scale of the x-axis
  let xScale3 = d3.scaleLinear()
    .domain([0, maxX3])
    .range([margin.left, width - margin.right]);

  // Create the y-axis
  svg3.append("g")
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(yScale3))
    .attr("font-size", '20px');

  // Create the x-axis
  svg3.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(xScale3))
    .attr("font-size", '20px');

  // Add a tooltip to the bar chart
  const tooltip3 = d3.select("#csv-scatter")
    .append("div")
    .attr('id', "tooltip3")
    .style("opacity", 0)
    .attr("class", "tooltip");

  // Show the tooltip on mouseover of the bar chart
  const mouseover3 = function (event, d) {
    tooltip3.html("Day: " + d.day + "<br> Score: " + d.score + "<br>")
      .style("opacity", 1);
  }

  // Move the tooltip when the mouse moves
  const mousemove3 = function (event, d) {
    tooltip3.style("left", (event.x) + "px")
      .style("top", (event.y + yTooltipOffset) + "px");
  }

  // Hide the tooltip
  const mouseleave3 = function (event, d) {
    tooltip3.style("opacity", 0);
  }

  svg3.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "bar")
    .attr("cx", (d) => xScale3(d.day)) 
    .attr("cy", (d) => yScale3(d.score))
    .attr("r", 10)
    .on("mouseover", mouseover3)
    .on("mousemove", mousemove3)
    .on("mouseleave", mouseleave3);
});