import "./Card.css";

export default function Card({ card }) {
    return (
        <div className="card">
            <h3 className="card-name">{card.name}</h3>
            <p className="card-type">{card.type}</p>
            <p className="card-description">{card.description}</p>
            {/* {card.tags && card.tags.length > 0 && (
                <div className="card-tags">
                    {card.tags.map((tag, index) => (
                        <span key={index} className="card-tag">
                            {tag}
                        </span>
                    ))}
                </div>
            )} */}
            { card.type === "Monster" ? 
            <div className="card-stats">
                <div className="card-attack">
                    <span className="swordicon"></span>{card.getEffectiveAttack()}
                </div>
                <div className="card-health" title={`Max Health: ${card.getEffectiveMaxHealth()}`}>
                    <span className="hearticon"></span>{card.getEffectiveHealth()}
                </div>
            </div> : "" }
        </div>
    );
}