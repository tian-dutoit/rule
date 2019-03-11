import React, { Component } from 'react'
import * as d3 from 'd3'
import '../App.css'
import '../stocks.csv'

export default class Scatter extends Component {
  componentDidMount() {
    this.plot()
  }

  componentDidUpdate() {
    this.plot()
  }

  plot() {
    // Set the dimensions of the canvas / graph
    const margin = { top: 30, right: 20, bottom: 30, left: 50 },
      width = 600 - margin.left - margin.right,
      height = 270 - margin.top - margin.bottom
    // Parse the date / time
    // Set the ranges
    const x = d3.scaleLinear([0, width])
    const y = d3.scaleLinear([height, 0])
    // Define the axes
    const xAxis = d3.axisBottom(x).ticks(5)
    const yAxis = d3.axisLeft(y).ticks(5)
    // Define the line
    const priceline = d3
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
    let fakeData = [
      { symbol: 'MSFT', date: 'Jan 2000', price: 39.81 },
      { symbol: 'MSFT', date: 'Feb 2000', price: 36.35 },
      { symbol: 'MSFT', date: 'Mar 2000', price: 43.22 }
    ]

    // let testData = d3.csvFormat('Stocks.csv', ['symbol', 'date', 'price'])
    // console.log(testData)
    // d3.csv('../stocks.csv', function(error, data) {

    // console.log(data, error)
    fakeData.forEach(function(d) {
      d.price = +d.price
    })
    // Scale the range of the data
    x.domain(
      d3.extent(this.props.data, function(d) {
        return d.movingBank
      })
    )
    y.domain([
      0,
      d3.max(fakeData, function(d) {
        return d.movingBank
      })
    ])
    // Nest the entries by symbol
    // const dataNest = d3
    //   .nest()
    //   .key(function(d) {
    //     return d.symbol
    //   })
    //   .entries(fakeData)
    // // Loop through each symbol / key
    // dataNest.forEach(function(d) {
    //   svg
    //     .append('path')
    //     .attr('class', 'line')
    //     .attr('d', priceline(d.values))
    // })
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
