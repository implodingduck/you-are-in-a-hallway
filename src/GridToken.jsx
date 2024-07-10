import './GridToken.css';
import React, {Component, useState, useEffect, useContext} from 'react';
import {useDraggable} from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';
import GridDraggable from './GridDraggable';

import { GridContextPos } from './GridContextPos';

export default function GridToken(props) {

    return (<GridDraggable id={`draggable${props.id}`} className="draggable" x={props.x} y={props.y}><div id={props.id} className={props.className}>{props.children}</div></GridDraggable>);
}