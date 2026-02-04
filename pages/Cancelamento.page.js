class CancelamentoPage {
  constructor(page) {
    this.page = page;
    
    this.menuSanduiche = page.locator('#svg19');
    this.areaDoClienteLink = page.getByText('Área do cliente');
    this.minhasComprasLink = page.locator('#divMinhasCompras').getByText('Minhas Compras');
    
    this.cancelarTrechoLink = page.locator('a').filter({ hasText: 'Cancelar Trecho' });
    this.cancelarPoltronaButton = page.getByRole('button', { name: 'Cancelar Poltrona' });
    this.botaoConfirmarSim = page.getByRole('button', { name: 'Sim' });
    
    this.modalContent = page.locator('.modal-content');
    this.mensagemPopup = page.locator('.mensagemPopup');
  }

  async acessarMeusPedidos() {
    await this.menuSanduiche.click();
    
    await this.areaDoClienteLink.click();
    
    await this.page.waitForURL('**/Voucher?tipo=3');
  }

  async selecionarPassagemParaCancelar() {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(1000);
    
    const botaoDetalhes = this.page.locator('button[title="Detalhes Venda"]').first();
    await botaoDetalhes.click();
    
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(1000);
  }

  async selecionarPassagemMultiplasPoltronas() {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(1000);
    
    const botaoDetalhes = this.page.locator('button[title="Detalhes Venda"]').first();
    await botaoDetalhes.click();
    
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(1000);
  }

  async cancelarPoltronaIndividual() {
    const cancelarButton = this.page.locator('button[title="Solicitar Cancelamento"]').filter({ hasText: 'Cancelar Poltrona' }).first();
    await cancelarButton.waitFor({ state: 'visible', timeout: 10000 });
    
    await cancelarButton.click();
    
    await this.page.waitForTimeout(1000);
    
    await this.botaoConfirmarSim.click();
    
    await this.page.waitForTimeout(3000);
  }

  async cancelarPorTrecho() {
    await this.cancelarTrechoLink.first().waitFor({ state: 'visible', timeout: 10000 });
    
    await this.cancelarTrechoLink.first().click();
    
    await this.page.waitForTimeout(1000);
    
    await this.botaoConfirmarSim.click();
    
    await this.page.waitForTimeout(3000);
  }

  async validarCancelamentoRealizado() {
    await this.mensagemPopup.waitFor({ state: 'visible', timeout: 90000 });
    
    const mensagem = await this.mensagemPopup.textContent();
    
    if (!mensagem.includes('cancelada com sucesso')) {
      throw new Error(`Mensagem esperada não encontrada. Mensagem atual: ${mensagem}`);
    }
  }

  async validarCancelamentoTrechoRealizado() {
    await this.validarCancelamentoRealizado();
  }

  async validarMensagemConfirmacao() {
    await this.mensagemPopup.waitFor({ state: 'visible', timeout: 90000 });
    
    const mensagem = await this.mensagemPopup.textContent();
  }

  async validarMensagemReembolso() {
    await this.mensagemPopup.waitFor({ state: 'visible', timeout: 90000 });
    
    const mensagem = await this.mensagemPopup.textContent();
  }
}

module.exports = { CancelamentoPage };
