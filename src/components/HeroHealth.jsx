export default function HeroHealth({ currentHealth, maxHealth }) {
    return (<div className="hero-health">
        {Array(maxHealth).fill().map((_, i) => (
            <span key={i} className={`heart ${i < currentHealth ? 'filled' : 'empty'}`}>
                {i < currentHealth ? '❤️' : '🖤'}
            </span>
        ))}
    </div>)
}