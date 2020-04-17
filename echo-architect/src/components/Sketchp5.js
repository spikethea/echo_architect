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
    this.btn1 = 0;
    this.btn2 = 0;
    this.width = window.innerWidth;
    this.height = window.innerHeight*0.9;
    
    
    this.database = [];
    this.data = [];

    this.gameState = 2; //0 = ready, 1 = create new, 2 = retrieve new code, 3 waiting for new code, 4 = playing current, 5 = playing target
    this.original = [0, 0, 0, 0]; //[beat,melody,ambient,tempo]
    this.current = [4, 4, 4, 4]; //what the user changes
    this.fft = new p5sound.FFT();
    

    
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
      
    
    //this.beatOrg = new p5sound.SoundFile("https://cdn.glitch.com/d74188cf-2271-4e07-b8f6-5a3fb2c58afe%2Fbeat_"+this.original[0]+".wav?v=1582204180625");
    //this.melodyOrg = new p5sound.SoundFile("https://cdn.glitch.com/d74188cf-2271-4e07-b8f6-5a3fb2c58afe%2Fmelody_"+this.original[1]+".wav?v=1582204180625");
    //this.ambienceOrg = new p5sound.SoundFile ("https://cdn.glitch.com/d74188cf-2271-4e07-b8f6-5a3fb2c58afe%2Fambient_"+this.original[2]+".wav?v=1582204180625")
  }

  preload = p5 => {

  }
  
  setup = (p5, canvasParentRef) => {
    
    p5.createCanvas(this.width, this.height).parent(canvasParentRef); // use parent to render canvas in this ref (without that p5 render this canvas outside your component)
    p5.textSize(30);
    console.log(this.beat)
    //this.beat[4].play();
    //this.melody.play();
    //this.ambience.play();
    //this.beatOrg.play();
    //this.melodyOrg.play();
    //this.ambience.play();
    
  }

  visualiserLoop(waveform, width, height, p5) {
    //console.log(this.spectrum);
    
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
     p5.stroke(255,0,0,10);
    else if (this.gameState === 5)
    p5.stroke(0,255,0,10);
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
     p5.stroke(255,0,0,5);
    else if (this.gameState === 5)
     p5.stroke(0,255,0,5);
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
    p5.fill(255,255,0);
  }

  async recieveDatabase(original, beat, melody, ambience, p5) {
    try {
      // console.log("game state: " + gameState);
      this.gameState = 3;
      const port = process.env.PORT || 8081;
      const response = await fetch(`http://localhost:${port}/api/`); //await /api fetch connection
      const data = await response.json(); //await the response in json form
      this.database = data;
      console.log(data);
      let randomer = Math.floor(Math.random() * this.database.length);
      original = this.database[this.props.songchoice].current;
      console.log(original)
      beat[original[0]].rate(original[3]);
      melody[original[1]].rate(original[3]);
      this.gameState = 0;
      //console.log("how many times");
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
          console.log("playing");
        }
        
        // beat.setVolume = 0.1;
        // melody.setVolume = 0.1;
        // ambience.setVolume = 0.1;
        beat[current[0]].rate(1+(p5.int(current[3])-4)/8);
        melody[current[1]].rate(1+(p5.int(current[3])-4)/8);
        //beat.currentTime = 0;
        //melody.currentTime = 0;

        this.gameState = 4;
        console.log(this.gameState);
      } else if (this.gameState === 4) {
        
        beat[current[0]].stop();
        melody[current[1]].stop();
        this.gameState = 0;
        console.log(this.gameState);
        // console.log("working")
        
        //run the check here to see if they match up, play animation of somesort??
        this.checking(original, current, this.gameState);
      }
          this.btn1 = 0;
  }

  async sendData(current) {
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
    console.log(json);
  }

  originalAudio(beat, melody, ambience, beatOrg, melodyOrg, ambienceOrg, current, original, database, p5) {
    

    
    if (this.gameState === 0) {
      /*
      ambient.src =
        "https://cdn.glitch.com/d74188cf-2271-4e07-b8f6-5a3fb2c58afe%2Fambient_" +
        original[2] +
        ".wav?v=1582204180625";
      melody.src =
        "https://cdn.glitch.com/d74188cf-2271-4e07-b8f6-5a3fb2c58afe%2Fmelody_" +
        original[1] +
        ".wav?v=1582204180625";
      beat.src =
        "https://cdn.glitch.com/d74188cf-2271-4e07-b8f6-5a3fb2c58afe%2Fbeat_" +
        original[0] +
        ".wav?v=1582204180625";
      */
     this.gameState = 5;
      //initialise
      beat[original[0]].volume = 0.1;
      melody[original[0]].volume = 0.1;
      //beat.currentTime = 0;
      //melody.currentTime = 0;
      if (!beat[original[0]].isPlaying() && !melody[original[0]].isPlaying()) {

        beat[original[0]].rate(1+(p5.int(original[3])-4)/8);
        melody[original[1]].rate(1+(p5.int(original[3])-4)/8);

        beat[original[0]].loop();
        melody[original[1]].loop();

      }     
      
    } 
    else if (this.gameState === 1) {
      this.sendData(current);
      this.gameState = 0;
      let randomer = Math.floor(Math.random() * database.length);
      console.log(database);
      original = database[randomer].current;
      this.btn2 = 1;
    }
    else if (this.gameState === 5) {
      beat[original[0]].stop();
      melody[original[1]].stop();
      this.gameState = 0;
    }
    this.btn2 = 0;
  }


  checking(original, current, gameState) {
    if (
      original[0] === current[0] &&
      original[1] === current[1] &&
      original[2] === current[2] &&
      original[3] === current[3]
    ) gameState = 1;
  }
  // console.log(this.x,this.y,this.x1,this.y1);
  // NOTE: Do not use setState in draw function or in functions that is executed in draw function... pls use normal variables or class properties for this purposes
    
  draw = p5 => {
    
    p5.background('#00020B');
    this.currentDisplay(p5);
    // this.xPos = p5.map(this.x,0,1024,0,500);
    // this.yPos = p5.map(this.y,0,1024,0,500);
    // this.xSize = p5.map(this.x1,0,1024,0,500);
    // this.ySize = p5.map(this.y1,0,1024,0,500);
    // p5.ellipse(this.xPos, this.yPos, this.xSize, this.ySize);
    //console.log(this.database);
    //console.log(this.gameState)  
    if (this.beat[9].isLoaded() === true && this.melody[9].isLoaded() === true) {
      console.log("beat loaded!")
      this.loading = false
    }
   
    if (this.gameState === 2) {
      //console.log("receiving database");

    this.recieveDatabase( this.original, this.beat, this.melody, this.ambience);
    //  console.log(this.database);
    }
    this.visualiserLoop(this.spectrum, this.width, this.height, p5);
    if (this.gameState === 0) {
      p5.text("Try to match the music that plays when you press the GREEN button to the music that plays from RED button by using sliders",10,10,this.width-10,this.height-10);
    }
    else if (this.gameState === 2) {
      p5.text("Please wait, loading blueprints and sounds",10,10,this.width-10,this.height-10);
    }
    else if (this.gameState === 1) {
      p5.text("YOU WIN, create your own blueprint and press RED button to submit the combination to our database.",10,10,this.width-10,this.height-10);
    }

    if (this.btn1 === 1) {
      
      this.toggleAudio(this.beat, this.melody, this.ambience, this.current, this.original, p5);

    } else if (this.btn2 === 1 ) {
      //console.log(this.gameState)  
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
    //console.log("received OSC: " + address + ", " + value);

    if (address === '/analogue') {
      
      //console.log("connected!");
      this.x = Math.round(value[0]/1024*9);
      this.y = Math.round(value[1]/1024*9);
      this.x1 = Math.round(value[2]/1024*9);
      this.y1 = Math.round(value[3]/1024*9);
      if (value[4] === 1) {
        //timebtn1= 0
        this.timebtn1++
        console.log(this.timebtn1)
      } else if (value[4] === 0)
       {this.timebtn1 = 0;}
      
      if (this.timebtn1 === 10) {
        this.btn1 = value[4];
      }
      

      this.btn2 = value[5];

      this.current = [this.x, this.y, this.x1, this.y1];
      console.log(this.current);
      console.log(this.btn1, this.btn2);
      
    }
  }

  buttonOne () { if (this.loading === false) {
    
      
      this.btn1 = 1;
      console.log("bnt1: " + this.btn1);

      
    }
  }

  buttonTwo () { if (this.loading === false) {
    this.btn2 = 1;
    console.log("bnt2: " + this.btn2);

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
        if (this.current[j] == i) {
          p5.fill(0,255,0);
        }
        p5.rect(i*10,25*j,8,23);
      }
    }
    p5.textSize(20);
    p5.text('Beat',102,0,100,100);
    p5.text('Melody',102,25,100,100);
    p5.text('Pan',102,50,100,100);
    p5.text('Tempo',102,75,100,100);
    p5.pop();
  }
  
  render() {
    
//<button className="p5-button" style={{position: "absolute", top: "6em", zIndex:4}} id="p5_loading" onClick={()=>this.buttonOne()}>Toggle Audio</button>
//      <button className="p5-button" style={{position: "absolute", top: "6em", left:"30em", zIndex:6}} onClick={()=>this.buttonTwo()}>Original Audio</button>

   return( 
    <div> 
      
      <Sketch setup={this.setup} draw={this.draw} />
    </div>);
  }

}