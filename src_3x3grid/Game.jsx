import './Game.css'
import TitleScene from './TitleScene'
import BattleScene from './BattleScene'
import ExplorationScene from './ExplorationScene'
import Storage from './Storage'
import Api from './Api'
import { useState } from 'react'

export default function Game(){
    const storageDao = new Storage();
    const api = new Api();
    const initialSeed = storageDao.get("seed", (new Date()).getTime());
    api.setSeed(initialSeed);
    const initialscene = storageDao.get("scene", "title");
    const [scene, setScene] = useState(storageDao.get("scene", "title"));
    

    const handleSceneChange = (newScene) => {
        setScene(newScene);
        storageDao.save("scene", newScene);
        storageDao.save("seed", api.getSeed());
    }

    return (<>
        {scene === 'title' && <TitleScene onSceneChange={handleSceneChange} />}
        {scene === 'battle' && <BattleScene onSceneChange={handleSceneChange} api={api} />}
        {scene === 'explore' && <ExplorationScene onSceneChange={handleSceneChange} api={api} />}
    </>)
}