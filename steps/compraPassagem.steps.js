const { Given, When, Then } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const { CompraPassagemPage } = require('../pages/CompraPassagem.page');

const { gerarCpf } = require('../utils/gerarCpf');
const { gerarNomeCompleto } = require('../utils/gerarNome');

let browser;
let context;
let page;
let compraPassagemPage;

Given('que acesso a página principal do e-commerce', async function () {
  if (!this.compraPassagemPage) {
    compraPassagemPage = new CompraPassagemPage(this.page);
    this.compraPassagemPage = compraPassagemPage;
  }
  await this.compraPassagemPage.acessarPaginaPrincipal();
});

When('realizo a busca por uma passagem', async function () {
  await this.compraPassagemPage.buscarPassagem();
});

When('seleciono uma viagem disponível', async function () {
  await this.compraPassagemPage.selecionarViagemHorario430();
});

When('seleciono uma poltrona comum', async function () {
  let tentativas = 0;
  while (tentativas < 3) {
    try {
      await this.compraPassagemPage.selecionarPoltronaComum();
      break;
    } catch (e) {
      if (e.message.includes('RetryViagem')) {
        tentativas++;
        if (tentativas === 3) throw e;
        await this.page.goBack();
        await this.page.waitForTimeout(1000);
        await this.compraPassagemPage.selecionarViagemHorario430();
      } else {
        throw e;
      }
    }
  }
});

When('seleciono o seguro', async function () {
  await this.compraPassagemPage.selecionarSeguro();
});

When('desmarco o seguro', async function () {
  await this.page.getByRole('checkbox', { name: 'Quero viajar com mais seguran' }).uncheck();
});

When('clico em continuar sem seguro', async function () {
  await this.page.getByRole('button', { name: 'VIAJAR SEM SEGURO' }).click();
});

When('seleciono compensação de carbono', async function () {
  await this.compraPassagemPage.selecionarCompensacaoCarbono();
});

When('informo os dados do comprador', async function () {
  const nome = gerarNomeCompleto();
  const cpf = gerarCpf();

  await this.compraPassagemPage.preencherDadosComprador(
    nome,
    process.env.EMAIL_TESTE || 'usuario.teste@example.com',
    cpf
  );
  
  this.nomePassageiro = nome;
  this.cpfPassageiro = cpf;
});

When('informo os dados do passageiro', async function () {
  const nome = this.nomePassageiro || gerarNomeCompleto();
  const cpf = this.cpfPassageiro || gerarCpf();
  
  await this.compraPassagemPage.preencherDadosPassageiro(
    nome,
    cpf
  );
});

When('uso os dados do comprador para o passageiro e seleciono sou estudante', async function () {
  await this.compraPassagemPage.usarDadosCompradorParaPassageiroEstudante();
});

When('realizo o pagamento com cartão de crédito', async function () {
  await this.compraPassagemPage.pagarComCartaoCredito();
});

Then('a compra deve ser finalizada com sucesso', async function () {
  await this.compraPassagemPage.validarCompraFinalizada();
  if (this.browser) {
    await this.browser.close();
  }
});

When('seleciono a opção ida e volta', async function () {
  await this.compraPassagemPage.selecionarIdaVolta();
});

When('busco uma passagem ida e volta', async function () {
  await this.compraPassagemPage.buscarPassagemIdaVolta();
});

When('seleciono uma viagem e poltrona na ida', async function () {
  await this.compraPassagemPage.selecionarViagemEPoltronaIda();
});

When('seleciono uma viagem e poltrona na volta', async function () {
  await this.compraPassagemPage.selecionarViagemEPoltronaVolta();
});
