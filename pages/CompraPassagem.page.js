const { gerarNomeCompleto } = require('../utils/gerarNome');
const { gerarTelefone } = require('../utils/gerarTelefone');
const { gerarRg } = require('../utils/gerarRg');

const {
  gerarDiaAleatorio,
  calcularDiaVolta,
  precisaIrParaProximoMes,
} = require('../utils/gerarDataViagem');


class CompraPassagemPage {
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

  async acessarPaginaPrincipal() {
    await this.page.goto(`${process.env.BASE_URL}/Principal`);
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

  async buscarPassagem() {
    await this.origemInput.click();
    await this.page.getByText('Porto Alegre - RS').click();

    await this.destinoInput.fill('santa rosa');
    await this.page.getByText('Santa Rosa - RS').click();

    // Aguarda o calendário estar pronto
    await this.page.waitForSelector('td.day', { timeout: 10000 });
    await this.page.waitForTimeout(1000);

    const diaAleatorio = gerarDiaAleatorio();
    
    // Retry para encontrar o dia
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

  async selecionarViagemHorario430() {
    await this.botaoMapaPoltronas.first().waitFor({ state: 'visible', timeout: 10000 });
    const total = await this.botaoMapaPoltronas.count();
    const idx = Math.floor(Math.random() * total);
    await this.botaoMapaPoltronas.nth(idx).click();
    await this.fecharModalAtencao();
  }

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

  async selecionarSeguro() {
    const checkSeguro = this.page.locator('#checkQueroSeguro');
    await checkSeguro.check();
  }

  async selecionarCompensacaoCarbono() {
    const checkCarbono = this.page.locator('#checkQueroAjudar');
    await checkCarbono.check();
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

  async selecionarIdaVolta() {
    await this.page.getByText('Ida e Volta').click();
  }

  async buscarPassagemIdaVolta(
    origem = 'porto',
    destino = 'santo angel',
    dataIda = null,
    dataVolta = null
  ) {
    await this.origemInput.click();
    await this.origemInput.fill(origem);
    await this.page.getByText('Porto Alegre - RS').click();

    await this.destinoInput.click();
    await this.destinoInput.fill(destino);
    await this.page.getByText('Santo Ângelo - RS').click();

    const diaIda = dataIda ?? gerarDiaAleatorio(14, 21);

    if (precisaIrParaProximoMes(diaIda)) {
      await this.page.locator('.datepicker-days .next').click();
    }

    await this.page
      .locator('td.day:not(.disabled):not(.old):not(.new)', {
        hasText: String(diaIda),
      })
      .click();

    await this.page.getByRole('textbox', {
      name: 'Informe a Data de Viagem da Volta',
    }).click();

    const volta = calcularDiaVolta(diaIda);
    const diaVoltaFinal = dataVolta ?? volta.dia;

    if (volta.mes !== new Date().getMonth()) {
      await this.page.locator('.datepicker-days .next').click();
    }

    await this.page
      .locator('td.day:not(.disabled):not(.old):not(.new)', {
        hasText: String(diaVoltaFinal),
      })
      .click();

    await this.botaoBuscar.click();
  }


  async selecionarViagemEPoltronaIda() {
    // Aguarda o carregamento das viagens
    await this.page.waitForSelector('[id^="btnCarregaMapa-"]', { timeout: 15000 }).catch(() => {});
    await this.page.waitForTimeout(2000);

    let botaoMapa = this.page.locator('[id^="btnCarregaMapa-"]');
    let total = await botaoMapa.count();

    if (total === 0) {
      botaoMapa = this.page.locator('button[onclick*="Mapa"], [class*="mapa"], .btn-map');
      total = await botaoMapa.count();
    }

    if (total === 0) {
      throw new Error('Nenhum botão de mapa de poltrona encontrado para a ida');
    }

    const idx = Math.floor(Math.random() * total);
    await botaoMapa.nth(idx).waitFor({ state: 'visible', timeout: 10000 });
    await botaoMapa.nth(idx).click();

    await this.fecharModalAtencao();

    await this.page.waitForTimeout(1000);

    const formEmPe = this.page.locator('#qtdPassageirosEmPe').first();
    const poltrona = this.page.locator('.poltrona.livre').first();

    const emPeVisivel = await formEmPe.isVisible({ timeout: 2000 }).catch(() => false);
    const poltronaVisivel = await poltrona.isVisible({ timeout: 2000 }).catch(() => false);

    if (emPeVisivel) {
      const plusBtn = this.page.locator('#plusBtnEmPe');
      await plusBtn.click();
      await this.page.waitForTimeout(500);
      const botaoContinuar = this.page.locator('#botaoContinuar:not([disabled])').first();
      await botaoContinuar.click();
    } else if (poltronaVisivel) {
      await poltrona.waitFor({ state: 'visible', timeout: 5000 });
      await poltrona.click();
      await this.botaoContinuarReserva.click();
    }
  }

  async selecionarViagemEPoltronaVolta() {
    // Aguarda o carregamento das viagens
    await this.page.waitForSelector('[id^="btnCarregaMapa-"]', { timeout: 15000 }).catch(() => {});
    await this.page.waitForTimeout(2000);

    let botaoMapa = this.page.locator('[id^="btnCarregaMapa-"]');
    let total = await botaoMapa.count();

    if (total === 0) {
      botaoMapa = this.page.locator('button[onclick*="Mapa"], [class*="mapa"], .btn-map');
      total = await botaoMapa.count();
    }

    if (total === 0) {
      throw new Error('Nenhum botão de mapa de poltrona encontrado para a volta');
    }

    const idx = Math.floor(Math.random() * total);
    await botaoMapa.nth(idx).waitFor({ state: 'visible', timeout: 10000 });
    await botaoMapa.nth(idx).click();

    await this.fecharModalAtencao();

    await this.page.waitForTimeout(1000);

    const formEmPe = this.page.locator('#qtdPassageirosEmPe').first();
    const poltrona = this.page.locator('.poltrona.livre').first();

    const emPeVisivel = await formEmPe.isVisible({ timeout: 2000 }).catch(() => false);
    const poltronaVisivel = await poltrona.isVisible({ timeout: 2000 }).catch(() => false);

    if (emPeVisivel) {
      const plusBtn = this.page.locator('#plusBtnEmPe');
      await plusBtn.click();
      await this.page.waitForTimeout(500);
      const botaoContinuar = this.page.locator('#botaoContinuar:not([disabled])').first();
      await botaoContinuar.click();
    } else if (poltronaVisivel) {
      await poltrona.waitFor({ state: 'visible', timeout: 5000 });
      await poltrona.click();
      await this.botaoContinuarReserva.click();
    }
  }
}

module.exports = { CompraPassagemPage };
