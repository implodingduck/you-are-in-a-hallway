import './GridGame.css'
import Grid from './Grid.jsx';
import GridPlayer from './GridPlayer.jsx'
import GridToken from './GridToken.jsx'
import {DndContext} from '@dnd-kit/core';
import React, {Component, useState, useEffect} from 'react';

export default function GridGame(){
  
    const tokenlib = {
        player: <GridPlayer id="theplayer" />,
        goblin: <GridToken id="goblin" className={"enemy"}>G</GridToken> 
    }

    const [tokens, setTokens] = useState([
        [tokenlib.player, <></>, <></>, <></>, <></>, <></>, <></>, <></>],
        [<></>, <></>, <></>, <></>, <></>, <></>, <></>, <></>],
        [<></>, <></>, <></>, <></>, <></>, <></>, <></>, <></>],
        [<></>, <></>, <></>, tokenlib.goblin, <></>, <></>, <></>, <></>],
        [<></>, <></>, <></>, <></>, <></>, <></>, <></>, <></>],
        [<></>, <></>, <></>, <></>, <></>, <></>, <></>, <></>],
        [<></>, <></>, <></>, <></>, <></>, <></>, <></>, <></>],
        [<></>, <></>, <></>, <></>, <></>, <></>, <></>, <></>], 
    ])
    
    function handleDragEnd({active, over}) {
        //setParent(over ? over.id : null);
        // console.log(active)
        // console.log(active.id)
        // console.log(over)
        // console.log(over.id)
        const newArr = tokens.slice(0);
        //console.log("------------")
        console.log(newArr[over.data.current.x][over.data.current.y].type)
        if(newArr[over.data.current.x][over.data.current.y].type === React.Fragment){
            newArr[over.data.current.x][over.data.current.y] = tokens[active.data.current.x][active.data.current.y]
            newArr[active.data.current.x][active.data.current.y] = <></>
        }
        
        setTokens(newArr)
    }

    function handleDragStart(e){
        console.log(e)
    }
    
    return (<>
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} >
            <Grid tokens={tokens} />
                        
        </DndContext>
    </>)
}