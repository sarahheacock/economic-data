import React, { PropTypes, Component } from 'react';

class Data extends Component {
  render(){
    const amount = (this.props.gross / this.props.y_max) * this.props.s_height;
    const d = new Date(this.props.date).getTime();
    //console.log("width", this.props.s_width);
    const w = 4;
    const x_pos = Math.round(((d - this.props.x_min) / (this.props.x_max - this.props.x_min)) * this.props.s_width) - w/2;
    console.log("x", x_pos);

    return (
      <g transform={this.props.transfer}>
        <rect
          x={x_pos - w/2}
          y={amount * -1}
          height={amount}
          width={w}
          fill="green"
        />
      </g>
    );
  }

}

Data.propTypes = {
  date: PropTypes.string.isRequired,
  gross: PropTypes.number.isRequired,
  transfer: PropTypes.string.isRequired,
  s_height: PropTypes.number.isRequired,
  y_max: PropTypes.number.isRequired,
  s_width: PropTypes.number.isRequired,
  x_min: PropTypes.number.isRequired,
  x_max: PropTypes.number.isRequired
}

export default Data;
