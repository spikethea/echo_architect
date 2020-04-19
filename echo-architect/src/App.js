import React, {Component} from 'react';
import './App.css';
import './fonts/Rockwell.otf';
import Metronome from './components/Metronome'
import Notification from './components/Notification'
import MainMenu from './components/MainMenu'
import Logo from './components/Logo';
import BackgroundParticles from './components/BackgroundParticles';


class App extends Component {// Condiitional Rendering
  
  constructor(props) {
  super(props);
  this.state = { 
    menuDisplayed:false,
    countdown:false 
              };
  }
  
  isMenuDisplayed () {
        if (!this.state.menuDisplayed) {
           return (<div><Logo/><h1 style={{zIndex:6}} className="echo-architect">Echo Architect</h1><button className="render-button" onClick={() =>{this.setState({menuDisplayed:true})}}>Display Menu</button></div>)} 
           else return <div>
             <MainMenu/>
             
             </div>
    } 


  

  render () {
    


    return (
    <div className="App">
      <header>
      </header>

      <Notification style={{zIndex:2}}/>

      {this.isMenuDisplayed()}
      <BackgroundParticles/>

    </div>
    

      
           
)
      
  }

}

export default App;
