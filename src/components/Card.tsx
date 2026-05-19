import React from 'react';
import { CardType } from '../types';
import '../styles/Card.css';

interface CardProps {
  card: CardType;
  onClick: (cardId: string) => void;
}

const Card: React.FC<CardProps> = ({ card, onClick }) => {
  return (
    <div
      className={`card ${card.isFlipped ? 'flipped' : ''} ${card.isMatched ? 'matched' : ''}`}
      onClick={() => !card.isFlipped && !card.isMatched && onClick(card.id)}
    >
      <div className="card-inner">
        <div className="card-front">
          <span>?</span>
        </div>
        <div className="card-back">
          {card.image.startsWith('http') ? (
            <img src={card.image} alt="Card" />
          ) : (
            <span>{card.image}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;