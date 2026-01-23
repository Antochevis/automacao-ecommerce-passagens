const { Given, When, Then } = require('@cucumber/cucumber');
const { LoginPage } = require('../pages/Login.page');
require('dotenv').config();

Given('que acesso a tela de login do e-commerce', async function () {
    const loginPage = new LoginPage(this.page);
    this.loginPage = loginPage;
    await loginPage.acessar();
});

When('informo um CPF e senha válidos', async function () {
    await this.loginPage.preencherCredenciais(
        process.env.USUARIO_VALIDO,
        process.env.SENHA_VALIDA
    );
});

When('informo um CPF válido e uma senha inválida', async function () {
    await this.loginPage.preencherCredenciais(
        process.env.USUARIO_VALIDO,
        process.env.SENHA_INVALIDA
    );
});

When('realizo o login', async function () {
    await this.loginPage.clicarEntrar();
});

Then('devo ser redirecionado e autenticado com sucesso', async function () {
    await this.loginPage.validarLoginComSucesso();
});

Then('devo ver uma mensagem de erro de autenticação', async function () {
    await this.loginPage.validarErroLogin();
});
