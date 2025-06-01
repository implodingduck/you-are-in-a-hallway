import { useState, useEffect } from 'react';
import BattleGrid from './components/BattleGrid';
import { Character } from './models/Character';
import { Power } from './models/Power';
import './BattleScene.css';

export default function BattleScene({ onSceneChange, api }) {
    const [battleClock, setBattleClock] = useState(1);
    const [playerCharacters, setPlayerCharacters] = useState([]);
    const [enemyCharacters, setEnemyCharacters] = useState([]);
    const [battleLog, setBattleLog] = useState([]);

    const powers = {
        basicAttack: new Power('Attack', 2, 10, 1, 'Basic attack', 'enemies')
    }

    // Initialize battle when component mounts
    useEffect(() => {
        // Initialize player characters
        const initialPlayerChars = [
            new Character('Hero', { hp: 100, power: 20, defense: 10 }, 8, 'player', [powers.basicAttack]),
            new Character('Mage', { hp: 80, power: 30, defense: 5 }, 3, 'player', [powers.basicAttack]),
            new Character('Tank', { hp: 150, power: 15, defense: 20 }, 2, 'player', [powers.basicAttack]),
            new Character('Healer', { hp: 70, power: 10, defense: 8 }, 4, 'player', [powers.basicAttack])
        ];

        // Initialize enemy characters
        const initialEnemyChars = [
            new Character('Goblin', { hp: 60, power: 15, defense: 8 }, 1, 'enemy', [powers.basicAttack]),
            new Character('Wolf', { hp: 70, power: 20, defense: 5 }, 3, 'enemy', [powers.basicAttack]),
            new Character('Orc', { hp: 100, power: 25, defense: 15 }, 8, 'enemy', [powers.basicAttack])
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
            <BattleGrid characters={playerCharacters} side="player" battleClock={battleClock} />
            <div>VS</div>
            <BattleGrid characters={enemyCharacters} side="enemy" battleClock={battleClock} />
        </div>
        <div>
            <h2>Player Characters</h2>
            {playerCharacters.map((char, index) => (
                ( char.tick === battleClock) ?
                    <div key={index}>
                        {char.name} - HP: {char.stats.hp}, Power: {char.stats.power}, Defense: {char.stats.defense}
                        <div className="powers">
                            {char.powers.map((power, powerIndex) => (
                                <button key={powerIndex} onClick={() => {
                                    const target = enemyCharacters.find(e => e.position === char.position - 1 || e.position === char.position + 1);
                                    if (target) {
                                        const damage = char.activatePower(power.name, target);
                                        setBattleLog(prevLog => [...prevLog, `${char.name} used ${power.name} on ${target.name} for ${damage} damage!`]);
                                        if (target.stats.hp <= 0) {
                                            setBattleLog(prevLog => [...prevLog, `${target.name} has been defeated!`]);
                                            target.stats.hp = 0; // Ensure HP doesn't go negative
                                        }
                                    } else {
                                        setBattleLog(prevLog => [...prevLog, `${char.name} tried to attack but no valid target found!`]);
                                    }
                                }}>
                                    {power.name}
                                </button>
                            ))}
                        </div>
                    </div>
                : ""
            ))}
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
