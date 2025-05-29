import '../Game.css';

export default function BattleGrid({ characters, side }) {
    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '4px',
        width: '200px',
        margin: '10px'
    };

    const cellStyle = {
        border: '1px solid #646cff',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '4px',
        background: '#1a1a1a'
    };

    const characterStyle = (char) => ({
        width: '90%',
        height: '90%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        background: char.isActive ? '#646cff' : '#2a2a2a',
        transition: 'background-color 0.3s',
        cursor: 'pointer'
    });

    return (
        <div style={gridStyle}>
            {Array(9).fill(null).map((_, index) => {
                const character = characters.find(c => c.position === index);
                return (
                    <div key={index} style={cellStyle}>
                        {character && (
                            <div style={characterStyle(character)} title={`${character.name} (Tick: ${character.tick})`}>
                                {character.name.charAt(0)}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
