class LoginPage {
    constructor(page) {
        this.page = page;

        this.usuario = page.getByRole('textbox', { name: 'Usuário' });
        this.senha = page.getByRole('textbox', { name: 'Senha' });
        this.botaoEntrar = page.getByRole('button', { name: 'Entrar' });

        this.mensagemErro = page.getByText('Usuário ou Senha Inválidos');
        this.mensagemBoasVindas = page.getByText('Olá,');
    }

    async acessar() {
        await this.page.goto('https://ecommerce-hml-viop.passagensweb.com.br/Login');
    }

    async preencherCredenciais(usuario, senha) {
        await this.usuario.fill(usuario);
        await this.senha.fill(senha);
    }

    async clicarEntrar() {
        await this.botaoEntrar.click();
    }

    async validarLoginComSucesso() {
        await this.mensagemBoasVindas.waitFor({ timeout: 10000 });
    }

    async validarErroLogin() {
        await this.mensagemErro.waitFor({ timeout: 10000 });
    }
}

module.exports = { LoginPage };
