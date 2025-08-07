# 🎬 Outsera Movies UI

Interface web desenvolvida em **Angular** como parte de um desafio técnico. 
O projeto utiliza boas práticas de organização de código, estilização moderna com Tailwind CSS, testes automatizados e integração com Cypress para testes E2E.

## 🚀 Tecnologias
- Angular (v16+)
- Tailwind CSS para estilização
- ESLint e Stylelint para lint de código e estilos
- Prettier para formatação
- RxJS para programação reativa
- Ngx-Toastr para notificações
- Cypress para testes end-to-end
- Jest para testes unitários
- Docker (Opcional) para containerização

## 📁 Estrutura do Projeto

```bash
desafio-outsera-ui/
│
├── src/                  # Código-fonte da aplicação
├── cypress/              # Testes end-to-end com Cypress
├── .eslintrc.json        # Configuração do ESLint
├── .stylelintrc.json     # Configuração do Stylelint
├── angular.json          # Configuração do projeto Angular
├── tailwind.config.ts    # Configuração do TailwindCSS
└── package.json          # Dependências e scripts
```

## 📦 Instalação

```bash
# Clonar o repositório
git clone https://github.com/andersonfranchetto/desafio-outsera-ui.git

# Instalar as dependências
npm install
```

## 🧪 Testes
### Testes Unitários
```bash
npm run test
```

### Testes End-to-End (Cypress)

```bash
npm run test:e2e
```

### Testes Headless

```bash
npm run test:headless
```

## 🖥️ Execução Local

```bash
npm run dev
# ou com host externo habilitado:
npm run dev:host
```

- A aplicação estará disponível em: http://localhost:4200

## 🐳 Docker
### Para rodar com Docker:

```bash
docker build -t desafio-outsera-ui .
docker run -p 4200:80 desafio-outsera-ui
```

### 👤 Author
`Anderson Franchetto`<br/>
`https://www.linkedin.com/in/anderson-franchetto/`
