import './GridPlayer.css';
import React, {Component, useState, useEffect} from 'react';
import {useDraggable} from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';
import GridDraggable from './GridDraggable';

export default function GridPlayer(props) {

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

    return (<GridDraggable className="draggable"><div id={props.id} className='gridplayer'>P</div></GridDraggable>);
}