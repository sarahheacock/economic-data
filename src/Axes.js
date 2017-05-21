import React, { PropTypes, Component } from 'react';
//import { d3, timeYear } from 'd3';
import * as d3 from 'd3';
import Data from './Data.js';

class Axes extends Component {
  componentDidMount(){
    this.renderAxis();
  }

  componentDidUpdate() {
    this.renderAxis();
  }



  renderAxis() {
    //year-month-day
    const PADDING = this.props.padding;
    const HEIGHT = this.props.height;
    const WIDTH = this.props.width;
    const size = this.props.data.length;
    //console.log(size);
    const mindate = this.findMinDate();
    const maxdate = this.findMaxDate();
    const max = this.findMaxPoint();

    const xScale = d3.scaleTime().domain([mindate, maxdate]).range([PADDING, WIDTH - PADDING]);
    const xAxis = d3.axisBottom(xScale);
    if(this.props.width <= 500) xAxis.ticks(d3.timeYear.every(10));

    const yScale = d3.scaleLinear().domain([0, max]).range([HEIGHT - PADDING, PADDING]);
    const yAxis = d3.axisLeft(yScale);
    yAxis.ticks(10);
    if(this.props.height <= 500) yAxis.ticks(5);


    const xnode = this.refs.Xaxis;
    const ynode = this.refs.Yaxis;
    d3.select(xnode).call(xAxis);
    d3.select(ynode).call(yAxis);

  }

  findMinDate() {
    const size = this.props.data.length;
    const date = (size === 0) ? ("1947-01-01").split("-") : this.props.data[0][0].split("-");
    const mindate = new Date(parseInt(date[0])-1, parseInt(date[1]), parseInt(date[2]));
    return mindate;
  }

  findMaxDate() {
    const size = this.props.data.length;
    const mdate = (size === 0) ? ("2015-07-01").split("-") : this.props.data[size-1][0].split("-");
    const maxdate = new Date(parseInt(mdate[0])+1, 1, 1);
    return maxdate;
  }

  findMaxPoint() {
    const size = this.props.data.length;
    const maxPoint = (size === 0) ? 18000 : this.props.data.reduce((a, b) => Math.max(a, b[1]),10);
    const max = Math.round(maxPoint) + 2000;
    return max;
  }

  render() {
    // const dates = this.props.data.map((d) => d[1]);
    // console.log("extent", d3.extent(dates, (d) => d[1]));
    // const xnode = this.refs.Xaxis;
    // console.log(d3.select(xnode).range);


    console.log(this.props.width);
    const trans = "translate(" + (this.props.padding)
      + ","
      + (this.props.height - this.props.padding)
      + ")";


    const dataArray = (this.props.data.length === 0) ?
  <g></g> : this.props.data.map((d, index) => (
      <Data
        transfer={trans}
        key={index}
        offset={index}
        date={d[0]}
        gross={parseInt(d[1])}
        s_height={this.props.height - this.props.padding * 2}
        y_max={this.findMaxPoint()}
        s_width={this.props.width - (this.props.padding * 2)}
        x_max={this.findMaxDate().getTime()}
        x_min={this.findMinDate().getTime()}
      />
    ));

    const tranX = "translate(0," + (this.props.height - this.props.padding) + ")";
    //const tranX = translate(0, this.props.height - this.props.padding);
    const tranY = "translate(" + this.props.padding + ", 0)";
    const tranAxis = "translate(" + (this.props.padding + 15) + ", " + (this.props.height - this.props.padding - 5) + ")";
    //console.log("s_w", this.props.width - (this.props.padding * 2));
    return (
      <g>
        {dataArray}
        <g className="axis" ref="Xaxis" transform={tranX}></g>
        <text className="axisLabel" y="30" x={this.props.width / 2} transform={tranX}>Date</text>
        <g className="axis" ref="Yaxis" transform={tranY}></g>
        <text className="axisLabel" x={this.props.height/6} transform={tranAxis + "rotate(-90)"}>GDP (billions)</text>
      </g>
    );
  }
}

Axes.propTypes = {
  data: PropTypes.array,
  width: PropTypes.number,
  height: PropTypes.number,
  padding: PropTypes.number
};

export default Axes;
