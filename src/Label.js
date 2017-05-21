import React, { PropTypes, Component } from 'react';
import * as d3 from 'd3';
// const Label = (props) => {
//   return (
//     <text
//       ref={props.idenify}
//       className="look"
//       id={props.identify}
//       x={props.x_position}
//       y={props.y_position}
//       transform={props.transfer}
//       fill="red"
//     >
//       {props.date}
//     </text>
//   );
// }

class Label extends Component {
  componentDidMount() {
    //console.log(d3.select(this));

  }

  render() {
    const newDate = this.props.date.split(" ");
    const formatDate = newDate[1] + " " + newDate[3];
    return (
      <g>
        <text
          ref={this.props.identify}
          className="look"
          id={this.props.identify}
          x={this.props.x_position - 50}
          y={this.props.y_position - 20}
          transform={this.props.transfer}
          fill={this.props.color}
        >
          <tspan>{formatDate}</tspan>
          <tspan dx={'-3em'} dy='1em'>${this.props.gross}</tspan>
          <tspan dx={'-3em'} dy='1em'>billion</tspan>
        </text>
      </g>
    );
  }

}

Label.propTypes = {
  identify: PropTypes.string.isRequired,
  x_position: PropTypes.number.isRequred,
  y_position: PropTypes.number.isRequired,
  transfer: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  gross: PropTypes.number.isRequired
};

export default Label;
// identify={this.props.offset + "label"}
// x_position={x_pos - w/2}
// y_position={amount * -1}
// transform={this.props.transfer}
