import React from 'react';
import {useDraggable} from '@dnd-kit/core';
import './GridDraggable.css'

export default function GridDraggable(props) {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: props.id,
        data: {
            id: props.id.replace("draggable", ""),
            x: props.x,
            y: props.y
        }
    });
    const style = transform ? {
        gridRow: (props.x > -1) ? props.x+1 : null,
        gridColumn: (props.y > -1) ? props.y+1: null,
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : {
        gridRow: (props.x > -1) ? props.x+1 : null,
        gridColumn: (props.y > -1) ? props.y+1: null,
    };
    
      
    return (
        <div id={props.id} className={'draggable'} ref={setNodeRef} style={style} {...listeners} {...attributes}>
          {props.children}
        </div>
    );
}