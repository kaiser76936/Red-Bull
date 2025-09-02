import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/EdicaoCard.css';  

export default function EdicaoCard({ edicao }) {
  return (
    <div className="card">
      <img src={edicao.image_url || '/default-image.png'}  alt={edicao.name} />
      <div className="card-content">
        <h2>{edicao.name}</h2>
        <p>{edicao.description}</p>
        <p><strong>Sabores:</strong> {edicao.flavors}</p>
        <p><strong>{edicao.total_consumos}</strong></p>
        <Link to={`/edicoes/${edicao.id}`}>Ver detalhes</Link>
        <Link to={`/edicoes/${edicao.id}/edit`} style={{ marginLeft: '10px' }}>Editar</Link>
      </div>
    </div>
  );
}
