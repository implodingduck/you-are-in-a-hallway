import './GridGame.css'
import Grid from './Grid.jsx';
import GridPlayer from './GridPlayer.jsx'
import {DndContext} from '@dnd-kit/core';

export default function GridGame(){
  
    function handleDragEnd({over}) {
        //setParent(over ? over.id : null);
        console.log(over)
    }
    
    return (<>
        <DndContext onDragEnd={handleDragEnd}>
            <Grid />
            <GridPlayer id="theplayer" x={0} y={0} />            
        </DndContext>
    </>)
}