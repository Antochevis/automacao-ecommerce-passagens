const { setDefaultTimeout, Before, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const { LoginPage } = require('../pages/Login.page');
const { CompraPassagemPage } = require('../pages/CompraPassagem.page');
require('dotenv').config();

setDefaultTimeout(60 * 1000);

let browser;
let page;
let loginPage;
let compraPassagemPage;

Before({ tags: 'not @logado and not @estudante' }, async function () {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  
  this.page = page;
  this.browser = browser;
  this.compraPassagemPage = new CompraPassagemPage(page);
});

Before('@logado', async function () {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  
  loginPage = new LoginPage(page);
  await loginPage.acessar();
  await loginPage.preencherCredenciais(
    process.env.USUARIO_VALIDO,
    process.env.SENHA_VALIDA
  );
  await loginPage.clicarEntrar();
  
  await loginPage.validarLoginComSucesso();
  
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);
  
  compraPassagemPage = new CompraPassagemPage(page);
  
  this.page = page;
  this.browser = browser;
  this.compraPassagemPage = compraPassagemPage;
});

Before('@estudante', async function () {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  
  loginPage = new LoginPage(page);
  await loginPage.acessar();
  await loginPage.preencherCredenciais(
    process.env.USUARIO_VALIDO_ESTUDANTE,
    process.env.SENHA_VALIDA_ESTUDANTE
  );
  await loginPage.clicarEntrar();
  
  await loginPage.validarLoginComSucesso();
  
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);
  
  compraPassagemPage = new CompraPassagemPage(page);
  
  this.page = page;
  this.browser = browser;
  this.compraPassagemPage = compraPassagemPage;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});
