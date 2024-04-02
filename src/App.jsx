import './App.css';
import React, {Component, useState, useEffect} from 'react';
import { API } from './Api'
import Mob from './Mob.jsx'
import Player from './Player.jsx'
import DragDropGrid from './DragDropGrid.jsx';

function App() {
  const api = new API();
  const [room, setRoom] = useState({});
  const [mob, setMob] = useState({});
  const [player, setPlayer] = useState({});

  useEffect(() => {
    void async function init() {
      await api.init()
      console.log(`Getting Room: 1`)
      setRoom(await api.getRoom(1))
      console.log(`Getting Mob: 1`)
      setMob(await api.getRandomMob())
      setPlayer(await api.getPlayer(1))
    }();
  },[])

  const handleAttack = async (e) => {
    console.log(`handleAttack`)
    let damage = await api.handleCombat(player, mob)
    setMob({
      ...mob,
      currentHp: (mob.currentHp - damage)
    });
  }

  return (
    <div className="App">
        <h1>You are in a hallway...</h1>
        <pre>
          {JSON.stringify(room)}
        </pre>
        <Player player={player} onAttack={handleAttack} />
        <Mob mob={mob} />

        <DragDropGrid />

    </div>
  );
}

export default App;
