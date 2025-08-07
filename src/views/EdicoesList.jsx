import React, { useEffect, useState } from 'react';
import EdicaoCard from '../components/EdicaoCard';
import { Link } from 'react-router-dom';

export default function EdicoesList() {
  const [edicoes, setEdicoes] = useState([]);

  useEffect(() => {
    fetch('/api/edicoes')
      .then(res => res.json())
      .then(data => setEdicoes(data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h1>Edições de Red Bull</h1>
      <Link to="/add-edicao">+ Adicionar edição</Link>
      {edicoes.length === 0 ? <p>Nenhuma edição encontrada.</p> : null}
      {edicoes.map(e => (
        <EdicaoCard key={e.id} edicao={e} />
      ))}
    </div>
  );
}
