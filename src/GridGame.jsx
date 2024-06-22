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
  

    const [tokenlib, setTokenlib ] = useState({
        player: <GridPlayer id="theplayer" />,
        goblin: <GridToken id="goblin" className={"enemy"}>G</GridToken>,
        booma: <GridToken id="booma" className={"enemy"}>B</GridToken> 
    })

    console.log(tokenlib.booma)
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

        const newArr = tokens.slice(0);
        if(newArr[over.data.current.x][over.data.current.y].type === React.Fragment){
            console.log(`x=${active.data.current.x} y=${active.data.current.y}`)
            if(active.data.current.x < 0 && active.data.current.y < 0){
                newArr[over.data.current.x][over.data.current.y] = tokenlib[active.id.replace("draggable", "")]
                setTokenlib({...tokenlib, booma: <GridToken id="booma" className={"enemy"} ongrid={true}></GridToken> })
            } else {
                newArr[over.data.current.x][over.data.current.y] = tokens[active.data.current.x][active.data.current.y]
                newArr[active.data.current.x][active.data.current.y] = <></>
            }
        }
        
        setTokens(newArr)
    }

    function handleDragStart(e){
        // console.log(e)
        
    }
    
    return (<>
        <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd} >
            <div style={{marginLeft: '5em'}}>
                <h3>Token Holder</h3>
                {
                   (tokenlib.booma.props.ongrid) ? null : tokenlib.booma
                }
            </div>

            <Grid tokens={tokens} />
                        
        </DndContext>
    </>)
}