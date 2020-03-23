import React, {Component} from 'react'
import {TweenMax, Power3} from 'gsap';
import moneytrees from './money-trees.mp3';
import  './MainMenu.css'

const song = new Audio(moneytrees);

class MainMenu extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
            count: 3,
            countdown: false,
            
            song: [
            {
                name:"Trap Muzik",
                length:"02:50",
                desc: "Created in 2006, this musical masterpeice wAS THE START OF THE tRAP mUSIC era.It was the start of the blah blah blah",
                audio: require('./money-trees.mp3'),
                key:0,
            },
            {
                name:"Orchestral Competition",
                length:"04:20",
                desc: "Tradition Orchestral Music made for the more challenging blah balh blah. Exquisite",
                key:1,
            },
            {
                name:"Lo-Fi Tune",
                length:"00:00",
                desc: "Created in 2006, this musical masterpeice wAS THE START OF THE tRAP mUSIC era.It was the start of the blah blah blah",
                key:2,
            },
            {
                name:"Alternative Vibes",
                length:"00:00",
                desc: "Created in 2006, this musical masterpeice wAS THE START OF THE tRAP mUSIC era.It was the start of the blah blah blah",
                key:3,
            },
            
        ]}


        this.MenuTween = null;
        this.MyMenu = null;

        this.aboutTween = null;
        this.aboutSection = null;

        this.buttonPress = this.buttonPress.bind(this);
        this.countdownInterval = this.countdownInterval.bind(this);
    }

    componentDidMount() {
        this.MenuTween = TweenMax.to(this.MyMenu, 1, {opacity: 1,y: -30, ease: Power3.easeIn});
    }

    countdownInterval () {

        if (this.state.count > 0) {
            this.setState(prevState => ({count: prevState.count - 1}), );
    } else {
        clearInterval(this.countdownInterval);
        this.aboutTween = TweenMax.to(this.aboutSection, .8,{opacity:0, y: -100, ease: Power3.easeOut});
        //song.play();
        }
    }

    buttonPress () {

        clearInterval(this.countdownInterval);
        this.setState({count:3, countdown:true}, 
            ()=>{setInterval(this.countdownInterval, 3000); this.aboutTween = TweenMax.to(this.aboutSection, .8,{opacity:1, y: -100, ease: Power3.easeOut})});

}

    playMusic () {
        
    }


    render () {
        let {song} = this.state;

        if (!this.state.countdown) {

            return (
                <div ref={p => this.MyMenu = p} className="mainmenu">
                <p className="title">Song List</p>
                    <div className="songList">

                        <div onClick={this.buttonPress} className="song-entry">
                            <h3 className="song-name">{song[0].name}</h3>
                            <p className="song-length">{song[0].length}</p>
                            <p className="song-desc">{song[0].desc}</p>
                        </div>

                        <div className="song-entry">
                        <h3 className="song-name">{song[1].name}</h3>
                            <p className="song-length">{song[1].length}</p>
                            <p className="song-desc">{song[1].desc}</p>
                        </div>

                        <div className="song-entry">
                            <h3 className="song-name">Lo-Fi Vibes</h3>
                            <p></p>
                        </div>

                        <div className="song-entry">
                            <h3 className="song-name">Alternative Tune</h3>
                            <p></p>
                        </div>

                    </div>
                </div>
        )
            
            } else if(this.state.countdown) { return(<div className="number">
                <p  ref={p => this.aboutSection = p}>{this.state.count}</p>
            </div>)}

        
    }
}

export default MainMenu