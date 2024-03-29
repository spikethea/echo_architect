import React, { Component } from "react";
import Sketch from "react-p5";
import p5sound from "p5";
import "p5/lib/addons/p5.sound";
import socketIOClient from 'socket.io-client';


import beat_0 from "../assets/beat_0.mp3";
import beat_1 from "../assets/beat_1.mp3";
import beat_2 from "../assets/beat_2.mp3";
import beat_3 from "../assets/beat_3.mp3";
import beat_4 from "../assets/beat_4.mp3";
import beat_5 from "../assets/beat_5.mp3";
import beat_6 from "../assets/beat_6.mp3";
import beat_7 from "../assets/beat_7.mp3";
import beat_8 from "../assets/beat_8.mp3";
import beat_9 from "../assets/beat_9.mp3";

import melody_0 from "../assets/melody_0.mp3";
import melody_1 from "../assets/melody_1.mp3";
import melody_2 from "../assets/melody_2.mp3";
import melody_3 from "../assets/melody_3.mp3";
import melody_4 from "../assets/melody_4.mp3";
import melody_5 from "../assets/melody_5.mp3";
import melody_6 from "../assets/melody_6.mp3";
import melody_7 from "../assets/melody_7.mp3";
import melody_8 from "../assets/melody_8.mp3";
import melody_9 from "../assets/melody_9.mp3";


