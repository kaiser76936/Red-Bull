import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ConsumoForm from '../components/ConsumoForm';
import { getEdicao } from '../api'; 

export default function EdicaoDetail() {
  const { id } = useParams();
  const [edicao, setEdicao] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchEdicao = () => {
    setLoading(true);
    getEdicao(id)
      .then(data => {
        setEdicao(data);
        setLoading(false);
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchEdicao();
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (!edicao) return <p>Edição não encontrada.</p>;

  return (
    <div>
      <h1>{edicao.name}</h1>
      <img 
        src={edicao.image_url || '/default-image.png'} 
        alt={edicao.name} 
        style={{ width: '200px', height: 'auto', borderRadius: 6 }} 
      />
      <p>{edicao.description}</p>
      <p><strong>Sabores:</strong> {edicao.flavors}</p>

      <h2>Consumos</h2>
      <ul>
        {edicao.consumos.length === 0 && <li>Nenhum consumo registado.</li>}
        {edicao.consumos.map(c => (
          <li key={c.id}>Latas consumidas: {c.number_of_cans}</li>
        ))}
      </ul>

      <h3>Registar novo consumo</h3>
      <ConsumoForm edicaoId={id} onSuccess={fetchEdicao} />
    </div>
  );
}
