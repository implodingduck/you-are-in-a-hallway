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

export default function GridGame(){

    const sensors = useSensors(
        useSensor(TouchSensor),
        useSensor(MouseSensor),
        useSensor(KeyboardSensor)
    )
  
    const tokenlib = {
        player: <GridPlayer id="theplayer" />,
        goblin: <GridToken id="goblin" className={"enemy"}>G</GridToken>,
        booma: <GridToken id="booma" className={"enemy"}>B</GridToken> 
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
        <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd} >
            { tokenlib.booma }
            <hr />
            <GridDroppable id={"touchtest"} disabled={false}>
                <div style={{ border: '1px solid #ff00ff', height: '5em', width: '5em' }}></div>
            </GridDroppable>
            
            <Grid tokens={tokens} />
                        
        </DndContext>
    </>)
}