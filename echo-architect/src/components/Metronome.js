import React, { Component } from 'react';
import {TweenMax, Power3} from 'gsap';
import './Metronome.css';
import click1 from './click1.wav';
import click2 from './click2.wav';
import metronome from '../metronome-base.svg';
import pendulum from '../metronome-pendulum.svg';

class Metronome extends Component {

  

    constructor(props) {
        super(props)
        this.myElement = null;//reference to the DOM node
        this.myTween = null;// reference to animation
        this.state = {
            bpm: 100,
            count: 0,
            playing: false,
            beatsPerMeasure : 4
        }
        this.click1 = new Audio(click1);
        this.click2 = new Audio(click2);
    }



    componentDidMount (prevState) {
      this.myTween = TweenMax.to(this.myElement, {duration:(60/this.state.bpm),repeat: -1,rotation: 45, transformOrigin: '0% 100%', yoyo:true, ease:"none"});
      this.myTween.pause()
    }

    

    startStop = () => {
      
        if (this.state.playing) {
          this.myTween.restart()
          this.myTween.pause()
          // Stop the timer
          clearInterval(this.timer);
          this.setState({
            playing: false
          });
        } else {
          // Start a timer with the current BPM
          this.myTween.kill()
          this.myTween.restart();
          this.myTween = TweenMax.to(this.myElement, {duration:(60/this.state.bpm),repeat: -1,rotation: 45, transformOrigin: '0% 100%', yoyo:true, ease:"none"});
          
          this.timer = setInterval(
            this.playClick,
            (60 / this.state.bpm) * 1000
          );
          this.setState(
            {
              count: 0,
              playing: true
              // Play a click "immediately" (after setState finishes)
            }
          );
        }
      };

    handleBpmChange = event => {
      
        const bpm = event.target.value;
        if (this.state.playing) {
            this.myTween.pause()
            clearInterval(this.timer);
            this.timer = setInterval(this.playClick, (60 / bpm)* 1000)

            this.setState({
                count:0,
                bpm
            });

            } else {

                this.setState({ bpm });
            }
        
        
    }

    playClick = () => {
        const { count, beatsPerMeasure } = this.state;

        // The first beat will have a different sound than the others
        if (count % beatsPerMeasure === 0) {
          this.click2.play();
        } else {
          this.click1.play();
        }
      console.log({count})
        // Keep track of which beat we're on
        this.setState(state => ({
          count: (state.count + 1) % state.beatsPerMeasure
        }));
      };

    render() {
        const {playing, bpm, beatsPerMeasure} = this.state;

    return (
      <div>
        <div className="bpm-timer">
            <div className="bpm-slider">
                <div>{bpm} BPM</div>
                <input
                    type="range" 
                    min="60" 
                    max="240" 
                    value={bpm}
                    onChange={this.handleBpmChange} />
            </div>
            <button onClick={this.startStop}>{playing ? 'Stop' : 'Start'}</button>
            <div>{beatsPerMeasure}</div>
            
        </div>
          <div className="metronome" alt="metronome">
            <img className="metronome-base" alt="metronome-base" src={metronome}></img>
            <img ref={div => this.myElement = div} src={pendulum} className="metronome-pendulum" alt="metronome-pendulum"></img>
          </div>
      </div>
    )
  }
}

export default Metronome;