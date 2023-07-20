import React, { useState } from 'react';
import './styles.css';

function Card({ card, onEdit, onDelete, onUpdate }) {
    const [title, setTitle] = useState(card.name);
    const [description, setDescription] = useState(card.description);
    const [thumbnail, setThumbnail] = useState(card.thumbnail);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onUpdate(card, title, description, thumbnail);
    };
  
    return (
      <div className="card">
        {card.isEditing ? (
          <form onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            <input type="text" value={thumbnail} onChange={(e) => setThumbnail(e.target.value)} />
            <button type="submit">Atualizar</button>
          </form>
        ) : (
          <>
            <img src={card.thumbnail} alt={card.name} />
            <h2>{card.name}</h2>
            <div className='action'>
              <button onClick={() => onEdit(card.id)}>Editar</button>
              <button onClick={() => onDelete(card.id)}>Remover</button>
            </div>
          </>
        )}
      </div>
    );
  }

export default Card;
