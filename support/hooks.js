const { setDefaultTimeout, Before, After, BeforeAll, AfterAll } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const { LoginPage } = require('../pages/Login.page');
const { CompraPassagemPage } = require('../pages/CompraPassagem.page');
const { setupAdminAuth } = require('./admin-auth');
require('dotenv').config();

setDefaultTimeout(180 * 1000); // 3 minutos para suportar operações longas

let browser;
let page;
let loginPage;
let compraPassagemPage;
let lastAdminFeature = '';

Before(async function (scenario) {
  console.log(`\n${'='.repeat(20)}`);
  console.log(`CENARIO: ${scenario.pickle.name}`);
  console.log(`${'='.repeat(20)}\n`);
});

Before({ tags: '@admin' }, async function (scenario) {
  const featureName = scenario.gherkinDocument?.feature?.name || '';
  
  // Verifica se já fez setup para esta feature específica
  if (lastAdminFeature === featureName) {
    console.log('[Admin Setup] Já foi configurado para esta feature');
    return;
  }
    
  const hasSeguroAtivo = scenario.pickle.tags.some(tag => tag.name === '@seguro-ativo');
  const hasSeguroInativo = scenario.pickle.tags.some(tag => tag.name === '@seguro-inativo');
  
  const seguroValue = hasSeguroAtivo ? 1 : (hasSeguroInativo ? 0 : null);
  
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  
  try {
    await setupAdminAuth(page, seguroValue);
    console.log('[Admin Setup] ✅ Setup concluído com sucesso');
  } catch (error) {
    console.error('[Admin Setup] Erro:', error.message);
  }
  
  this.page = page;
  this.browser = browser;
  lastAdminFeature = featureName;
});

Before({ tags: 'not @logado and not @estudante and not @admin' }, async function (scenario) {
  const featureName = scenario.gherkinDocument?.feature?.name || '';
  
  // Se é feature de admin (sem tag @admin), não precisa de hook especial
  // O step Given vai cuidar da autenticação
  if (featureName.includes('Admin') || featureName.includes('admin')) {
    return;
  }
  
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  
  this.page = page;
  this.browser = browser;
  this.compraPassagemPage = new CompraPassagemPage(page);
});

Before('@logado', async function () {
  // Se cenário tem @logado, cria um novo browser para login
  // mesmo que a feature tenha @admin
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  
  this.browser = browser;
  this.page = page;
  
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
  
  this.compraPassagemPage = compraPassagemPage;
});

Before('@estudante', async function () {
  // Se cenário tem @estudante, cria um novo browser para login
  // mesmo que a feature tenha @admin
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  
  this.browser = browser;
  this.page = page;
  
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
  
  this.compraPassagemPage = compraPassagemPage;
});

Before('@admin', async function () {
  // Não faz nada - o primeiro hook @admin já cuidou de tudo
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
