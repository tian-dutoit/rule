import React, { Component } from 'react'
import * as d3 from 'd3'
import '../App.css'
import stocks from '../Stocks.csv'

export default class Graphs extends Component {
  // chart = {
  //   const svg = d3.select(DOM.svg(width, height))
  //       .style("-webkit-tap-highlight-color", "transparent")
  //       .style("overflow", "visible");

  //   svg.append("g")
  //       .call(xAxis);

  //   svg.append("g")
  //       .call(yAxis);

  //   svg.append("path")
  //       .datum(data)
  //       .attr("fill", "none")
  //       .attr("stroke", "steelblue")
  //       .attr("stroke-width", 1.5)
  //       .attr("stroke-linejoin", "round")
  //       .attr("stroke-linecap", "round")
  //       .attr("d", line);

  //   const tooltip = svg.append("g");

  //   svg.on("touchmove mousemove", function() {
  //     const {date, value} = bisect(d3.mouse(this)[0]);

  //     tooltip
  //         .attr("transform", `translate(${x(date)},${y(value)})`)
  //         .call(callout, `${value.toLocaleString(undefined, {style: "currency", currency: "USD"})}
  // ${date.toLocaleString(undefined, {month: "short", day: "numeric", year: "numeric"})}`);
  //   });

  //   svg.on("touchend mouseleave", () => tooltip.call(callout, null));

  //   return svg.node();
  // }
  componentDidMount() {
    this.plot()
  }

  plot() {
    // Set the dimensions of the canvas / graph
    const margin = { top: 30, right: 20, bottom: 30, left: 50 },
      width = 600 - margin.left - margin.right,
      height = 270 - margin.top - margin.bottom
    // Parse the date / time
    const parseDate = d3.timeParse('%b %Y')
    // Set the ranges
    const x = d3.scaleTime([0, width])
    const y = d3.scaleLinear([height, 0])
    // Define the axes
    const xAxis = d3.axisBottom(x)
    const yAxis = d3.axisLeft(y).ticks(5)
    // Define the line
    const priceline = d3.svg
      .line()
      .x(function(d) {
        return x(d.date)
      })
      .y(function(d) {
        return y(d.price)
      })

    // Adds the svg canvas
    const svg = d3
      .select('#graph')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    // Get the data
    // d3.csv('stocks.csv', function(error, data) {
    d3.csv(stocks, function(error, data) {
      data.forEach(function(d) {
        d.date = parseDate(d.date)
        d.price = +d.price
      })
      // Scale the range of the data
      x.domain(
        d3.extent(data, function(d) {
          return d.date
        })
      )
      y.domain([
        0,
        d3.max(data, function(d) {
          return d.price
        })
      ])
      // Nest the entries by symbol
      const dataNest = d3
        .nest()
        .key(function(d) {
          return d.symbol
        })
        .entries(data)
      // Loop through each symbol / key
      dataNest.forEach(function(d) {
        svg
          .append('path')
          .attr('class', 'line')
          .attr('d', priceline(d.values))
      })
      // Add the X Axis
      svg
        .append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis)
      // Add the Y Axis
      svg
        .append('g')
        .attr('class', 'y axis')
        .call(yAxis)
    })
  }
  render() {
    return (
      <div id="graph">
        graph goes here
        {/* <div></div> */}
      </div>
    )
  }
}