export default class Sketchp5 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      endpoint: "http://127.0.0.1:8081", // this is telling our socket.io client to connect to our bridge.js node local server on port 8081
      oscPortIn: 7500, // this will configure our bridge.js node local server to receive OSC messages on port 7500
      oscPortOut: 3331 // this will configure our bridge.js node local server to send OSC messages on port 3331 (we're not actually sending anything in this sketch but it is required)
    };

    this.loading = true;
    this.x = 0; // initial starting x point of our circle
    // this.xPos = 0;
    this.y = 0; // initial starting y point of our circle
    // this.yPos = 0;
    this.x1 = 0;
    this.y1 = 0;
    this.xSize = 0;
    this.ySize = 0;
    this.timebtn1 = 0;
    this.timebtn2 = 0;
    this.btn1 = 0;
    this.btn2 = 0;
    this.width = window.innerWidth;
    this.height = window.innerHeight*0.9;
    
    
    this.database = [];
    this.data = [];

    this.gameState = 2; //0 = ready, 1 = create new, 2 = retrieve new code, 3 waiting for new code, 4 = playing current, 5 = playing target
    this.original = [9, 9, 9, 9]; //[beat,melody,ambient,tempo]
    this.current = [0, 0, 0, 0]; //what the user changes
    this.fft = new p5sound.FFT();
    this.gameWon = false
    

    
      this.beat = [
        new p5sound.SoundFile(beat_0),
        new p5sound.SoundFile(beat_1),
        new p5sound.SoundFile(beat_2),
        new p5sound.SoundFile(beat_3),
        new p5sound.SoundFile(beat_4),
        new p5sound.SoundFile(beat_5),
        new p5sound.SoundFile(beat_6),
        new p5sound.SoundFile(beat_7),
        new p5sound.SoundFile(beat_8),
        new p5sound.SoundFile(beat_9),
      ]

      this.melody = [
        new p5sound.SoundFile(melody_0),
        new p5sound.SoundFile(melody_1),
        new p5sound.SoundFile(melody_2),
        new p5sound.SoundFile(melody_3),
        new p5sound.SoundFile(melody_4),
        new p5sound.SoundFile(melody_5),
        new p5sound.SoundFile(melody_6),
        new p5sound.SoundFile(melody_7),
        new p5sound.SoundFile(melody_8),
        new p5sound.SoundFile(melody_9),
      ]

  }

  preload = p5 => {

  }
  
  setup = (p5, canvasParentRef) => {
    
    p5.createCanvas(this.width, this.height).parent(canvasParentRef); // use parent to render canvas in this ref (without that p5 render this canvas outside your component)
    p5.textSize(30);

  }

  visualiserLoop(waveform, width, height, p5) {

    
    waveform = this.fft.waveform();
    p5.push();
    p5.noFill();
    p5.beginShape();
    p5.stroke(255,255,255,255);
    p5.strokeWeight(2);
    for (let i = 0; i < waveform.length; i++){
      let x = p5.map(i, 0, waveform.length, 0, width);
      let y = p5.map( waveform[i], -1, 1, 0, height);
      p5.vertex(x,y);
    }
    p5.endShape();

    p5.beginShape();
    if (this.gameState === 4)
     p5.stroke(0,255,0,18);
    else if (this.gameState === 5)
    p5.stroke(255,0,0,18);
     else if (this.gameState === 0)
    p5.stroke(255,255,255,18);

    p5.strokeWeight(20);
    for (let i = 0; i < waveform.length; i++){
      let x = p5.map(i, 0, waveform.length, 0, width);
      let y = p5.map( waveform[i], -1, 1, 0, height);
      p5.vertex(x,y);
    }
    p5.endShape();

    p5.beginShape();
    if (this.gameState === 4)
     p5.stroke(0,255,0,10);
    else if (this.gameState === 5)
    p5.stroke(255,0,0,10);
     else if (this.gameState === 0)
    p5.stroke(255,255,255,10);

    p5.strokeWeight(50);
    for (let i = 0; i < waveform.length; i++){
      let x = p5.map(i, 0, waveform.length, 0, width);
      let y = p5.map( waveform[i], -1, 1, 0, height);
      p5.vertex(x,y);
    }
    p5.endShape();

    p5.beginShape();
    if (this.gameState === 4)
     p5.stroke(0,255,0,5);
    else if (this.gameState === 5)
     p5.stroke(255,255,0,5);
    else if (this.gameState === 0)
     p5.stroke(255,255,255,5);
     
    p5.strokeWeight(150);
    for (let i = 0; i < waveform.length; i++){
      let x = p5.map(i, 0, waveform.length, 0, width);
      let y = p5.map( waveform[i], -1, 1, 0, height);
      p5.vertex(x,y);
    }
    p5.endShape();

    p5.pop();
    p5.stroke(0);
    p5.fill(240,240,255);
  }

  async recieveDatabase(beat, melody, ambience, p5) {
    try {

      this.gameState = 3;
      const port = process.env.PORT || 8081;
      const response = await fetch(`http://localhost:${port}/api/`); //await /api fetch connection
      const data = await response.json(); //await the response in json form
      this.database = data;


      this.original = this.database[this.props.songchoice].current;

      beat[this.original[0]].rate(this.original[3]);
      melody[this.original[1]].rate(this.original[3]);
      this.gameState = 0;
      

      return this.database;
    } catch (err) {
      console.log(err); //console.log any errors recieved if failed to get database
      this.gameState = 2;
    }
  }

  toggleAudio(beat, melody, ambience, current, original, p5) {


    

      if (this.gameState === 0) {
        //initialise
        if (!beat[current[0]].isPlaying() && !melody[current[1]].isPlaying()) {
          beat[current[0]].loop();
          melody[current[1]].loop();
        }
        


        
        let panning = p5.map (current[2],0,9,-1,1);

        let volumeDist = ((9-p5.dist(original[2], 0, current[2], 0) )/9);

        let volumeMap = p5.map(volumeDist,0, 1 , 0.01, 1)


        beat[current[0]].pan(panning);
        melody[current[1]].pan(panning);

        beat[current[0]].setVolume(volumeMap);
        melody[current[1]].setVolume(volumeMap);
        
        beat[current[0]].rate(1+(p5.int(current[3])-4)/8);
        melody[current[1]].rate(1+(p5.int(current[3])-4)/8);

        



        this.gameState = 4;

      } else if (this.gameState === 4) {
        
        beat[current[0]].stop();
        melody[current[1]].stop();
        this.gameState = 0;


        //run the check here to see if they match up, play animation of somesort??
        this.checking(this.original, this.current, this.gameState);
      }
          this.btn1 = 0;
  }

  async sendData(current) {
    this.gameWon = false;
    const data = { current }; //store the buildings the user selected and the url for reference, alongside the day they were currently viewing
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json" //data type is json
      },
      body: JSON.stringify(data) //turn data to json string for storing
    }; //settings for sending data
    const port = process.env.PORT || 8081;
    const response = await fetch(`http://localhost:${port}/api/`, options); //await /api fetch connection
    const json = await response.json(); //check it's sent and console.log the response.

  }

  originalAudio(beat, melody, ambience, beatOrg, melodyOrg, ambienceOrg, current, original, database, p5) {
    
    
    if (this.gameState === 0) {

     this.gameState = 5;
      //initialise
      beat[original[0]].volume = 1;
      melody[original[0]].volume = 1;

      if (!beat[original[0]].isPlaying() && !melody[original[0]].isPlaying()) {

        let panning = p5.map (original[2],0,9,-1,1);

        beat[original[0]].rate(1+(p5.int(original[3])-4)/8);
        melody[original[1]].rate(1+(p5.int(original[3])-4)/8);

        beat[original[0]].pan(panning);
        melody[original[1]].pan(panning);

        if (this.gameWon === false) {
        beat[original[0]].loop();
        melody[original[1]].loop();
        }

      }     
      
    } 
    else if (this.gameState === 5) {
      beat[original[0]].stop();
      melody[original[1]].stop();
      this.gameState = 0;
    }
    this.btn2 = 0;

    if (this.gameWon === true) {
      this.sendData(current);
      this.gameState = 0;
      let randomer = Math.floor(Math.random() * database.length);
      original = database[randomer].current;
      this.btn2 = 1;
    }
  }


  checking(gameState) {
    if  (
      this.original[0] === this.current[0] &&
      this.original[1] === this.current[1] &&
      this.original[2] === this.current[2] &&
      this.original[3] === this.current[3]
    ) {
    this.gameWon = true
    gameState = 1;
  }
  }
  // NOTE: Do not use setState in draw function or in functions that is executed in draw function... pls use normal variables or class properties for this purposes
    
  draw = p5 => {
    p5.background('#00020B');
    this.currentDisplay(p5);

    if (this.beat[9].isLoaded() === true && this.melody[9].isLoaded() === true) {

      this.loading = false
    }
   
    if (this.gameState === 2) {


    this.recieveDatabase(this.beat, this.melody, this.ambience);

    }
    this.visualiserLoop(this.spectrum, this.width, this.height, p5);
    if (this.gameState === 0 && this.gameWon === false) {
      p5.text("Try to match the music that plays when you press the GREEN button to the music that plays from RED button by using sliders",this.width*(1/18),this.height*(2/4)-25,this.width,this.height);
    }
    else if (this.gameState === 2 && this.gameWon === false) {
      p5.text("Please wait, loading blueprints and sounds",this.width*(1/18),this.height*(2/4)-25,this.width,this.height);
    }
     if (this.gameWon === true) {
      p5.text("YOU WIN, create your own blueprint and press RED button to submit the combination to our database.",this.width*(1/18),this.height*(2/4)-25,this.width,this.height);
    }

    if (this.btn1 === 1) {
      
      this.toggleAudio(this.beat, this.melody, this.ambience, this.current, this.original, p5);

    } else if (this.btn2 === 1 ) {

      this.originalAudio(this.beat, this.melody, this.ambience, this.beatOrg, this.melodyOrg, this.ambienceOrg, this.current, this.original, this.database, p5);

    }
  };




  // SOCKET.IO
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


    if (address === '/analogue') {
      

      this.x = Math.round(value[0]/1024*9);
      this.y = Math.round(value[1]/1024*9);
      this.x1 = Math.round(value[2]/1024*9);
      this.y1 = Math.round(value[3]/1024*9);
      if (value[4] === 1) {

        this.timebtn1++

      } else if (value[4] === 0)
       {this.timebtn1 = 0;}
      
      if (this.timebtn1 === 12) {
        this.btn1 = 1;
      }
      

      if (value[5] === 1) {

        this.timebtn2++

      } else if (value[5] === 0)
       {this.timebtn2 = 0;}
      
      if (this.timebtn2 === 12) {
        this.btn2 = 1;
      }
      

      if (this.gameState === 0|| this.gameWon === true){
        this.current = [this.x, this.y, this.x1, this.y1];
      }

      
    }
  }

  buttonOne () { if (this.loading === false) {
    
      
      this.btn1 = 1;

      
    }
  }

  buttonTwo () { if (this.loading === false) {
    this.btn2 = 1;

}
  }

  currentDisplay(p5) {
    p5.push();
    p5.translate(this.width/2,this.height-110);
    p5.noStroke();
    p5.fill(255);
    p5.rect(-2,-2,102,102);
    for (let i = 0; i<10; i++) {
      for (let j = 0; j<4; j++) {
        p5.fill(i*10,i*13,i*20);
        if (this.current[j] === i) {
          p5.fill(0,255,0);
        }
        p5.rect(i*10,25*j,8,23);
      }
    }
    p5.fill(0,255,0);
    p5.textSize(20);
    p5.text('Beat',102,0,100,100);
    p5.text('Melody',102,25,100,100);
    p5.text('Pan',102,50,100,100);
    p5.text('Tempo',102,75,100,100);
    p5.pop();
  }
  
  render() {

   return( 
    <div> 
      <Sketch  setup={this.setup} draw={this.draw} />
    </div>);
  }

}