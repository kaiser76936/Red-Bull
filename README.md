# Red-Bull
Projeto pessoal de check de red bull

# Tecnologias do projeto
- Base de Dados: MySQL/pgAdmin
- Backend: Node.js
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

python -m venv venv
venv\Scripts\activate

pip install --upgrade pip
pip install -r requirements.txt

pip freeze

flask run
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