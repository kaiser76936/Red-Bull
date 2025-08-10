import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEdicao } from '../api'; 

export default function AddEdicaoForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    flavors: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.name.trim()) {
      setError("O campo 'name' é obrigatório.");
      return;
    }

    try {
      let payload;
      if (imageFile) {
        payload = new FormData();
        payload.append('name', formData.name);
        payload.append('description', formData.description);
        payload.append('flavors', formData.flavors);
        payload.append('image', imageFile);
      } else {
        payload = formData;
      }
      await createEdicao(payload);
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
          Nome: <input type="text" name="name" value={formData.name} onChange={handleChange} required/>
        </label>
        <br />

        <label>
          Descrição: <textarea name="description" value={formData.description} onChange={handleChange}/>
        </label>
        <br />

        <label>
          Sabores: <input type="text" name="flavors" value={formData.flavors} onChange={handleChange}/>
        </label>
        <br />

        <label>
          Imagem: <input type="file" accept="image/*" onChange={handleFileChange}/>
        </label>
        <br />

        <button type="submit">Adicionar Edição</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
