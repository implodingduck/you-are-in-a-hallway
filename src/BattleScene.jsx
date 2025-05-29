import { useState, useEffect } from 'react';
import BattleGrid from './components/BattleGrid';
import { Character } from './models/Character';
import './BattleScene.css';

export default function BattleScene({ onSceneChange, api }) {
    const [battleClock, setBattleClock] = useState(1);
    const [playerCharacters, setPlayerCharacters] = useState([]);
    const [enemyCharacters, setEnemyCharacters] = useState([]);
    const [battleLog, setBattleLog] = useState([]);

    // Initialize battle when component mounts
    useEffect(() => {
        // Initialize player characters
        const initialPlayerChars = [
            new Character('Hero', { hp: 100, power: 20, defense: 10 }, 8, 'player'),
            new Character('Mage', { hp: 80, power: 30, defense: 5 }, 3, 'player'),
            new Character('Tank', { hp: 150, power: 15, defense: 20 }, 2, 'player'),
            new Character('Healer', { hp: 70, power: 10, defense: 8 }, 4, 'player')
        ];

        // Initialize enemy characters
        const initialEnemyChars = [
            new Character('Goblin', { hp: 60, power: 15, defense: 8 }, 1, 'enemy'),
            new Character('Wolf', { hp: 70, power: 20, defense: 5 }, 3, 'enemy'),
            new Character('Orc', { hp: 100, power: 25, defense: 15 }, 8, 'enemy')
        ];

        setPlayerCharacters(initialPlayerChars);
        setEnemyCharacters(initialEnemyChars);
    }, []);

    const handleNextTick = () => {
        setBattleClock(((battleClock) % 12) + 1)

    }

    return (<>
        <h1>Battle in Progress</h1>
        <div>Battle Clock: {battleClock}</div>
        
        <div className="battleStyle">
            <BattleGrid characters={playerCharacters} side="player" />
            <div>VS</div>
            <BattleGrid characters={enemyCharacters} side="enemy" />
        </div>

        <div className="logStyle">
            {battleLog.map((log, index) => (
                <div key={index}>{log}</div>
            ))}
        </div>

        <button onClick={ handleNextTick }>Next Tick</button>
        <button onClick={() => onSceneChange("title")}>Retreat</button>
    </>)
}
