import './App.css';
import React, {Component, useState, useEffect} from 'react';
import { API } from './Api'
import { Mob } from './Models'
function App() {
  const api = new API();
  const [room, setRoom] = useState({});
  const [mob, setMob] = useState({});

  useEffect(() => {
    void async function init() {
      await api.init()
      console.log(`Getting Room: 1`)
      setRoom(await api.getRoom(1))
      console.log(`Getting Mob: 1`)
      setMob(await api.getMob(1))
    }();
  },[])

  return (
    <div className="App">
        <h1>You are in a hallway...</h1>
        <pre>
          {JSON.stringify(room)}
          {JSON.stringify(mob)}
        </pre>
    </div>
  );
}

export default App;
