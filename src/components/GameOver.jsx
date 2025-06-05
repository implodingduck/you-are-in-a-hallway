export default function GameOver({ resetGame, score }) {
    return (
        <div className="game-over-overlay">
            <h2>Game Over</h2>
            <p>Final Score: {score}</p>
            <button onClick={resetGame}>Play Again</button>
        </div>

    )
}