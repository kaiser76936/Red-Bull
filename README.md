# Red-Bull
Projeto pessoal de check de red bull

# Tecnologias do projeto
- Base de Dados: PostgreSQL
- Backend: Flask
- Frontend: React

# Requisitos
| Requisito | Versão |
| --------- | ------ |
| SQL | 17 |
| Python | 3.x |

# Iniciar ou desligar SQL
```
pg_ctl start -D "D:\Program Files\PostgreSQL\17\data" #iniciar

pg_ctl stop -D "D:\Program Files\PostgreSQL\17\data" #desligar
```

# Instalar e iniciar a venv
```
# na diretoria api

python -m venv venv     # cria venv
venv\Scripts\activate   ## ativa venv

pip install --upgrade pip           # atualiza pip
pip install -r requirements.txt     # instala as dependências

pip freeze                          # lista as dependências instaladas

flask run                           ## inicia o servidor Flask

## -> comandos a usar para lançar normalmente com tudo instalado
```
# Instalar e iniciar o frontend
```
npm install

npm run dev
```

# Estrutura do projeto
```
Sistemas-Distribuidos/
│   README.md
│   start.bat
├── .github/workflows/
├── api/
├── src/
    ├── assets/
    ├── components/
    ├── router/
    └── views/
```