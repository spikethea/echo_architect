import React, {Component} from 'react'
import {CSSTransition} from 'react-transition-group'; // ES6

import './Notification.css'

class Notification extends Component {
    state = {
      display: false,
    };
  
    toggle = () => {
      this.setState(prevState => ({
        display: !prevState.display,
      }));
    };
    render() {
      return (<div> <button 
            className="notif-button"
            onClick={this.toggle}>Help & Tips</button>
        <div className="container">
         
        
        <CSSTransition
          in={this.state.display}
          timeout={400}
          classNames="list-transition"
          unmountOnExit
          appear
        ><div className="sidemenu">
              <ul className="list">
              <p className="list-item">This Game is best played with Headphones or Stereo Speakers.</p>
                <p className="list-item"><span style={{color:"lightgreen"}}>Green</span> = Play Sliders   <span style={{color:"red"}}>   Red</span>= Play Original</p>
                <p className="list-item">Select a Beat through the menu to Start Playing. Find <span style={{color:"#99ccff", fontWeight:"bold"}} >custom user configs</span> at the bottom</p>
                <p className="list-item">Move the sliders to change Beat, Tempo, Frequency, and Tempo.</p>
              </ul>
            </div>
            </CSSTransition>
          )
        </div>
        </div>
      )
    }
  }
  

export default Notification;
