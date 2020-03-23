import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Metronome from './components/Metronome'
import Notification from './components/Notification'
import MainMenu from './components/MainMenu'
import Logo from './components/Logo';
import Sketchp5 from './components/Sketchp5';
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
           return (<div><Logo/><button className="render-button" onClick={() =>{this.setState({menuDisplayed:true})}}>Display Menu</button></div>)} 
           else return <MainMenu style={{zIndex:3}}/>
    } 


  

  render () {
    


    return (
    <div className="App">
      <header>
      </header>
      <Sketchp5 style={{zIndex:-1}}/>
      <Notification style={{zIndex:2}}/>
      <Metronome style={{zIndex:1}}/>
      {this.isMenuDisplayed()}
      <BackgroundParticles style={{zIndex:-2}} />
    </div>
    

      
           
)
      
  }

}

export default App;
