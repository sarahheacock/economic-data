import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import Data from './Data.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "name": "",
      "e_data": []
    }
  }

  componentDidMount() {
    axios.get('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json')
      .then(response => {
        this.setState({
          "name": response.data.source_name,
          "e_data": response.data.data
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    console.log(this.state);
    const dataArray = this.state.e_data.map((d, index) => (
      <Data
        key={index}
        date={d[0]}
        gross={parseInt(d[1])}
      />
    ));

    return (
      <div className="App">
      <h1>{this.state.name}</h1>
      <svg className="chart">
        <title>Hello</title>
        {dataArray}
      </svg>
      </div>
    );
  }
}

export default App;
