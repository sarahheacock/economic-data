import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import $ from "jquery";
//import * as d3 from 'd3';

import Axes from './Axes.js';


const WIDTH = $(window).width();
const HEIGHT = $(window).height();
const ADJUST = 0.8;

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      "name": "",
      "e_data": [],
      "width": Math.round(WIDTH * ADJUST),
      "height": Math.round(HEIGHT * ADJUST)
    }
  }


  componentWillMount() {
    axios.get('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json')
      .then(response => {

        this.setState((prevState) => {
          return {
            "name": response.data.source_name,
            "e_data": response.data.data,
            "width": prevState["width"],
            "height": prevState["height"]
          };

        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    const node = this.refs.graph;
    $(window).on('resize', () => {
      const new_width = Math.round($(window).width() * ADJUST);
      const new_height = Math.round($(window).height() * ADJUST);
      this.state.width = new_width;
      this.state.height = new_height;
      this.setState(this.state);
    });
  }


  render() {
    //console.log("height", $(document).height());

    console.log("w", this.state.width);

    return (
      <div className="App">
      <div><h1>Gross Domestic Product Over Time</h1></div>
      <svg className="chart" ref="graph" id="graph" height={this.state.height} width={this.state.width}>
        <title>Hello</title>
        <Axes
           data={this.state["e_data"]}
           width={this.state["width"]}
           height={this.state["height"]}
           padding={50}
        />
      </svg>
      </div>
    );
  }
}

export default App;
