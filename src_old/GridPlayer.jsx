import './GridPlayer.css';
import React, {Component, useState, useEffect, useContext} from 'react';
import {useDraggable} from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';
import GridDraggable from './GridDraggable';

import { GridContextPos } from './GridContextPos';

export default function GridPlayer(props) {

    const pos = useContext(GridContextPos);

    return (<GridDraggable id={`draggable${props.id}`} className="draggable" x={pos[0]} y={pos[1]}><div id={props.id} className='gridplayer'>P</div></GridDraggable>);
}