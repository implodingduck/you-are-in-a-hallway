import './App.css';
import React, {Component, useState, useEffect} from 'react';
import { API } from './Api'

function Mob( { mob } ) {

    return (
        <div className="mob">
            <p>{mob.name}</p>
            <div className='bar'>
                {mob.currentHp} / {mob.hp}
            </div>
            <pre className="hidden">
              {JSON.stringify(mob)}
            </pre>
        </div>
      );
}
export default Mob;
