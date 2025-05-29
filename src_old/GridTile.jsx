import './GridTile.css'
import React, {Component, useState, useEffect} from 'react';
import {useDroppable} from '@dnd-kit/core';
import GridDroppable from './GridDroppable';

export default function GridTile(props) {
    
    return (<GridDroppable id={props.id} className={`gridtile ${props.layerName}`} disabled={!props.droppable} x={props.x} y={props.y}>
        <div className={ "tile" + props.x%2 + props.y%2}>{props.children}</div>
        </GridDroppable>)
}