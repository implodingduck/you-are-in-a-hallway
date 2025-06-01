import '../Game.css';
import './BattleGrid.css';

export default function BattleGrid({ characters, side, battleClock, onCharacterClick }) {
    return (
        <div className={"gridStyle " + side}>
            {Array(9).fill(null).map((_, index) => {
                const col = Math.floor(index % 3);
                const row = Math.floor(index / 3);
                // For player side, flip the columns horizontally
                const effectiveCol = side === 'player' ? 2 - col : col;
                const character = characters.find(c => 
                    Array.isArray(c.position) && 
                    c.position[0] === effectiveCol && 
                    c.position[1] === row
                );
                return (
                    <div 
                        key={index} 
                        className="cellStyle" 
                        onClick={() => character && onCharacterClick?.(character)}
                        style={{ cursor: character && onCharacterClick ? 'pointer' : 'default' }}
                    >
                        {character && (<>
                            <div className='characterNameStyle'>
                                {character.name}
                            </div>
                            <div 
                                className={`characterStyle${(parseInt(character.tick) === parseInt(battleClock)) ? " active" : ""}${(character.targetable) ? " targetable" : ""}`}
                                title={`${character.name} (Tick: ${character.tick} | pos: ${character.position.join(', ')})`}
                            >
                                 {character.tick}
                            </div>
                            <div className="healthbar">
                                <div className="healthbarFill" 
                                        style={{ width: `${(character.stats.hp / character.stats.maxHp) * 100}%` }} 
                                ></div>
                                <div className="healthbarText">
                                    {`${character.stats.hp} / ${character.stats.maxHp}`}
                                </div>
                            </div>
                        </>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
