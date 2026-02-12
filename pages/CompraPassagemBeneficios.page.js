const {
  gerarNomeCompleto,
  gerarTelefone,
  gerarRg,
  gerarDiaAleatorio,
  calcularDiaVolta,
  precisaIrParaProximoMes,
} = require('../utils/gerador');


class CompraPassagemBeneficiosPage {
  constructor(page) {
    this.page = page;

    this.origemInput = page.getByRole('textbox', { name: 'Informe a Origem' });
    this.destinoInput = page.getByRole('status', { name: 'Informe o Destino' });
    this.botaoBuscar = page.getByRole('button', { name: 'Buscar' });

    this.botaoMapaPoltronas = page.locator('[id^="btnCarregaMapa-"]');
    this.botaoContinuarReserva = page.getByRole('button', { name: 'Continuar reserva' });

    this.nomeCompletoInput = page.locator('#NomeCompleto');
    this.emailInput = page.getByRole('textbox', { name: 'E-mail' });
    this.documentoInput = page.locator('#documento');
    this.telefoneInput = page.getByRole('textbox', { name: '(DDD) Telefone' });

    this.passageiroNomeInput = page.locator('#passageiroNome-Passageiro-1');
    this.passageiroDocumentoInput = page.locator('#doc-Passageiro-1');
    this.passageiroCpfInput = page.locator('#cpf-Passageiro-1');

    this.botaoCartaoCredito = page.getByRole('button', { name: 'Cartão de Crédito' });
    this.numeroCartaoInput = page.getByRole('textbox', { name: 'Número do cartão' });
    this.validadeInput = page.getByRole('textbox', { name: 'Validade' });
    this.cvvInput = page.getByRole('textbox', { name: 'CVV' });
    this.nomeCartaoInput = page.getByRole('textbox', { name: 'Nome (como aparece no cartão)' });
    this.cpfTitularInput = page.getByRole('textbox', { name: 'CPF do titular do cartão' });
    this.botaoPagar = page.getByRole('button', { name: 'Pagar' });
  }

  async acessarPaginaPrincipalBeneficios() {
    await this.page.goto(`${process.env.URL_BENEFICIOS}/Principal`);
  }

  async fecharModalAtencao() {
    const modal = this.page.locator('.modal-header.tituloPopup').first();
    const btnConfirmar = this.page.locator('#btnConfirmar').first();

    try {
      if (await modal.isVisible({ timeout: 2000 })) {
        await btnConfirmar.click();
        await this.page.waitForTimeout(500);
      }
    } catch {
    }
  }

  async buscarPassagemBeneficiosIntermunicipal() {
    await this.origemInput.click();
    await this.page.getByText('Porto Alegre - RS').click();

    await this.destinoInput.fill('santa rosa');
    await this.page.getByText('Santa Rosa - RS').click();

    await this.page.waitForSelector('td.day', { timeout: 10000 });
    await this.page.waitForTimeout(1000);

    const diaAleatorio = gerarDiaAleatorio();
    
    let tentativas = 0;
    while (tentativas < 3) {
      try {
        await this.page.locator('td.day:not(.disabled):not(.old)').getByText(diaAleatorio.toString()).first().click({ timeout: 5000 });
        break;
      } catch (e) {
        tentativas++;
        if (tentativas === 3) throw e;
        await this.page.waitForTimeout(1000);
      }
    }

    await this.page.waitForTimeout(500);
    await this.botaoBuscar.click();
  }

    async buscarPassagemBeneficiosInterestadual() {
    await this.origemInput.click();
    await this.origemInput.fill('Guaira');
    await this.page.getByText('Guaira - PR').click();

    await this.destinoInput.fill('Mundo Novo');
    await this.page.getByText('Mundo Novo - MS').click();

    await this.page.waitForSelector('td.day', { timeout: 10000 });
    await this.page.waitForTimeout(1000);

    const diaAleatorio = gerarDiaAleatorio();
    
    let tentativas = 0;
    while (tentativas < 3) {
      try {
        await this.page.locator('td.day:not(.disabled):not(.old)').getByText(diaAleatorio.toString()).first().click({ timeout: 5000 });
        break;
      } catch (e) {
        tentativas++;
        if (tentativas === 3) throw e;
        await this.page.waitForTimeout(1000);
      }
    }

    await this.page.waitForTimeout(500);
    await this.botaoBuscar.click();
  }

  async selecionarViagemHorario() {
    await this.botaoMapaPoltronas.first().waitFor({ state: 'visible', timeout: 10000 });
    const total = await this.botaoMapaPoltronas.count();
    const idx = Math.floor(Math.random() * total);
    await this.botaoMapaPoltronas.nth(idx).click();
    await this.fecharModalAtencao();
  }

