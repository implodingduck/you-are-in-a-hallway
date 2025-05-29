import React from 'react';
import {useDroppable} from '@dnd-kit/core';

export default function GridDroppable(props) {
  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
    disabled: props.disabled,
    data: {
      x: props.x,
      y: props.y
    }
  });
  const style = {
    backgroundColor: isOver ? '#00ff00' : undefined,
    color: isOver ? 'green' : undefined,
    border: isOver ? '1px solid #00ff00' : undefined,
    boxSizing: 'border-box'
  };
  
  
  return (
    <div id={props.id} ref={setNodeRef} style={style} className={props.className}>
      {props.children}
    </div>
  );
}