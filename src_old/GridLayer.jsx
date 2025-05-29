import './GridLayer.css';
import GridPlayer from './GridPlayer';
import GridTile from './GridTile';

import { GridContextPos } from './GridContextPos';

export default function GridLayer(props) {

    const squares = props.squares ? props.squares : [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""], 
    ]

    const droppable = props.droppable ? props.droppable : false;


    return (            
        <>
        {
            squares.map((val, index) => {
                return (
                    //<>{
                        val.map( (v, i) => {
                            return (<GridTile id={`${props.layerName}tile${index}${i}`} key={index + i} x={index} y={i} droppable={droppable} layerName={props.layerName}>
                                <GridContextPos.Provider value={[index, i]}>
                                    {v}
                                </GridContextPos.Provider>
                            </GridTile>)
                        })
                    //}</>
                )
            })
        }
        </>
);
}