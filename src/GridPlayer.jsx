import './GridPlayer.css';
import React, {Component, useState, useEffect} from 'react';

export default function GridPlayer({x, y}) {

    const [screenX, setScreenX] = useState("")
    const [screenY, setScreenY] = useState("")

    const handleDragStart = (e) => {
        console.log("dragStart");
        console.log(e);
    }

    const handleDragEnd = (e, t) => {
        console.log("dragEnd");
        console.log(e);
        console.log(t);
        // console.log(`${e.pageX}, ${e.pageY}` )
        let setX = e.pageX - e.target.offsetWidth/2
        let setY = e.pageY - e.target.offsetHeight/2
        setScreenX(setX)
        setScreenY(setY)
        
    }

    return (<div className='gridplayer' style={{ left: screenX, top: screenY}} draggable="true" onDragStart={handleDragStart} onDragEnd={handleDragEnd}>P</div>);
}