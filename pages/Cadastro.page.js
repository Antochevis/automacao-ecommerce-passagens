const { gerarNomeCompleto } = require('../utils/gerarNome');
const { gerarCpf } = require('../utils/gerarCpf');
const { gerarRg } = require('../utils/gerarRg');
const { gerarTelefone } = require('../utils/gerarTelefone');

class CadastroPage {
  constructor(page) {
    this.page = page;
    
    this.perfilIcon = page.getByRole('img', { name: 'perfil-icon' });
    this.botaoCadastrar = page.getByRole('button', { name: 'Cadastrar' });
    
    this.nomeInput = page.getByRole('textbox', { name: 'Nome Empresa Nome Completo' });
    this.cpfInput = page.getByRole('textbox', { name: 'CPF' });
    this.rgInput = page.getByRole('textbox', { name: 'RG' });
    this.emailInput = page.getByRole('textbox', { name: 'Preencha o e-mail' });
    this.confirmarEmailInput = page.getByRole('textbox', { name: 'Confirme o e-mail' });
    this.tipoTelefoneSelect = page.getByLabel('Tipo de Telefone');
    this.telefoneInput = page.getByRole('textbox', { name: 'Número' });
    this.dataNascimentoInput = page.getByRole('textbox', { name: 'Data Nascimento' });
    this.senhaInput = page.getByRole('textbox', { name: 'Senha', exact: true });
    this.confirmarSenhaInput = page.getByRole('textbox', { name: 'Confirmação de Senha' });
    this.cepInput = page.getByRole('textbox', { name: 'CEP' });
    
    this.botaoSubmeter = page.getByRole('button', { name: 'Cadastrar' });
  }

  async acessarPaginaCadastro() {
    await this.page.goto('https://ecommerce-hml-viop.passagensweb.com.br/Principal');
    
    try {
      const btnReiniciar = this.page.getByRole('button', { name: 'Reiniciar Sessão' });
      if (await btnReiniciar.isVisible({ timeout: 2000 })) {
        await btnReiniciar.click();
      }
    } catch {}
    
    await this.perfilIcon.click();
    await this.botaoCadastrar.click();
  }

  async preencherDadosCadastro() {
    const nome = gerarNomeCompleto();
    const cpf = gerarCpf();
    const rg = gerarRg();
    const telefone = gerarTelefone();
    const email = 'andrey@rodosoft.com.br';
    
    await this.nomeInput.click();
    await this.nomeInput.fill(nome);
    
    await this.cpfInput.click();
    await this.cpfInput.fill(cpf);
    
    await this.rgInput.click();
    await this.rgInput.fill(rg);
    
    await this.emailInput.click();
    await this.emailInput.fill(email);
    
    await this.confirmarEmailInput.click();
    await this.confirmarEmailInput.fill(email);
    
    await this.tipoTelefoneSelect.selectOption('1'); // Celular
    
    await this.telefoneInput.click();
    await this.telefoneInput.fill(telefone);
    
    await this.dataNascimentoInput.click();
    await this.dataNascimentoInput.fill('10/10/2000');
    
    await this.senhaInput.click();
    await this.senhaInput.fill('Rodosoft@147');
    
    await this.confirmarSenhaInput.click();
    await this.confirmarSenhaInput.fill('Rodosoft@147');
    
    await this.cepInput.click();
    await this.cepInput.fill('93295260');
    
    await this.page.waitForTimeout(1000);
  }

  async submeterFormulario() {
    await this.botaoSubmeter.click();
  }

  async validarCadastroRealizado() {
    await this.page.waitForSelector('.modal-content', { timeout: 10000 });
    
    const mensagemSucesso = this.page.locator('.mensagemPopup');
    await mensagemSucesso.waitFor({ state: 'visible', timeout: 5000 });
    
    const texto = await mensagemSucesso.textContent();
    console.log(`Mensagem encontrada: ${texto}`);
    
    if (!texto.includes('realizado com sucesso') && !texto.includes('sucesso')) {
      throw new Error(`Mensagem de sucesso não encontrada. Mensagem atual: ${texto}`);
    }
  }
}

module.exports = { CadastroPage };