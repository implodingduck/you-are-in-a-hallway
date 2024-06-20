import React from 'react';
import {useDraggable} from '@dnd-kit/core';

export default function GridDraggable(props) {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: props.id,
        data: {
            x: props.x,
            y: props.y
        }
    });
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;
    
      
    return (
        <div id={props.id} ref={setNodeRef} style={style} {...listeners} {...attributes}>
          {props.children}
        </div>
    );
}