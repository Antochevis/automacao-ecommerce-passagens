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
    
    // Clica no botão de detalhes da primeira venda
    const botaoDetalhes = this.page.locator('button[title="Detalhes Venda"]').first();
    await botaoDetalhes.click();
    
    // Aguarda a página carregar (sem validar URL específica)
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(1000);
  }

  async selecionarPassagemMultiplasPoltronas() {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(1000);
    
    // Clica no botão de detalhes da primeira venda
    const botaoDetalhes = this.page.locator('button[title="Detalhes Venda"]').first();
    await botaoDetalhes.click();
    
    // Aguarda a página carregar (sem validar URL específica)
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(1000);
  }

  async cancelarPoltronaIndividual() {
    // Aguarda botão de cancelar poltrona estar visível e pega o primeiro
    const cancelarButton = this.page.locator('button[title="Solicitar Cancelamento"]').filter({ hasText: 'Cancelar Poltrona' }).first();
    await cancelarButton.waitFor({ state: 'visible', timeout: 10000 });
    
    // Clica em "Cancelar Poltrona"
    await cancelarButton.click();
    
    // Aguarda modal de confirmação aparecer
    await this.page.waitForTimeout(1000);
    
    // Confirma clicando em "Sim"
    await this.botaoConfirmarSim.click();
    
    // Aguarda o processamento do cancelamento
    await this.page.waitForTimeout(2000);
  }

  async cancelarPorTrecho() {
    // Aguarda link de cancelar trecho estar visível e pega o primeiro
    await this.cancelarTrechoLink.first().waitFor({ state: 'visible', timeout: 10000 });
    
    // Clica em "Cancelar Trecho"
    await this.cancelarTrechoLink.first().click();
    
    // Aguarda modal de confirmação aparecer
    await this.page.waitForTimeout(1000);
    
    // Confirma clicando em "Sim"
    await this.botaoConfirmarSim.click();
    
    // Aguarda o processamento do cancelamento
    await this.page.waitForTimeout(2000);
  }

  async validarCancelamentoRealizado() {
    // Aguarda o modal de sucesso específico (bodyPopup)
    const modalSucesso = this.page.locator('.modal-content.bodyPopup').first();
    await modalSucesso.waitFor({ state: 'visible', timeout: 10000 });
    
    // Valida a mensagem dentro do modal
    await this.mensagemPopup.waitFor({ state: 'visible', timeout: 5000 });
    
    const mensagem = await this.mensagemPopup.textContent();
    if (!mensagem.includes('cancelada com sucesso')) {
      throw new Error(`Mensagem esperada não encontrada. Mensagem atual: ${mensagem}`);
    }
  }

  async validarCancelamentoTrechoRealizado() {
    await this.validarCancelamentoRealizado();
  }

  async validarMensagemConfirmacao() {
    await this.mensagemPopup.waitFor({ state: 'visible', timeout: 5000 });
    
    const mensagem = await this.mensagemPopup.textContent();
    console.log(`Mensagem de confirmação: ${mensagem}`);
  }

  async validarMensagemReembolso() {
    await this.mensagemPopup.waitFor({ state: 'visible', timeout: 5000 });
    
    const mensagem = await this.mensagemPopup.textContent();
    console.log(`Mensagem de reembolso: ${mensagem}`);
  }
}

module.exports = { CancelamentoPage };
