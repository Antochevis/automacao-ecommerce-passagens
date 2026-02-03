const { Given, When, Then } = require('@cucumber/cucumber');
const { configurarSeguroDefaut } = require('../support/admin-auth');

Given('que estou autenticado no admin', async function() {
  await this.page.waitForLoadState('networkidle');
});

When('eu defino seguro padrão como {string}', async function(valor) {
  const seguroValue = valor.toLowerCase() === 'ativo' ? 1 : 0;
  await configurarSeguroDefaut(this.page, seguroValue);
});

Then('o seguro padrão deve estar {string}', async function(status) {
  const statusTxt = status.toLowerCase() === 'ativo' ? 'ativado' : 'desativado';;
});
