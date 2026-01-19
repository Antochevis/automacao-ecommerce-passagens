const { Given, When, Then } = require('@cucumber/cucumber');
const { CadastroPage } = require('../pages/Cadastro.page');

Given('que acesso a página de cadastro', async function () {
  this.cadastroPage = new CadastroPage(this.page);
  await this.cadastroPage.acessarPaginaCadastro();
});

When('preencho os dados do cadastro', async function () {
  await this.cadastroPage.preencherDadosCadastro();
});

When('submeto o formulário de cadastro', async function () {
  await this.cadastroPage.submeterFormulario();
});

Then('o cadastro deve ser realizado com sucesso', async function () {
  await this.cadastroPage.validarCadastroRealizado();
});
