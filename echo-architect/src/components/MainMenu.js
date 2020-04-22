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
            songchoice: 4,
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

    buttonPress (id) {

        let {database} = this.state

        console.log(id);

        console.log(new Date(1587314742839));

        this.setState({songchoice: id, count:3, countdown:true}, () => {
            console.log("state", this.state.songchoice);
            
        })


        //console.log(this.state.songchoice);

        
            

}

swapData() {
let {database} = this.state


    let swappedsong = [
        {
            name:"Drum Starter Kit",
            length:dateFormat((new Date(database[0].timestamp)), "GMT:dd/mm/yyyy"),
            desc: "Created by the Development team, this easy musical masterpeice can get anyone going at low difficulty.",
            key:0,
            id:0
        },
        {
            name:"Experimental Beat",
            length:dateFormat((new Date(database[1].timestamp)), "GMT:dd/mm/yyyy"),
            desc: "Created by the Development team, this experimental composition is challenging, but a seasoned player could ace it.",
            key:1,
            id:1
        },
        {
            name:"Lo-Fi Tune",
            length:dateFormat((new Date(database[2].timestamp)), "GMT:dd/mm/yyyy"),
            desc: "Created by Alex Hopkins, this beat is one of those Lo-Fi Hip-Hop beats to study and relax to",
            key:2,
            id:2,

        },
        {
            name:"Difficulty Level: HARD",
            length:dateFormat((new Date(database[3].timestamp)), "GMT:dd/mm/yyyy"),
            desc: "Created in 2006, this musical masterpeice wAS THE START OF THE tRAP mUSIC era.It was the start of the blah blah blah",
            key:3,
            id:3
        },
        {
            name:"Custom ",
            length:dateFormat(new Date(database[database.length- 1].timestamp), "dd/mm/yy HH:MM"),
            desc: "A custom configuration, created by a user who completed the game",
            key:20,
            id:database.length-1,
        },
        {
            name:"Custom",
            length:dateFormat(new Date(database[database.length-2].timestamp), "dd/mm/yy HH:MM"),
            desc: "A custom configuration, created by a user who completed the game",
            key:19,
            id:database.length-2,
        },
        {
            name:"Custom",
            length:dateFormat(new Date(database[database.length-3].timestamp), "dd/mm/yy HH:MM"),
            desc: "A custom configuration, created by a user who completed the game",
            key:18,
            id:database.length-3,
        },
        {
            name:"Custom",
            length:dateFormat(new Date(database[database.length-4].timestamp), "dd/mm/yy HH:MM"),
            desc: "A custom configuration, created by a user who completed the game",
            key:17,
            id:database.length-4,
        },
        {
            name:"Custom",
            length:dateFormat(new Date(database[database.length-5].timestamp), "dd/mm/yy HH:MM"),
            desc: "A custom configuration, created by a user who completed the game",
            key:16,
            id:database.length-5,
        },
        {
            name:"Custom",
            length:dateFormat(new Date(database[database.length-6].timestamp), "dd/mm/yy HH:MM"),
            desc: "A custom configuration, created by a user who completed the game",
            key:15,
            id:database.length-6,
        },
        {
            name:"Custom",
            length:dateFormat(new Date(database[database.length-7].timestamp), "dd/mm/yy HH:MM"),
            desc: "A custom configuration, created by a user who completed the game",
            key:14,
            id:database.length-7,
        },
        {
            name:"Custom",
            length:dateFormat(new Date(database[database.length-8].timestamp), "dd/mm/yy HH:MM"),
            desc: "A custom configuration, created by a user who completed the game",
            key:13,
            id:database.length-8,
        },
        {
            name:"Custom",
            length:dateFormat(new Date(database[database.length-9].timestamp), "dd/mm/yy HH:MM"),
            desc: "A custom configuration, created by a user who completed the game",
            key:12,
            id:database.length-9,
        },
        {
            name:"Custom",
            length:dateFormat(new Date(database[database.length-10].timestamp), "dd/mm/yy HH:MM"),
            desc: "A custom configuration, created by a user who completed the game",
            key:11,
            id:database.length-10,
        },
        {
            name:"Custom",
            length:dateFormat(new Date(database[database.length-11].timestamp), "dd/mm/yy HH:MM"),
            desc: "A custom configuration, created by a user who completed the game",
            key:10,
            id:database.length-11,
        },
        {
            name:"Custom",
            length:dateFormat(new Date(database[database.length-12].timestamp), "dd/mm/yy HH:MM"),
            desc: "A custom configuration, created by a user who completed the game",
            key:9,
            id:database.length-12,
        },
        {
            name:"Custom",
            length:dateFormat(new Date(database[database.length-13].timestamp), "dd/mm/yy HH:MM"),
            desc: "A custom configuration, created by a user who completed the game",
            key:8,
            id:database.length-13,
        },
        {
            name:"Custom",
            length:dateFormat(new Date(database[database.length-14].timestamp), "dd/mm/yy HH:MM"),
            desc: "A custom configuration, created by a user who completed the game",
            key:7,
            id:database.length-14,
        },
        {
            name:"Custom",
            length:dateFormat(new Date(database[database.length-15].timestamp), "dd/mm/yy HH:MM"),
            desc: "A custom configuration, created by a user who completed the game",
            key:6,
            id:database.length-15,
        },
        {
            name:"Custom",
            length:dateFormat(new Date(database[database.length-16].timestamp), "dd/mm/yy HH:MM"),
            desc: "A custom configuration, created by a user who completed the game",
            key:5,
            id:database.length-16,
        },
        {
            name:"Custom",
            length:dateFormat(new Date(database[database.length-17].timestamp), "dd/mm/yy HH:MM"),
            desc: "A custom configuration, created by a user who completed the game",
            key:4,
            id:database.length-17,
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

        //console.log(this.state.countdown);

        if (!this.state.countdown ) {
            

            //console.log(this.state.countdown);
            this.recieveDatabase();
            
            return (
    <div ref={p => this.MyMenu = p} className="mainmenu">
    <p className="title">Song List</p>
        <div className="songList">
            {song.map(song => (<div onClick={this.buttonPress.bind(this, song.id)}  key={song.key}  className="song-entry">
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
            </div>
            <h1 style={{zIndex:3}} className="echo_architect">Echo Architect</h1>
            <Sketchp5 style={{zIndex: -3}} songchoice={this.state.songchoice} />
            <BackgroundParticles style={{zIndex:3}} />
            
            
            
            </div>)}


    }
}

export default MainMenu