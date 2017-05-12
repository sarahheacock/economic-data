import React, { PropTypes } from 'react';

const Data = (props) => (
  <g>
    <circle cx={props.gross} cy={20} r={2} fill="green"  />
  </g>
);

Data.propTypes = {
  date: PropTypes.string.isRequired,
  gross: PropTypes.number.isRequired
}

export default Data;
