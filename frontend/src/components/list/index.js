import React from 'react';
import Card from '../card';
import './styles.css';

function List({ cards, onEdit, onDelete, onUpdate }) {
  return (
    <div className="list">
      {cards.map((card) => (
        <Card key={card.id} card={card} onEdit={onEdit} onDelete={onDelete} onUpdate={onUpdate} />
      ))}
    </div>
  );
}

export default List;