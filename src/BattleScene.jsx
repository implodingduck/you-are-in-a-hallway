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
    const [selectingTarget, setSelectingTarget] = useState(null); // { character, power }

    const powers = {
        basicAttack: new Power('Attack', 2, 10, 'short', 'Basic attack', 'enemies'),
        midAttack: new Power('Mid Attack', 3, 15, 'mid', 'Mid-range attack', 'enemies'),
        longAttack: new Power('Long Attack', 4, 20, 'long', 'Long-range attack', 'enemies')
    }

    // Initialize battle when component mounts
    useEffect(() => {
        // Initialize player characters with [col, row] positions
        const initialPlayerChars = [
            new Character('Rogue', { hp: 100, power: 20, defense: 10 }, [0, 2], 'player', [powers.basicAttack, powers.midAttack]),
            new Character('Mage', { hp: 80, power: 30, defense: 5 }, [2, 1], 'player', [powers.longAttack]),
            new Character('Tank', { hp: 150, power: 15, defense: 20 }, [0, 0], 'player', [powers.basicAttack]),
            new Character('Healer', { hp: 70, power: 10, defense: 8 }, [1, 1], 'player', [powers.basicAttack])
        ];

        // Initialize enemy characters with [col, row] positions
        const initialEnemyChars = [
            new Character('Goblin', { hp: 60, power: 15, defense: 8 }, [1, 2], 'enemy', [powers.basicAttack]),
            new Character('Wolf', { hp: 70, power: 20, defense: 5 }, [0, 1], 'enemy', [powers.basicAttack]),
            new Character('Orc', { hp: 100, power: 25, defense: 15 }, [2, 0], 'enemy', [powers.basicAttack])
        ];

        setPlayerCharacters(initialPlayerChars);
        setEnemyCharacters(initialEnemyChars);
    }, []);

    const handleNextTick = () => {
        setBattleClock(((battleClock) % 12) + 1);
    }

    const clearTargetable = () => {
        // Clear targetable status for all characters
        [...playerCharacters, ...enemyCharacters].forEach(char => {
            char.targetable = false;
        });
    }

    const isInRange = (attacker, target, power) => {
        // Get all enemy positions
        const enemyPositions = (attacker.side === 'player' ? enemyCharacters : playerCharacters)
            .map(c => c.position);
        
        // Get valid target columns for this power
        const validColumns = power.getValidTargetColumns(enemyPositions);
        
        // Check if target's column is in valid columns
        if (validColumns.includes(target.position[0])) {
            target.targetable = true; // Mark target as valid
        }

        return validColumns.includes(target.position[0]);
    };

    // Function to handle target selection
    const handleTargetSelected = (target) => {
        if (!selectingTarget) return;
        
        const { character, power } = selectingTarget;
        if (isInRange(character, target, power)) {
            const damage = character.activatePower(power.name, target);
            setBattleLog(prevLog => [...prevLog, `${character.name} used ${power.name} on ${target.name} for ${damage} damage!`]);
            if (target.stats.hp <= 0) {
                setBattleLog(prevLog => [...prevLog, `${target.name} has been defeated!`]);
                target.stats.hp = 0;
            }
            // Reset target selection
            setSelectingTarget(null);
            clearTargetable();
        }
    };

    // Function to get valid targets for the current power
    const getValidTargets = (attacker, power) => {
        return (attacker.side === 'player' ? enemyCharacters : playerCharacters)
            .filter(target => isInRange(attacker, target, power));
    };

    return (<>
        <h1>Battle in Progress</h1>
        <div>Battle Clock: {battleClock}</div>
        
        <div className="battleStyle">
            <BattleGrid 
                characters={playerCharacters} 
                side="player" 
                battleClock={battleClock} 
            />
            <div>VS</div>
            <BattleGrid 
                characters={enemyCharacters} 
                side="enemy" 
                battleClock={battleClock} 
                onCharacterClick={char => {
                    if (selectingTarget) {
                        handleTargetSelected(char);
                    }
                }}
            />
        </div>
        <div>
            <h2>Player Characters</h2>
            {playerCharacters.map((char, index) => (
                ( char.tick === battleClock) ?
                    <div key={index}>
                        {char.name} - HP: {char.stats.hp}, Power: {char.stats.power}, Defense: {char.stats.defense}
                        <div className="powers">
                            {char.powers.map((power, powerIndex) => (
                                <button 
                                    key={powerIndex} 
                                    onClick={() => {
                                        const validTargets = getValidTargets(char, power);
                                        if (validTargets.length > 0) {
                                            setSelectingTarget({ character: char, power });
                                            setBattleLog(prevLog => [...prevLog, `Select a target for ${char.name}'s ${power.name}...`]);
                                        } else {
                                            setBattleLog(prevLog => [...prevLog, `${char.name} has no valid targets in range!`]);
                                        }
                                    }}
                                    disabled={selectingTarget !== null}
                                >
                                    {power.name}
                                </button>
                            ))}
                        </div>
                        {selectingTarget?.character === char && (
                            <button 
                                onClick={() => { setSelectingTarget(null); clearTargetable();}}
                                style={{ marginLeft: '10px' }}
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                : ""
            ))}
        </div>

        <div className="logStyle">
            {battleLog.map((log, index) => (
                <div key={index}>{log}</div>
            ))}
        </div>

        <button onClick={handleNextTick}>Next Tick</button>
        <button onClick={() => onSceneChange("title")}>Retreat</button>
    </>)
}
