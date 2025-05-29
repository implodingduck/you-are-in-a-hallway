import './GridGame.css'
import Grid from './Grid.jsx';
import GridPlayer from './GridPlayer.jsx'
import GridToken from './GridToken.jsx'
import {DndContext, 
    KeyboardSensor,
    PointerSensor,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,} from '@dnd-kit/core';
import React, {Component, useState, useEffect} from 'react';
import GridDroppable from './GridDroppable.jsx';
import { act } from 'react';

export default function GridGame(){

    const sensors = useSensors(
        useSensor(TouchSensor),
        useSensor(MouseSensor),
        useSensor(KeyboardSensor)
    )
  

    const [tokenlib, setTokenlib ] = useState([
        {
            id: "goblin",
            className: 'enemy',
            content: 'G'
        },
        {
            id: "boooma",
            className: 'enemy',
            content: 'B'
        }
    ])

    const [tokens, setTokens] = useState([
        {
            id: "theplayer",
            x: 0,
            y: 0,
            className: 'gridplayer',
            content: 'P'
        }
        
    ])

    function validateNoOverlap(t, tarr){
        for(let t2 of tarr){
            if(isOverlap(t, t2)){
                return false
            }
        }
        return true;
    }

    function isOverlap(t1, t2){
        return t1.x == t2.x && t1.y == t2.y && t1.id != t2.id
    }
    
    function handleDragEnd({active, over}) {
        console.log('handleDragEnd')
        console.log(active)
        console.log(over)
        const fromtokenlib = tokenlib.filter(token => {
            const newtlib = {
                ...token,
                x: over.data.current.x,
                y: over.data.current.y   
            }
            return token.id == active.data.current.id && validateNoOverlap(newtlib, tokens)
        })
        for(let t of fromtokenlib){
            t.x = over.data.current.x
            t.y = over.data.current.y
        }

        const newtokenlib = tokenlib.filter(token => {
            let retval = false;
            for(let t of fromtokenlib){
                retval = (token.id == t.id)
            }
            return !retval;
        })
        
        const newtokens = tokens.map(token => {
            if(token.id == active.data.current.id ){
                // token.x = over.data.current.x
                // token.y = over.data.current.y
                console.log(token)
                const newt = {
                    ...token,
                    x: over.data.current.x,
                    y: over.data.current.y
                };
                if(validateNoOverlap(newt, tokens)){
                    return newt
                }
                
            }
            return token;    
        })
        setTokens([...newtokens, ...fromtokenlib])
        setTokenlib(newtokenlib)
    }

    function handleDragStart(e){
        // console.log(e)
        
    }
    
    return (<>
        <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd} >
            <div className='tokenlib'>
                {
                    tokenlib.map( (val, index) => {
                        return <GridToken key={index} id={val.id} className={val.className}>{val.content}</GridToken>
                    })
                }
            </div>
            <Grid>
            { 
                tokens.map( (val, index) => {
                    return (<GridToken key={index} id={val.id} className={val.className} x={val.x} y={val.y}>{val.content}</GridToken>)
                }) 
            }
            </Grid>
            
                        
        </DndContext>
    </>)
}