  async visualizarBotaoBeneficios() {
    await this.page.waitForSelector('#filtro-btn-2', { timeout: 10000 });
  }

  async visualizarOpcoesBeneficios() {
    await this.page.waitForSelector('#filtro-btn-2', { timeout: 10000 });
    await this.page.click('#filtro-btn-1');
    await this.page.waitForSelector('opcoes-2', { timeout: 10000 });
  }

  async visualizarModalBeneficioInativo() {
    await this.page.waitForSelector('#filtro-btn-2', { timeout: 10000 });
    await this.page.click('#filtro-btn-2');
    await this.page.waitForSelector('#modal-opcoes-2.tituloPopup', { timeout: 10000 });
    await this.page.click('[onclick="alertaLoginConstrutiva()"]');
    await this.page.waitForSelector('.modal-header.tituloPopup', { timeout: 10000 });
  }



  /*

  async selecionarPoltronaComum() {
    await this.page.waitForTimeout(2000);

    await this.fecharModalAtencao();

    const formEmPe = this.page.locator('#qtdPassageirosEmPe');
    const emPeVisivel = await formEmPe.isVisible({ timeout: 3000 }).catch(() => false);

    if (emPeVisivel) {
      const plusBtn = this.page.locator('#plusBtnEmPe');
      await plusBtn.waitFor({ state: 'visible', timeout: 5000 });
      await plusBtn.click();
      await this.page.waitForTimeout(1000);

      const botaoContinuar = this.page.getByRole('button', { name: 'Continuar reserva' });
      await botaoContinuar.waitFor({ state: 'visible', timeout: 5000 });
      await botaoContinuar.click();
    } else {
      await this.page.waitForSelector('span[class="poltrona livre"][onclick]', { timeout: 10000 }).catch(() => {});

      let poltronasLivres = this.page.locator('span[class="poltrona livre"][onclick]');
      let count = await poltronasLivres.count();

      if (count === 0) {
        throw new Error('Nenhuma poltrona livre encontrada - RetryViagem');
      }

      const idx = Math.floor(Math.random() * count);
      const poltrona = poltronasLivres.nth(idx);

      await poltrona.scrollIntoViewIfNeeded();
      await poltrona.click({ force: true });
      await this.page.waitForTimeout(1000);

      const botaoContinuar = this.page.getByRole('button', { name: 'Continuar reserva' });
      await botaoContinuar.waitFor({ state: 'visible', timeout: 5000 });
      await botaoContinuar.click();
    }
  }

  async preencherDadosComprador(nome, email, documento) {
    await this.nomeCompletoInput.click();
    await this.nomeCompletoInput.fill(nome);

    await this.emailInput.click();
    await this.emailInput.fill(email);

    await this.documentoInput.click();
    await this.documentoInput.fill(documento);

    await this.telefoneInput.click();
    await this.telefoneInput.fill(gerarTelefone());
  }

  async preencherDadosPassageiro(nome, cpf) {
    await this.passageiroNomeInput.click();
    await this.passageiroNomeInput.fill(nome);

    await this.passageiroDocumentoInput.click();
    await this.passageiroDocumentoInput.fill(gerarRg());

    await this.passageiroCpfInput.click();
    await this.passageiroCpfInput.fill(cpf);
  }

  async usarDadosCompradorParaPassageiroEstudante() {
    await this.page.waitForTimeout(1000);

    await this.page.evaluate(() => {
      const link = document.querySelector('a.dadosComprador.Passageiro-1');
      if (link) {
        link.click();
      }
    });

    await this.page.waitForTimeout(1000);

    const checkEstudante = this.page.locator('#checkEstudantePassageiro-1');
    await checkEstudante.check();
  }

  async pagarComCartaoCredito() {
    await this.botaoCartaoCredito.click();

    await this.page.waitForTimeout(3000);

    await this.numeroCartaoInput.click();
    await this.numeroCartaoInput.fill('4000000000002024');

    await this.validadeInput.click();
    await this.validadeInput.fill('122030');

    await this.cvvInput.click();
    await this.cvvInput.fill('123');

    await this.nomeCartaoInput.click();
    await this.nomeCartaoInput.fill(gerarNomeCompleto());

    await this.cpfTitularInput.click();
    await this.cpfTitularInput.fill('79684886055');

    await this.page.waitForTimeout(1000);
    await this.botaoPagar.click();

    await this.page.waitForTimeout(5000);
  }

  async validarCompraFinalizada() {
    await this.page.getByRole('button', { name: 'Imprimir passagem' }).waitFor({
      timeout: 300000
    });
  } 
    */
}

module.exports = { CompraPassagemBeneficiosPage };
