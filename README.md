# Automação de Testes - E-commerce de Passagens

Projeto de automação de testes E2E para plataforma de compra de passagens de ônibus utilizando Playwright e Cucumber.

## Pré-requisitos

Você vai precisar ter instalado na sua máquina:

- Node.js (versão 18 ou superior)
- npm ou yarn
- Git

## Instalação

Clone o repositório e instale as dependências:

```bash
git clone <url-do-repositorio>
cd AutomacaoPlaywright
npm install
```

Após a instalação, instale os navegadores do Playwright:

```bash
npx playwright install
```

## Configuração

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```
USUARIO_VALIDO=seu_cpf_aqui
SENHA_VALIDA=sua_senha_aqui
SENHA_INVALIDA=senha_errada
USUARIO_VALIDO_ESTUDANTE=cpf_estudante_aqui
SENHA_VALIDA_ESTUDANTE=senha_estudante_aqui
```

Substitua os valores pelas credenciais reais de teste.

## Como rodar os testes

Para rodar todos os testes:

```bash
npm test
```

Para rodar um cenário específico pelo nome:

```bash
npx cucumber-js --name "nome do cenário"
```

Exemplos:

```bash
npx cucumber-js --name "Cancelar poltrona individual"
npx cucumber-js --name "Realizar compra deslogado"
npx cucumber-js --name "Realizar login com sucesso"
```

Para rodar apenas uma feature específica:

```bash
npx cucumber-js features/cancelamento.feature
npx cucumber-js features/login.feature
npx cucumber-js features/compra_deslogado.feature
```

## Estrutura do Projeto

```
AutomacaoPlaywright/
├── features/              # Arquivos .feature com os cenários de teste
│   ├── cadastro.feature
│   ├── cancelamento.feature
│   ├── compra_deslogado.feature
│   ├── compra_estudante.feature
│   ├── compra_ida_volta.feature
│   ├── compra_logado.feature
│   └── login.feature
├── pages/                 # Page Objects (classes que representam as páginas)
│   ├── Cadastro.page.js
│   ├── Cancelamento.page.js
│   ├── CompraPassagem.page.js
│   └── Login.page.js
├── steps/                 # Step Definitions (implementação dos passos)
│   ├── cadastro.steps.js
│   ├── cancelamento.steps.js
│   ├── compraPassagem.steps.js
│   └── login.steps.js
├── support/              # Hooks e configurações gerais
│   └── hooks.js
├── utils/                # Funções utilitárias
│   ├── gerarCpf.js
│   ├── gerarDiaAleatorio.js
│   ├── gerarNome.js
│   ├── gerarRg.js
│   └── gerarTelefone.js
├── reports/              # Reports HTML gerados após execução
├── cucumber.js           # Configuração do Cucumber
└── package.json
```

## Features Disponíveis

### Login
- Login com sucesso
- Login com senha inválida

### Cadastro
- Realizar cadastro com sucesso

### Compra Deslogado
- Compra básica sem seguro e compensação de carbono
- Compra com seguro viagem
- Compra com compensação de carbono
- Compra com seguro e compensação de carbono

### Compra Logado
- Compra básica
- Compra com seguro viagem
- Compra com compensação de carbono
- Compra com seguro e compensação de carbono

### Compra Estudante
- Compra básica
- Compra com seguro viagem
- Compra com compensação de carbono
- Compra com seguro e compensação de carbono

### Compra Ida e Volta
- Compra básica
- Compra com seguro viagem
- Compra com compensação de carbono
- Compra com seguro e compensação de carbono

### Cancelamento
- Cancelar poltrona individual
- Cancelar por trecho (múltiplas poltronas)

## Tags Disponíveis

Os cenários utilizam tags para organização:

- `@logado` - Cenários que exigem login prévio
- `@estudante` - Cenários com desconto de estudante

## Reports

Após a execução dos testes, um report HTML é gerado em `reports/cucumber-report.html`. Abra este arquivo no navegador para ver os resultados detalhados.

## Observações

- Os testes rodam com o navegador visível por padrão (headless: false)
- Timeout padrão configurado: 60 segundos
- Os dados de passageiros são gerados aleatoriamente pelos utilitários em `utils/`
- Cada execução fecha o navegador automaticamente no final
