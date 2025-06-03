import './Game.css'
import { useState, useEffect } from 'react'
import { Dataloader } from '../apis/Dataloader.js'
import { MonsterCard } from '../models/MonsterCard.js'
import Card from './Card.jsx';

export default function Game() {
    const playerdecklist = ["Small Slime", "Small Slime", "Small Slime", "Gelatinous Monster", "Gelatinous Monster"]
    const enemydecklist = ["Goblin Minion", "Goblin Shaman", "Goblin Shaman", "Goblin Demolitionist", "Goblin Demolitionist"]

    const [turnNumber, setTurnNumber] = useState(0);
    const [playerDeck, setPlayerDeck] = useState([]);
    const [enemyDeck, setEnemyDeck] = useState([]);
    const [playerActiveCard, setPlayerActiveCard] = useState(null);
    const [playerActiveQueue, setPlayerActiveQueue] = useState([]);
    const [enemyActiveCard, setEnemyActiveCard] = useState(null);
    const [enemyActiveQueue, setEnemyActiveQueue] = useState([]);


    const dataloader = new Dataloader();

    useEffect(() => {
        void async function init() {
            await dataloader.init();
            // Load player and enemy decks from the decklists
            if (playerDeck.length === 0) {
                for (let cardname of playerdecklist) {
                    const monster = dataloader.monsters.find(m => m.name === cardname);
                    const card = new MonsterCard(
                        monster.name,
                        monster.type,
                        monster.description,
                        monster.health,
                        monster.attack,
                        monster.special,
                        monster.tags
                    );
                    if (card) {
                        setPlayerDeck(prevDeck => [...prevDeck, card]);
                    } else {
                        console.warn(`Card not found: ${cardname}`);
                    }
                }
            }

            // Load enemy deck from the enemydecklist
            if (enemyDeck.length === 0) {
                for (let cardname of enemydecklist) {
                    const monster = dataloader.monsters.find(m => m.name === cardname);
                    const card = new MonsterCard(
                        monster.name,
                        monster.type,
                        monster.description,
                        monster.health,
                        monster.attack,
                        monster.special,
                        monster.tags
                    );
                    if (card) {
                        setEnemyDeck(prevDeck => [...prevDeck, card]);
                    } else {
                        console.warn(`Card not found: ${cardname}`);
                    }
                }
            }
        }();
    }, []);

    const showDeck = (side) => {
        const deck = side === "player" ? playerDeck : enemyDeck;
        const deckList = deck.map(card => `${card.name} (${card.type})`).join('\n');
        alert(`Deck for ${side}:\n${deckList}`);
    }

    const handleStart = () => {
        setTurnNumber(1);
        // Initialize player and enemy active cards
        const paq = playerDeck.slice(0, 3);
        setPlayerDeck(prevDeck => prevDeck.slice(3)); // Remove the first 3 cards from the deck
        setPlayerActiveCard(paq.slice(0)[0] || null);
        // pull the top 3 cards from the deck for the queue
        setPlayerActiveQueue(paq);

        const eaq = enemyDeck.slice(0, 3);
        setEnemyDeck(prevDeck => prevDeck.slice(3)); // Remove the first 3 cards from the deck
        setEnemyActiveCard(eaq.slice(0)[0] || null);
        setEnemyActiveQueue(eaq);

    }


    const handleNext = () => {
        if (turnNumber === 0) return; // Prevent action if game hasn't started
        setTurnNumber(prev => prev + 1);
        if (playerActiveCard.type === "Monster" && enemyActiveCard.type === "Monster") {
            playerActiveCard.takeDamage(enemyActiveCard.getEffectiveAttack());
            enemyActiveCard.takeDamage(playerActiveCard.getEffectiveAttack());

            // Check if player card is defeated
            if (playerActiveCard.getEffectiveHealth() <= 0) {
                setPlayerActiveCard(playerActiveQueue[1] || null);
                // Remove the defeated card from the queue and add the next card from the deck to the queue
                setPlayerActiveQueue(prevQueue => {
                    const newQueue = [...prevQueue];
                    newQueue.shift(); // Remove the first card (defeated card)
                    if (playerDeck.length > 0) {
                        newQueue.push(playerDeck.shift()); // Add next card from deck
                    }
                    return newQueue;
                });
                setPlayerDeck(prevDeck => prevDeck.slice(0)); // Remove the card from the deck


            }
            // Check if enemy card is defeated
            if (enemyActiveCard.getEffectiveHealth() <= 0) {
                setEnemyActiveCard(enemyActiveQueue[1] || null);
                setEnemyActiveQueue(prevQueue => {
                    const newQueue = [...prevQueue];
                    newQueue.shift(); // Remove the first card (defeated card)
                    if (enemyDeck.length > 0) {
                        newQueue.push(enemyDeck.shift()); // Add next card from deck
                    }
                    return newQueue;
                });
                setEnemyDeck(prevDeck => prevDeck.slice(0)); // Remove the card from the deck

            }
        }
    }

    return (
        <div className="game-container">
            {turnNumber > 0 ? <>
                <div className="playcolumn">
                    <div className="active-container">
                        {playerActiveCard ? (
                            <Card card={playerActiveCard} />
                        ) : (
                            <div className="active-placeholder">Select a card</div>
                        )}
                    </div>
                    <div className="deck-container">
                        {playerActiveQueue.slice(1, 3).map((card, index) => (
                            <Card key={index} card={card} />
                        ))}
                    </div>
                    <button onClick={() => showDeck("player")}>Show Deck</button>
                </div>
                <div className="playcolumn top">
                    <div className="turn-number">Turn: {turnNumber}</div>
                    <button onClick={handleNext}>Next!</button>
                    <div className="vs-text">VS</div>
                </div>

                <div className="playcolumn">
                    <div className="active-container">
                        {enemyActiveCard ? (
                            <Card card={enemyActiveCard} />
                        ) : (
                            <div className="active-placeholder">Select a card</div>
                        )}
                    </div>
                    <div className="deck-container">
                        {enemyActiveQueue.slice(1, 3).map((card, index) => (
                            <Card key={index} card={card} />
                        ))}
                    </div>
                    <button onClick={() => showDeck("enemy")}>Show Deck</button>
                </div>
            </> : <button onClick={handleStart}>Start</button>}
        </div>
    );
}