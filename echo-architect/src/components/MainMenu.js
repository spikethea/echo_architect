import React, {Component} from 'react'
import {TweenMax, Power3} from 'gsap';
import moneytrees from './money-trees.mp3';
import  './MainMenu.css'
import Sketchp5 from './Sketchp5';
import BackgroundParticles from './BackgroundParticles';
import dateFormat from 'dateformat';


const song = new Audio(moneytrees);

class MainMenu extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
            count: 3,
            countdown: false,
            songchoice: 0,
            dataReceived: false,
            
            song: [
            {
                name:"Trap Muzik",
                length:"04/04/2020",
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
            {
                name:"Custom ",
                length:"00:00",
                desc: "Created in 2006, this musical masterpeice wAS THE START OF THE tRAP mUSIC era.It was the start of the blah blah blah",
                key:4,
            },
            {
                name:"Custom",
                length:"00:00",
                desc: "Created in 2006, this musical masterpeice wAS THE START OF THE tRAP mUSIC era.It was the start of the blah blah blah",
                key:5,
            },
            {
                name:"Custom",
                length:"00:00",
                desc: "Created in 2006, this musical masterpeice wAS THE START OF THE tRAP mUSIC era.It was the start of the blah blah blah",
                key:6,
            },
            {
                name:"Custom",
                length:"00:00",
                desc: "Created in 2006, this musical masterpeice wAS THE START OF THE tRAP mUSIC era.It was the start of the blah blah blah",
                key:7,
            },
            {
                name:"Custom",
                length:"00:00",
                desc: "Created in 2006, this musical masterpeice wAS THE START OF THE tRAP mUSIC era.It was the start of the blah blah blah",
                key:8,
            },
            {
                name:"Custom",
                length:"00:00",
                desc: "Created in 2006, this musical masterpeice wAS THE START OF THE tRAP mUSIC era.It was the start of the blah blah blah",
                key:9,
            },
            {
                name:"Custom",
                length:"00:00",
                desc: "Created in 2006, this musical masterpeice wAS THE START OF THE tRAP mUSIC era.It was the start of the blah blah blah",
                key:10,
            },
            {
                name:"Custom",
                length:"00:00",
                desc: "Created in 2006, this musical masterpeice wAS THE START OF THE tRAP mUSIC era.It was the start of the blah blah blah",
                key:11,
            },
            {
                name:"Custom",
                length:"00:00",
                desc: "Created in 2006, this musical masterpeice wAS THE START OF THE tRAP mUSIC era.It was the start of the blah blah blah",
                key:12,
            },
            {
                name:"Custom",
                length:"00:00",
                desc: "Created in 2006, this musical masterpeice wAS THE START OF THE tRAP mUSIC era.It was the start of the blah blah blah",
                key:13,
            },
            {
                name:"Custom",
                length:"00:00",
                desc: "Created in 2006, this musical masterpeice wAS THE START OF THE tRAP mUSIC era.It was the start of the blah blah blah",
                key:14,
            },
            
        ]}


        this.MenuTween = null;
        this.MyMenu = null;

        this.aboutTween = null;
        this.aboutSection = null;

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
        console.log("p5");
        return (<Sketchp5 style={{zIndex:3}}/>)
        }
    }

    buttonPress (key) {

        console.log(key);

        let localkey = key 
        

        this.setState({songchoice: localkey});

        console.log(this.state.songchoice);

        clearInterval(this.countdownInterval);
        this.setState({count:3, countdown:true, songchoice: key}, 
            ()=>{setInterval(this.countdownInterval, 3000); this.aboutTween = TweenMax.to(this.aboutSection, .8,{opacity:1, y: -100, ease: Power3.easeOut})});

}

