import './App.css';
import React, {Component, useState, useEffect} from 'react';
import { API } from './Api'

function Player( { player, onAttack } ) {

    return (
        <div className="player">
            <p>{player.name}</p>
            <div className='bar'>
                {player.currentHp} / {player.hp}
            </div>
            <pre className="hidden">
              {JSON.stringify(player)}
            </pre>
            <button onClick={onAttack}>Attack</button>
        </div>
      );
}
export default Player;
