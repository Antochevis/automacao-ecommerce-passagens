const { Given, When, Then } = require('@cucumber/cucumber');
const { setupAdminAuth, configurarSeguroDefaut } = require('../support/admin-auth');

Given('que estou autenticado no admin', async function() {
  // Se não tem page (feature sem @admin), autentica aqui
  if (!this.page) {
    const { chromium } = require('playwright');
    this.browser = await chromium.launch({ headless: false });
    this.page = await this.browser.newPage();
    await setupAdminAuth(this.page);
  }
  // Se já tem page (feature com @admin), apenas aguarda
  await this.page.waitForLoadState('networkidle');
});

When('eu defino seguro padrão como {string}', async function(valor) {
  const seguroValue = valor.toLowerCase() === 'ativo' ? 1 : 0;
  await configurarSeguroDefaut(this.page, seguroValue);
});

Then('o seguro padrão deve estar {string}', async function(status) {
  const statusTxt = status.toLowerCase() === 'ativo' ? 'ativado' : 'desativado';;
});
