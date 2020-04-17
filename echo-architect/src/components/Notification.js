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
                <li className="list-item">Rajat</li>
                <li className="list-item">Writes Posts</li>
                <li className="list-item">Loves Pizza</li>
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
