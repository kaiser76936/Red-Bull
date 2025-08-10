import React, { useEffect, useState } from 'react';
import EdicaoCard from '../components/EdicaoCard';
import { Link } from 'react-router-dom';
import { getEdicoes } from '../api';

export default function EdicoesList() {
  const [edicoes, setEdicoes] = useState([]);

  useEffect(() => {
    getEdicoes()
      .then(setEdicoes)
      .catch(console.error);
  }, []);

  return (
    <div>
      <h1>Edições de Red Bull</h1>
      <div className="cards-container">
        {edicoes.map(e => (
          <EdicaoCard key={e.id} edicao={e} />
        ))}
      </div>
      <Link to="/add-edicao">+ Adicionar edição</Link>
      {edicoes.length === 0 ? <p>Nenhuma edição encontrada.</p> : null}
    </div>
  );
}
