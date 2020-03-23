import React, { Component } from "react";
import Sketch from "react-p5";
import socketIOClient from 'socket.io-client';
 
export default class Sketchp5 extends Component {


  constructor() {
    super();
    this.state = {
      endpoint: "http://127.0.0.1:8081", // this is telling our socket.io client to connect to our bridge.js node local server on port 8081
      oscPortIn: 7500, // this will configure our bridge.js node local server to receive OSC messages on port 7500
      oscPortOut: 3331 // this will configure our bridge.js node local server to send OSC messages on port 3331 (we're not actually sending anything in this sketch but it is required)
    };
    this.x = 50; // initial starting x point of our circle
    this.xPos = 0;
    this.y = 50; // initial starting y point of our circle
    this.yPos = 0;
  }

 
  setup = (p5, canvasParentRef) => {
    p5.createCanvas(500, 500).parent(canvasParentRef); // use parent to render canvas in this ref (without that p5 render this canvas outside your component)
  };
  draw = p5 => {
    p5.background(0,0,0,0);
    this.xPos = p5.map(this.x,0,1024,0,500);
    this.yPos = p5.map(this.y,0,1024,0,500);
    p5.ellipse(this.xPos, this.yPos, 70, 70);
    // NOTE: Do not use setState in draw function or in functions that is executed in draw function... pls use normal variables or class properties for this purposes
  };


  componentDidMount () {
    const { endpoint } = this.state; // using our endpoint from state object - this is a modern ES6 way of accessing a data scructure call destructuring assignment
    const { oscPortIn } = this.state; // using our in port for OSC from state object
    const { oscPortOut } = this.state; // using our out port for OSC from state object

    
    const socket = socketIOClient(endpoint); // create an instance of our socket.io client

    socket.on('connect', function() { // connect and configure local server with settings from the state object
      socket.emit('config', { 
        server: { port: oscPortIn,  host: '127.0.0.1'},
        client: { port: oscPortOut, host: '127.0.0.1'}
      });
    });
    socket.on('message', (function(msg) { // once we receive a message, process it a bit then call this.receiveOSC()
      if (msg[0] === '#bundle') { // treat it slightly differently if it's a bundle or not
        for (var i=2; i<msg.length; i++) {
          this.receiveOsc(msg[i][0], msg[i].splice(1));
        }
      } else {
        this.receiveOsc(msg[0], msg.splice(1));
      }
    }).bind(this)); // we have to explicitly bind this to the upper execution context so that we can call this.receiveOSC()
}

  receiveOsc(address, value) {
    console.log("received OSC: " + address + ", " + value);

    if (address === '/analogue') {
      console.log("connected!");
      this.x = value[0];
      this.y = value[1];
    }
  }
  
  render() {
    return <Sketch setup={this.setup} draw={this.draw} />;
  }

}