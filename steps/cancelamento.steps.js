const { Given, When, Then } = require('@cucumber/cucumber');
const { CancelamentoPage } = require('../pages/Cancelamento.page');

Given('que estou logado e tenho uma compra realizada', async function () {
  this.cancelamentoPage = new CancelamentoPage(this.page);
});

When('acesso meus pedidos', async function () {
  await this.cancelamentoPage.acessarMeusPedidos();
});

When('seleciono uma passagem para cancelar', async function () {
  await this.cancelamentoPage.selecionarPassagemParaCancelar();
});

When('cancelo uma poltrona individual', async function () {
  await this.cancelamentoPage.cancelarPoltronaIndividual();
});

Then('o cancelamento deve ser realizado com sucesso', async function () {
  await this.cancelamentoPage.validarCancelamentoRealizado();
});

Then('devo receber uma mensagem de confirmação', async function () {
  await this.cancelamentoPage.validarMensagemConfirmacao();
});

When('seleciono uma passagem com múltiplas poltronas', async function () {
  await this.cancelamentoPage.selecionarPassagemMultiplasPoltronas();
});

When('cancelo todo o trecho', async function () {
  await this.cancelamentoPage.cancelarPorTrecho();
});

Then('o cancelamento do trecho deve ser realizado com sucesso', async function () {
  await this.cancelamentoPage.validarCancelamentoTrechoRealizado();
});

Then('devo receber uma mensagem de reembolso', async function () {
  await this.cancelamentoPage.validarMensagemReembolso();
});
