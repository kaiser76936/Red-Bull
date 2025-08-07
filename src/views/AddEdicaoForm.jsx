import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddEdicaoForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    flavors: '',
    image_url: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.name.trim()) {
      setError("O campo 'name' é obrigatório.");
      return;
    }

    try {
      const res = await fetch('/api/edicoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.description || 'Erro ao criar edição.');
      }

      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Nova Edição de Red Bull</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Descrição:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Sabores:
          <input
            type="text"
            name="flavors"
            value={formData.flavors}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          URL da imagem:
          <input
            type="text"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
          />
        </label>
        <br />

        <button type="submit">Adicionar Edição</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
