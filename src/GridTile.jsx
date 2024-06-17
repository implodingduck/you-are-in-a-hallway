import './GridTile.css'
import React, {Component, useState, useEffect} from 'react';

export default function GridTile({x, y, content}) {

    const [highlight, setHightlight] = useState("");
    const handleDragEnter = (e) => {
        console.log(`Entering ${content}`);
        setHightlight("green");
    }

    const handleDragLeave = (e) => {
        console.log(`Leavinging ${content}`);
        setHightlight("");
    }

    const handleDragOver = (e) => {
        e.preventDefault();
        //setHightlight("");
    }
    const handleDrop = (e, t) => {
        setHightlight("");
        setTimeout(() => {
            console.log("handleDrop")
            console.log(e);
            console.log(t);
        }, 100 )
        
    }

    // <div key={index + i} className={ "tile" + index%2 + i%2}>{v}</div>
    return (<div id={`tile${x}${y}`} className={ "tile" + x%2 + y%2 + " " + highlight} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={handleDragOver} onDrop={handleDrop}>{content}</div>)
}