swapData() {
let {database} = this.state

    console.log(dateFormat((new Date(database[0].timestamp)), "shortDate"));
    let swappedsong = [
        {
            name:"Trap Muzik",
            length:dateFormat((new Date(database[0].timestamp)), "shortDate"),
            desc: "Created in 2006, this musical masterpeice wAS THE START OF THE tRAP mUSIC era.It was the start of the blah blah blah",
            audio: require('./money-trees.mp3'),
            key:0,
        },
        {
            name:"Orchestral Competition",
            length:dateFormat((new Date(database[1].timestamp)), "shortDate"),
            desc: "Tradition Orchestral Music made for the more challenging blah balh blah. Exquisite",
            key:1,
        },
        {
            name:"Lo-Fi Tune",
            length:dateFormat((new Date(database[2].timestamp)), "shortDate"),
            desc: "Created in 2006, this musical masterpeice wAS THE START OF THE tRAP mUSIC era.It was the start of the blah blah blah",
            key:2,
        },
        {
            name:"Alternative Vibes",
            length:dateFormat((new Date(database[3].timestamp)), "shortDate"),
            desc: "Created in 2006, this musical masterpeice wAS THE START OF THE tRAP mUSIC era.It was the start of the blah blah blah",
            key:3,
        },
        {
            name:"Custom ",
            length:dateFormat((new Date(database[4].timestamp)), "shortDate"),
            desc: "Created in 2006, this musical masterpeice wAS THE START OF THE tRAP mUSIC era.It was the start of the blah blah blah",
            key:4,
        },
        {
            name:"Custom",
            length:dateFormat((new Date(database[5].timestamp)), "shortDate"),
            desc: "Created in 2006, this musical masterpeice wAS THE START OF THE tRAP mUSIC era.It was the start of the blah blah blah",
            key:5,
        },
        {
            name:"Custom",
            length:dateFormat((new Date(database[6].timestamp)), "shortDate"),
            desc: "Created in 2006, this musical masterpeice wAS THE START OF THE tRAP mUSIC era.It was the start of the blah blah blah",
            key:6,
        },
        {
            name:"Custom",
            length:dateFormat((new Date(database[7].timestamp)), "shortDate"),
            desc: "Created in 2006, this musical masterpeice wAS THE START OF THE tRAP mUSIC era.It was the start of the blah blah blah",
            key:7,
        },
        {
            name:"Custom",
            length:dateFormat((new Date(database[8].timestamp)), "shortDate"),
            desc: "Created in 2006, this musical masterpeice wAS THE START OF THE tRAP mUSIC era.It was the start of the blah blah blah",
            key:8,
        },
        {
            name:"Custom",
            length:dateFormat((new Date(database[9].timestamp)), "shortDate"),
            desc: "Created in 2006, this musical masterpeice wAS THE START OF THE tRAP mUSIC era.It was the start of the blah blah blah",
            key:9,
        },
        {
            name:"Custom",
            length:dateFormat((new Date(database[10].timestamp)), "shortDate"),
            desc: "Created in 2006, this musical masterpeice wAS THE START OF THE tRAP mUSIC era.It was the start of the blah blah blah",
            key:10,
        },
        {
            name:"Custom",
            length:dateFormat((new Date(database[11].timestamp)), "shortDate"),
            desc: "Created in 2006, this musical masterpeice wAS THE START OF THE tRAP mUSIC era.It was the start of the blah blah blah",
            key:11,
        },
        {
            name:"Custom",
            length:dateFormat((new Date(database[12].timestamp)), "shortDate"),
            desc: "Created in 2006, this musical masterpeice wAS THE START OF THE tRAP mUSIC era.It was the start of the blah blah blah",
            key:12,
        },
        {
            name:"Custom",
            length:dateFormat((new Date(database[13].timestamp)), "shortDate"),
            desc: "Created in 2006, this musical masterpeice wAS THE START OF THE tRAP mUSIC era.It was the start of the blah blah blah",
            key:13,
        },
        {
            name:"Custom",
            length:dateFormat((new Date(database[14].timestamp)), "shortDate"),
            desc: "Created in 2006, this musical masterpeice wAS THE START OF THE tRAP mUSIC era.It was the start of the blah blah blah",
            key:14,
        },
        
    ]

    this.setState({song: swappedsong})
    this.setState({dataReceived: true})
}

async recieveDatabase() {
    let {database} = this.state;
    try {

      const port = process.env.PORT || 8081;
      const response = await fetch(`http://localhost:${port}/api/`); //await /api fetch connection
      const data = await response.json(); //await the response in json form
      this.setState({database: data});
      

    } catch (err) {
      console.log(err); //console.log any errors recieved if failed to get database
      this.gameState = 2;
    }
    finally{
    if (!this.state.dataReceived) {
    this.swapData();
    }
    }
}


    render () {

        let {song, database} = this.state;

        console.log(this.state.countdown);

        if (!this.state.countdown ) {
            

            console.log(this.state.countdown);
            this.recieveDatabase();
            
            return (
    <div ref={p => this.MyMenu = p} className="mainmenu">
    <p className="title">Song List</p>
        <div className="songList">
            {song.map(song => (<div onClick={this.buttonPress.bind(this, song.key)}  key={song.key}  className="song-entry">
                <h3 className="song-name">{song.name}</h3>
                <p className="song-length">{song.length}</p>
                <p className="song-desc">{song.desc}</p>
            </div>))
            }
            
        </div>
        
        </div>

)
            } else if(this.state.countdown) {
                
                return(<div><div className="number">
                <p  ref={p => this.aboutSection = p}>{this.state.count}</p>
            </div><Sketchp5 style={{zIndex: -3}} songchoice={this.state.songchoice} /><BackgroundParticles style={{zIndex:3}} />
            
            
            
            </div>)}


    }
}

export default MainMenu