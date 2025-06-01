import '../Game.css';
import './BattleGrid.css';

export default function BattleGrid({ characters, side , battleClock}) {
    

    return (
        <div className="gridStyle">
            {Array(9).fill(null).map((_, index) => {
                const character = characters.find(c => c.position === index);
                return (
                    <div key={index} className="cellStyle">
                        {character && (
                            <div className={parseInt(character.tick) === parseInt(battleClock) ? "characterStyle active" : "characterStyle" } title={`${character.name} (Tick: ${character.tick})`}>
                                {character.name.charAt(0)}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
