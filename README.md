# Automação de Testes - E-commerce de Passagens

Projeto de automação de testes E2E para plataforma de compra de passagens de ônibus utilizando Playwright e Cucumber.

> ** Projeto Acadêmico/Portfólio**: Este projeto é um exemplo de automação de testes para fins educacionais e de portfólio. Configure as variáveis de ambiente para apontar para seu próprio ambiente de testes.

## Tecnologias

- **Playwright** - Framework de automação de testes
- **Cucumber.js** - BDD (Behavior-Driven Development)
- **Node.js** - Runtime JavaScript
- **Page Object Model** - Padrão de design para organização dos testes

## Pré-requisitos

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

Instale os navegadores do Playwright:

```bash
npx playwright install
```

## Configuração

1. **Copie o arquivo de exemplo de variáveis de ambiente:**

```bash
cp .env.example .env
```

2. **Edite o arquivo `.env` com suas configurações:**

```env
# URLs do sistema
BASE_URL=https://seu-ecommerce.com.br

# Credenciais de teste - usuário comum
USUARIO_VALIDO=12345678900
SENHA_VALIDA=SuaSenhaSegura@123
SENHA_INVALIDA=senha_errada

# Credenciais de teste - estudante
USUARIO_VALIDO_ESTUDANTE=98765432100
SENHA_VALIDA_ESTUDANTE=SenhaEstudante@456

# Email de teste
EMAIL_TESTE=seu.email@example.com
```

> **Segurança**: Nunca compartilhe suas credenciais reais. O arquivo `.env` está no `.gitignore` e não será versionado.

##  Como rodar os testes

**Rodar todos os testes:**

```bash
npm test
```

**Rodar um cenário específico pelo nome:**

```bash
npx cucumber-js --name "nome do cenário"
```

**Exemplos:**

```bash
npx cucumber-js --name "Cancelar poltrona individual"
npx cucumber-js --name "Compra deslogado - básica"
npx cucumber-js --name "Login com sucesso"
```

**Rodar uma feature específica:**

```bash
npx cucumber-js features/cancelamento.feature
npx cucumber-js features/login.feature
npx cucumber-js features/compra.feature
```

## Estrutura do Projeto

```
AutomacaoPlaywright/
├── features/              # Arquivos .feature com os cenários BDD
│   ├── cadastro.feature
│   ├── cancelamento.feature
│   ├── compra.feature     # 20 cenários consolidados
│   └── login.feature
├── pages/                 # Page Objects (padrão POM)
│   ├── Cadastro.page.js
│   ├── Cancelamento.page.js
│   ├── CompraPassagem.page.js
│   └── Login.page.js
├── steps/                 # Step Definitions (implementação dos passos)
│   ├── cadastro.steps.js
│   ├── cancelamento.steps.js
│   ├── compraPassagem.steps.js
│   └── login.steps.js
├── support/              # Hooks e configurações
│   └── hooks.js          # Before/After hooks com tags
├── utils/                # Funções utilitárias
│   ├── gerarCpf.js       # Gerador de CPF válido
│   ├── gerarDataViagem.js # Gerador de datas aleatórias
│   ├── gerarNome.js      # Gerador de nomes
│   ├── gerarRg.js        # Gerador de RG
│   └── gerarTelefone.js  # Gerador de telefone
├── reports/              # Reports HTML pós-execução
├── .env.example          # Exemplo de variáveis de ambiente
├── .gitignore            # Arquivos ignorados pelo git
├── cucumber.js           # Configuração do Cucumber
└── package.json          # Dependências do projeto
```

## Features e Cenários (27 total)

### Login (2 cenários)
- ✅ Login com sucesso
- ✅ Login com senha inválida

### Cadastro (1 cenário)
- ✅ Realizar cadastro com dados válidos

### Cancelamento (2 cenários)
- ✅ Cancelar poltrona individual
- ✅ Cancelar por trecho - múltiplas poltronas

### Compra - Consolidado (20 cenários)

**Deslogado (4)**
- Compra deslogado - básica
- Compra deslogado - apenas seguro
- Compra deslogado - apenas carbono
- Compra deslogado - seguro e carbono

**Logado (4)**
- Compra logado - básica
- Compra logado - apenas seguro
- Compra logado - apenas carbono
- Compra logado - seguro e carbono

**Estudante (4)**
- Compra estudante - básica
- Compra estudante - apenas seguro
- Compra estudante - apenas carbono
- Compra estudante - seguro e carbono

**Ida e Volta Deslogado (4)**
- Ida e volta deslogado - básica
- Ida e volta deslogado - apenas seguro
- Ida e volta deslogado - apenas carbono
- Ida e volta deslogado - seguro e carbono

**Ida e Volta Logado (4)**
- Ida e volta logado - básica
- Ida e volta logado - apenas seguro
- Ida e volta logado - apenas carbono
- Ida e volta logado - seguro e carbono

## Tags Disponíveis

- `@logado` - Cenários que exigem autenticação prévia
- `@estudante` - Cenários com benefício de estudante

## Reports

Após executar os testes, um relatório HTML é gerado em:

```
reports/cucumber-report.html
```

Abra este arquivo no navegador para visualizar resultados detalhados.

## Configurações

- **Headless Mode**: `false` (navegador visível)
- **Timeout Padrão**: 60 segundos
- **Browser**: Chromium
- **Geração de Dados**: Automática (CPF, RG, telefone, nomes)

## Segurança

- ✅ Arquivo `.env` no `.gitignore`
- ✅ URLs configuráveis via variável de ambiente
- ✅ Credenciais não versionadas
- ✅ `.env.example` com valores genéricos

## Contribuindo

Este é um projeto de portfólio. Sugestões e melhorias são bem-vindas!

## Licença

Este projeto é de código aberto para fins educacionais.
