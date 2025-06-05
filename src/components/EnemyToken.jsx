import './EnemyToken.css';

export default function EnemyToken({ enemy }) {
    return (
        <div className="enemy-container">
            <div className={`enemy`} title={JSON.stringify(enemy)}>
                <span>E</span>
            </div>
        </div>
    );
}