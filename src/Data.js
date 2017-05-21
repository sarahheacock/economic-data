import React, { PropTypes, Component } from 'react';
import $ from "jquery";
import * as d3 from 'd3';
import Label from './Label.js'

const textColor = "#96ceb4";
const newColor = "#ffeead"
const initialColor = "#ff6f69";
class Data extends Component {


  // const xnode = this.refs.Xaxis;
  // const ynode = this.refs.Yaxis;
  // d3.select(xnode).call(xAxis);
  // d3.select(ynode).call(yAxis);

  componentDidMount(){
    $("#" + this.props.offset)
      .mouseover(() => {
        $("#" + this.props.offset).attr("fill", newColor);
        $("#" + this.props.offset + "label").css("opacity", 1);
        //d3.select(this).selectAll('circle').enter().append('circle');
        //console.log(d3.select(this))
      })
      .mouseout(() => {
        $("#" + this.props.offset).attr("fill", initialColor);
        $("#" + this.props.offset + "label").css("opacity", 0);
      });
   }



  render(){
    const amount = (this.props.gross / this.props.y_max) * this.props.s_height;
    const da = new Date(this.props.date)
    const d = da.getTime();
    //console.log("width", this.props.s_width);
    const w = 4;
    const x_pos = (((d - this.props.x_min) / (this.props.x_max - this.props.x_min)) * this.props.s_width) - w/2;
    //console.log("x", x_pos);

    return (
      <g>

        <rect
          ref={this.props.offset}
          transform={this.props.transfer}
          id={this.props.offset}
          x={x_pos - w/2}
          y={amount * -1}
          height={amount}
          width={w}
          fill={initialColor}
        />
        <Label
          identify={this.props.offset + "label"}
          x_position={x_pos - w/2}
          y_position={amount * -1}
          transfer={this.props.transfer}
          date={da.toString()}
          gross={this.props.gross}
          color={textColor}
        />
      </g>
    );
  }
}


Data.propTypes = {
  date: PropTypes.string.isRequired,
  offset: PropTypes.number.isRequired,
  gross: PropTypes.number.isRequired,
  transfer: PropTypes.string.isRequired,
  s_height: PropTypes.number.isRequired,
  y_max: PropTypes.number.isRequired,
  s_width: PropTypes.number.isRequired,
  x_min: PropTypes.number.isRequired,
  x_max: PropTypes.number.isRequired
}

export default Data;
