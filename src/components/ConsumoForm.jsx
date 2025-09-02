import React, { useState } from 'react';
import { registrarConsumo } from '../api'; 

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
      await registrarConsumo(edicaoId, num);
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
        <input type="number" value={numberOfCans} onChange={e => setNumberOfCans(e.target.value)} min="1" required/>
      </label>
      <button type="submit">Registar consumo</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}