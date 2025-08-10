export async function getEdicoes() {
  const res = await fetch('/api/edicoes');
  if (!res.ok) throw new Error('Erro ao buscar edições');
  return res.json();
}

export async function getEdicao(id) {
  const res = await fetch(`/api/edicoes/${id}`);
  if (!res.ok) throw new Error('Erro ao buscar edição');
  return res.json();
}

export async function createEdicao(data) {
  let options;
  if (data instanceof FormData) {
    options = { method: 'POST', body: data };
  } else {
    options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };
  }
  const res = await fetch('/api/edicoes', options);
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.description || 'Erro ao criar edição');
  }
  return res.json();
}

export async function registrarConsumo(edicaoId, number_of_cans) {
  const res = await fetch(`/api/edicoes/${edicaoId}/consumos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ number_of_cans }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.description || 'Erro ao registar consumo');
  }
  return res.json();
}

export async function updateEdicao(id, data) {
  let options;
  if (data instanceof FormData) {
    options = { method: 'POST', body: data };
  } else {
    options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };
  }
  const res = await fetch(`/api/edicoes/${id}`, options);
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.description || 'Erro ao atualizar edição');
  }
  return res.json();
}
