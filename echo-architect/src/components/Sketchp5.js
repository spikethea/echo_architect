import React, { Component } from "react";
import Sketch from "react-p5";
import p5sound from "p5";
import "p5/lib/addons/p5.sound";
import socketIOClient from 'socket.io-client';

export default class Sketchp5 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      endpoint: "http://127.0.0.1:8081", // this is telling our socket.io client to connect to our bridge.js node local server on port 8081
      oscPortIn: 7500, // this will configure our bridge.js node local server to receive OSC messages on port 7500
      oscPortOut: 3331 // this will configure our bridge.js node local server to send OSC messages on port 3331 (we're not actually sending anything in this sketch but it is required)
    };
    this.x = 0; // initial starting x point of our circle
    // this.xPos = 0;
    this.y = 0; // initial starting y point of our circle
    // this.yPos = 0;
    this.x1 = 0;
    this.y1 = 0;
    this.xSize = 0;
    this.ySize = 0;
    this.btn1 = 0;
    this.btn2 = 0;
    this.width = 500;
    this.height = 500;
    

    this.database = [];
    this.data = [];

    this.gameState = 2; //0 = ready, 1 = create new, 2 = retrieve new code, 3 waiting for new code, 4 = playing current, 5 = playing target
    this.original = [0, 0, 0, 0]; //[beat,melody,ambient,tempo]
    this.current = [4, 4, 4, 4]; //what the user changes
    this.fft = new p5sound.FFT();
    this.spectrum = this.fft.analyze();
    
    this.beat = new p5sound.SoundFile("https://cdn.glitch.com/d74188cf-2271-4e07-b8f6-5a3fb2c58afe%2Fbeat_"+this.current[0]+".wav?v=1582204180625");
    this.melody = new p5sound.SoundFile("https://cdn.glitch.com/d74188cf-2271-4e07-b8f6-5a3fb2c58afe%2Fmelody_"+this.current[1]+".wav?v=1582204180625");
    this.ambience = new p5sound.SoundFile("https://cdn.glitch.com/d74188cf-2271-4e07-b8f6-5a3fb2c58afe%2Fambient_"+this.current[1]+".wav?v=1582204180625");
    this.beatOrg = new p5sound.SoundFile("https://cdn.glitch.com/d74188cf-2271-4e07-b8f6-5a3fb2c58afe%2Fbeat_"+this.original[0]+".wav?v=1582204180625");
    this.melodyOrg = new p5sound.SoundFile("https://cdn.glitch.com/d74188cf-2271-4e07-b8f6-5a3fb2c58afe%2Fmelody_"+this.original[1]+".wav?v=1582204180625");
    this.ambienceOrg = new p5sound.SoundFile ("https://cdn.glitch.com/d74188cf-2271-4e07-b8f6-5a3fb2c58afe%2Fambient_"+this.original[2]+".wav?v=1582204180625")
  }

  preload = p5 => {
    this.beat = p5sound.loadSound("https://cdn.glitch.com/d74188cf-2271-4e07-b8f6-5a3fb2c58afe%2Fmelody_"+this.current[1]+".wav?v=1582204180625");
    this.melody = p5sound.loadSound("https://cdn.glitch.com/d74188cf-2271-4e07-b8f6-5a3fb2c58afe%2Fmelody_"+this.current[1]+".wav?v=1582204180625");
    this.ambience = p5sound.loadSound("https://cdn.glitch.com/d74188cf-2271-4e07-b8f6-5a3fb2c58afe%2Fambient_"+this.current[1]+".wav?v=1582204180625");
    this.beatOrg = p5sound.loadSound("https://cdn.glitch.com/d74188cf-2271-4e07-b8f6-5a3fb2c58afe%2Fbeat_"+this.original[0]+".wav?v=1582204180625");
    this.melodyOrg = p5sound.loadSound("https://cdn.glitch.com/d74188cf-2271-4e07-b8f6-5a3fb2c58afe%2Fmelody_"+this.original[1]+".wav?v=1582204180625");
    this.ambienceOrg = p5sound.loadSound("https://cdn.glitch.com/d74188cf-2271-4e07-b8f6-5a3fb2c58afe%2Fambient_"+this.original[2]+".wav?v=1582204180625");
  }
  
  setup = (p5, canvasParentRef) => {
    p5.createCanvas(this.width, this.height).parent(canvasParentRef); // use parent to render canvas in this ref (without that p5 render this canvas outside your component)
    p5.textSize(30);
    //this.beat.play();
    //this.melody.play();
    //this.ambience.play();
    //this.beatOrg.play();
    //this.melodyOrg.play();
    //this.ambience.play();
    
  }

  visualiserLoop(gameState, spectrum, width, height, p5) {
    //console.log(p5);
    //let spectrum = this.fft.analyze();
    p5.noStroke();
    p5.fill(255, 255, 0);
    // console.log("game state: " + gameState);
    if (gameState === 4) {
      p5.fill(0, 255, 0);
    }
    if (gameState === 5) {
      p5.fill(255, 0, 0);
    }
    for (let i = 0; i< spectrum.length; i++){
      let x = p5.map(i, 0, spectrum.length, 0, width);
      let h = -height + p5.map(spectrum[i], 0, 255, height, 0);
      p5.rect(x, height, width / spectrum.length, h );
    }
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
      original = this.database[randomer].current;
      console.log(original)
      beat.rate(original[3]);
      melody.rate(original[3]);
      ambience.rate(original[3]);
      this.gameState = 0;
      console.log(this.gameState);
      
      return (this.database)
    } catch (err) {
      console.log(err); //console.log any errors recieved if failed to get database
      this.gameState = 2;
    }
  }

  toggleAudio(gameState, beat, melody, ambience, current, original, p5) {
    if (gameState === 0) {
      //initialise
      if (!beat.isPlaying() && !melody.isPlaying() && !ambience.isPlaying()) {
        beat.loop();
        melody.loop();
        ambience.loop();
      }
      
      // beat.setVolume = 0.1;
      // melody.setVolume = 0.1;
      // ambience.setVolume = 0.1;
      beat.rate(1+(p5.int(current[3])-4)/8);
      melody.rate(1+(p5.int(current[3])-4)/8);
      ambience.rate(1+(p5.int(current[3])-4)/8);
      //beat.currentTime = 0;
      //melody.currentTime = 0;
      gameState = 4;
      
    } else if (gameState === 4) {
      this.beat.stop();
      this.melody.stop();
      this.ambience.stop();
      gameState = 0;
      // console.log("working")
      
      //run the check here to see if they match up, play animation of somesort??
      this.checking(original, current, gameState);
    }
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

  originalAudio(gameState, beat, melody, ambience, beatOrg, melodyOrg, ambienceOrg, current, original, database, p5) {
    if (gameState === 0) {
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
      gameState = 5;
      //initialise
      beat.volume = 0.1;
      melody.volume = 0.1;
      ambience.volume = 0.1;
      //beat.currentTime = 0;
      //melody.currentTime = 0;
      if (!beatOrg.isPlaying() && !melodyOrg.isPlaying() && !ambienceOrg.isPlaying()) {
        beatOrg.loop();
        melodyOrg.loop();
        ambienceOrg.loop();
      }     
      
    } 
    else if (gameState === 1) {
      this.sendData(current);
      gameState = 0;
      let randomer = Math.floor(Math.random() * database.length);
      console.log(database);
      original = database[randomer].current;
      beatOrg.rate(1+(p5.int(current[3])-4)/8);
      melodyOrg.rate(1+(p5.int(current[3])-4)/8);
      ambienceOrg.rate(1+(p5.int(current[3])-4)/8);
      this.btn2 = 1;
    }
    else if (gameState === 5) {
      beatOrg.p5sound.stop();
      melodyOrg.p5sound.stop();
      ambienceOrg.p5sound.stop();
      gameState = 0;
    }
  }


  checking(original, current, gameState) {
    if (
      original[0] == current[0] &&
      original[1] == current[1] &&
      original[2] == current[2] &&
      original[3] == current[3]
    ) gameState = 1;
  }
  // console.log(this.x,this.y,this.x1,this.y1);
  // NOTE: Do not use setState in draw function or in functions that is executed in draw function... pls use normal variables or class properties for this purposes
    
  draw = p5 => {
    p5.background(0, 0, 0);
    // this.xPos = p5.map(this.x,0,1024,0,500);
    // this.yPos = p5.map(this.y,0,1024,0,500);
    // this.xSize = p5.map(this.x1,0,1024,0,500);
    // this.ySize = p5.map(this.y1,0,1024,0,500);
    // p5.ellipse(this.xPos, this.yPos, this.xSize, this.ySize);
    //console.log(this.database);
   
    if (this.gameState === 2) {
      console.log("receiving database");
    console.log(this.gameState)  
    this.recieveDatabase( this.original, this.beat, this.melody, this.ambience);
      console.log(this.database);
    }
    this.visualiserLoop(this.gameState, this.spectrum, this.width, this.height, p5);
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
      this.gameState = 0;
      // console.log(this.gameState);
      this.toggleAudio(this.gameState, this.beat, this.melody, this.ambience, this.current, this.original, p5);
    } else if (this.btn2 === 2) {
      console.log(this.gameState)  
      this.originalAudio(this.gameState, this.beat, this.melody, this.ambience, this.beatOrg, this.melodyOrg, this.ambienceOrg, this.current, this.original, this.database, p5);
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
      console.log("connected!");
      this.x = Math.round(value[0]/1024*9);
      this.y = Math.round(value[1]/1024*9);
      this.x1 = Math.round(value[2]/1024*9);
      this.y1 = Math.round(value[3]/1024*9);
      
      this.current = [this.x, this.y, this.x1, this.y1];
      console.log(this.current);
      //this.btn2 = value[5];
    }
  }

  buttonOne () {
    this.btn1 = 1;
    console.log("bnt1: " + this.btn1);
  }

  buttonTwo () {
    this.btn2 = 2;
    console.log("bnt2: " + this.btn1);
  }
  
  render() {
    return( 
    <div>
      <button onClick={()=>this.buttonOne()}>Toggle Audio</button>
      <button onClick={()=>this.buttonTwo()}>Original Audio</button>
      <Sketch setup={this.setup} draw={this.draw} />
    </div>);
  }

}