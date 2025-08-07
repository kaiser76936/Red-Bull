import React, { useState } from 'react';

export default function ConsumoForm({ edicaoId, onSuccess }) {
  const [numberOfCans, setNumberOfCans] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const num = parseInt(numberOfCans);
    if (isNaN(num) || num <= 0) {
      setError('Por favor insira um número válido maior que zero.');
      return;
    }

    try {
      const res = await fetch(`/api/edicoes/${edicaoId}/consumos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number_of_cans: num }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.description || 'Erro ao registar consumo.');
      }
      setNumberOfCans('');
      onSuccess && onSuccess();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nº de latas consumidas:
        <input
          type="number"
          value={numberOfCans}
          onChange={e => setNumberOfCans(e.target.value)}
          min="1"
          required
        />
      </label>
      <button type="submit">Registar consumo</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}
