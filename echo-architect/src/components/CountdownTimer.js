import React, {Component, useRef, useEffect} from 'react';
import {TweenMax, Power3} from 'gsap';
import moneytrees from './money-trees.mp3';

const song = new Audio(moneytrees);

class CountdownTimer extends Component {
    
    constructor (props) {
        super(props)
        
        this.state= {
            count: 3,
            countdown: false,
        }
        
        this.aboutTween = null;
        this.aboutSection = null;

        this.buttonPress = this.buttonPress.bind(this);
        this.countdownInterval = this.countdownInterval.bind(this);

        
        
    }

    componentDidMount (){
        
    }
    
    countdownInterval () {

        if (this.state.count > 0) {
            this.setState(prevState => ({count: prevState.count - 1}), );
    } else {
        clearInterval(this.countdownInterval);
        this.aboutTween = TweenMax.to(this.aboutSection, .8,{opacity:0, y: -100, ease: Power3.easeOut});
        song.play()
        }
    }


    buttonPress () {


            clearInterval(this.countdownInterval);
            this.setState({count:3, countdown:true}, 
                ()=>{setInterval(this.countdownInterval, 3000); this.aboutTween = TweenMax.to(this.aboutSection, .8,{opacity:1, y: -100, ease: Power3.easeOut})});

    }

    render () {
    
        if (!this.state.countdown) {
        return (
            <div>
             <button style={{ position:"absolute", bottom: "60px" }} onClick={this.buttonPress}>start countdown</button>
            </div>
        )} else if(this.state.countdown) { return(<div>
            <p ref={p => this.aboutSection = p} style={{  color:"white",fontSize:"8em", position:"absolute", top: "300px", left: "1250px"}}>{this.state.count}</p>
        </div>)}

    }
}

export default CountdownTimer