# cs-furia-chatbot

Um chatbot de perguntas e respostas sobre o time de CS:GO da FURIA, dividido em **backend** (NestJS + HLTV + OpenAI) e **frontend** (React + TypeScript). Fornece um endpoint `/chat` que consome dados em tempo real do HLTV e usa a API da OpenAI para gerar respostas.

---

## 📁 Estrutura do Projeto

```
cs-furia-chatbot/
├── backend/                # Servidor NestJS
│   ├── .env                # Variáveis de ambiente
│   ├── package.json        # Dependências e scripts
│   ├── tsconfig.json       # Configurações TypeScript
│   ├── nest-cli.json       # Configurações NestJS CLI
│   └── src/
│       ├── main.ts         # Ponto de entrada e CORS
│       ├── app.module.ts   # Importação de módulos
│       └── chat/
│           ├── chat.module.ts      # Módulo de chat
│           ├── chat.service.ts     # Lógica: HLTV + OpenAI
│           └── chat.controller.ts  # Rota POST /chat
└── frontend/               # App React
    ├── package.json        # Dependências e scripts
    ├── tsconfig.json       # Configurações TypeScript
    └── src/
        ├── index.tsx       # Montagem do React
        ├── App.tsx         # Componente principal
        └── components/
            └── Chat.tsx    # Interface de chat
```

---

## 🚀 Pré-requisitos

- **Node.js** v16+ e **npm** (ou **yarn**)
- **Chave de API da OpenAI** válida
- Acesso à internet para chamadas HLTV e OpenAI

---

## ⚙️ Instalação

### 1. Backend

```bash
cd cs-furia-chatbot/backend
npm install           # ou yarn install
```

Crie o arquivo `.env` com a chave da OpenAI:

```
OPENAI_API_KEY=sk-...
```

### 2. Frontend

```bash
cd ../frontend
npm install           # ou yarn install
```

---

## ▶️ Como executar

1. **Rodar o backend** (porta 3000):
   ```bash
   cd cs-furia-chatbot/backend
   npm run start:dev
   ```

2. **Rodar o frontend** (porta 3001 ou 3000, ajuste se necessário):
   ```bash
   cd ../frontend
   npm start
   ```

3. Acesse `http://localhost:3000` (ou `3001`) no navegador e comece a conversar com o bot!

---

## 🔧 Variáveis de Ambiente

| Chave               | Descrição                                    |
|---------------------|----------------------------------------------|
| OPENAI_API_KEY      | Chave secreta da API da OpenAI               |
| PORT (opcional)     | Porta que o NestJS vai escutar (padrão 3000) |
| REACT_APP_API_URL   | URL do backend para o frontend               |

---

## 🛠 Tecnologias

- **Backend**: NestJS, TypeScript, `hltv`, `openai`, dotenv
- **Frontend**: React, TypeScript, Axios, Tailwind CSS (opcional)

---

## 📄 Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [`LICENSE`](LICENSE) para mais detalhes.


