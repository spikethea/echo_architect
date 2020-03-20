import React from 'react';
import moneytrees from './money-trees.mp3';



function MusicPlayer () {

const song = new Audio(moneytrees);

return (

    <div>
        <button style={{position: "absolute", top: "5em"}} onClick={()=>song.play()}>Play Music </button>
    </div>
)

}


export default MusicPlayer