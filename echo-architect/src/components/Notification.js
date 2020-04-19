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
                <li className="list-item">Green: Play Sliders</li>
                <li className="list-item">Red: Play Original Audio</li>
                <li className="list-item"></li>
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
