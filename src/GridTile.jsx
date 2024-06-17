import './GridTile.css'
import React, {Component, useState, useEffect} from 'react';
import {useDroppable} from '@dnd-kit/core';
import GridDroppable from './GridDroppable';

export default function GridTile(props) {

    const [highlight, setHightlight] = useState("");
    const [x, setX] = useState(props.x)
    const [y, setY] = useState(props.y)
    const [content, setContent] = useState(props.content)
    
    
    // const handleDragEnter = (e) => {
    //     console.log(`Entering ${content}`);
    //     setHightlight("green");
    // }

    // const handleDragLeave = (e) => {
    //     console.log(`Leavinging ${content}`);
    //     setHightlight("");
    // }

    // const handleDragOver = (e) => {
    //     e.preventDefault();
    //     //setHightlight("");
    // }
    // const handleDrop = (e, t) => {
    //     setHightlight("");
    //     setTimeout(() => {
    //         console.log("handleDrop")
    //         console.log(e);
    //         console.log(t);
    //     }, 100 )
        
    // }

    // <div key={index + i} className={ "tile" + index%2 + i%2}>{v}</div>
    return (<GridDroppable id={props.id} className="gridtile"><div className={ "tile" + x%2 + y%2 + " " + highlight}>{content}</div></GridDroppable>)
}