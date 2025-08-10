import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEdicao, updateEdicao } from '../api';

export default function EditEdicaoForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', description: '', flavors: '' });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getEdicao(id)
      .then(data => {
        setFormData({ name: data.name || '', description: data.description || '', flavors: data.flavors || '' });
        setLoading(false);
      })
      .catch(err => setError(err.message));
  }, [id]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
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
      await updateEdicao(id, payload);
      navigate(`/edicoes/${id}`);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div>
      <h1>Editar Edição</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Descrição:
          <textarea name="description" value={formData.description} onChange={handleChange} />
        </label>
        <br />
        <label>
          Sabores:
          <input type="text" name="flavors" value={formData.flavors} onChange={handleChange} />
        </label>
        <br />
        <label>
          Nova Imagem:
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </label>
        <br />
        <button type="submit">Salvar Alterações</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
