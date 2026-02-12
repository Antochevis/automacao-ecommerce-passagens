const { Given, When, Then } = require('@cucumber/cucumber');
const { CompraPassagemBeneficiosPage } = require('../pages/CompraPassagemBeneficios.page');

Given('que acesso a página principal de benefícios', async function () {
  if (!this.compraPassagemBeneficiosPage) {
    this.compraPassagemBeneficiosPage = new CompraPassagemBeneficiosPage(this.page);
  }
  await this.compraPassagemBeneficiosPage.acessarPaginaPrincipalBeneficios();
});

When('realizo a busca por uma passagem intermunicipal', async function () {
  await this.compraPassagemBeneficiosPage.buscarPassagemBeneficiosIntermunicipal();
});

When('realizo a busca por uma passagem interestadual', async function () {
  await this.compraPassagemBeneficiosPage.buscarPassagemBeneficiosInterestadual();
});

When('seleciono uma viagem disponível', async function () {
  await this.compraPassagemBeneficiosPage.selecionarViagemHorario430();
});

Then('visualizo o botão de benefícios', async function () {
  await this.compraPassagemBeneficiosPage.visualizarBotaoBeneficios();
});

Then('visualizo todos os benefícios disponíveis', async function () {
  await this.compraPassagemBeneficiosPage.visualizarOpcoesBeneficios();
});

Then('visualizo o popup ao selecionar benefício inativo', async function () {
  await this.compraPassagemBeneficiosPage.visualizarModalBeneficioInativo();
});
