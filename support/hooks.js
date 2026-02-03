const { setDefaultTimeout, Before, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const { LoginPage } = require('../pages/Login.page');
const { CompraPassagemPage } = require('../pages/CompraPassagem.page');
const { setupAdminAuth } = require('./admin-auth');
require('dotenv').config();

setDefaultTimeout(60 * 1000);

let browser;
let page;
let loginPage;
let compraPassagemPage;

Before(async function (scenario) {
  console.log(`\n${'='.repeat(20)}`);
  console.log(`CENARIO: ${scenario.pickle.name}`);
  console.log(`${'='.repeat(20)}\n`);
});

Before({ tags: 'not @logado and not @estudante and not @admin' }, async function () {
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

Before('@admin and not @seguro-ativo and not @seguro-inativo', async function () {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  
  await setupAdminAuth(page);
  
  this.page = page;
  this.browser = browser;
});

Before('@admin and @seguro-ativo', async function () {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  
  await setupAdminAuth(page, 1);
  
  this.page = page;
  this.browser = browser;
});

Before('@admin and @seguro-inativo', async function () {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  
  await setupAdminAuth(page, 0);

  this.page = page;
  this.browser = browser;
});

After(async function () {
  try {
    if (this.browser) {
      const contexts = await this.browser.contexts();
      for (const context of contexts) {
        const pages = await context.pages();
        for (const page of pages) {
          await page.close();
        }
      }
      await this.browser.close();
    }
  } catch (error) {
  }
});
