const { Given, When, Then } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const { LoginPage } = require('../pages/Login.page');
require('dotenv').config();

let browser;
let page;
let loginPage;

Given('que acesso a tela de login do e-commerce VIOP', async function () {
    browser = await chromium.launch({ headless: false });
    page = await browser.newPage();
    loginPage = new LoginPage(page);

    await loginPage.acessar();
});

When('informo um CPF e senha válidos', async function () {
    await loginPage.preencherCredenciais(
        process.env.USUARIO_VALIDO,
        process.env.SENHA_VALIDA
    );
});

When('informo um CPF válido e uma senha inválida', async function () {
    await loginPage.preencherCredenciais(
        process.env.USUARIO_VALIDO,
        process.env.SENHA_INVALIDA
    );
});

When('realizo o login', async function () {
    await loginPage.clicarEntrar();
});

Then('devo ser redirecionado e autenticado com sucesso', async function () {
    await loginPage.validarLoginComSucesso();
});

Then('devo ver uma mensagem de erro de autenticação', async function () {
    await loginPage.validarErroLogin();
});
