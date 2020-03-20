import React, {useRef, useEffect} from 'react';
import logo from '../logo.svg';
import '../App.css';
import {TweenMax, Power3} from 'gsap';

function Logo () {// This is Practice, using Refs to get ahold of the SVG, and then applying GSAP animations using Tweenmax and Power3 plugins.
    let logoItem = useRef(null);

    useEffect(() => {
        console.log(logoItem);
        TweenMax.to(logoItem, .8,{opacity:1, y: -50, ease: Power3.easeOut})
    }, [])



    return (
        <div>
            <img ref={element => {logoItem = element}} src={logo} className="App-logo" alt="logo"></img>
        </div>
    )
}

export default Logo