const speakeasy = require('speakeasy');
require('dotenv').config();

async function setupAdminAuth(page, seguroDefaut = null) {
  try {    
    await page.goto(process.env.ADMIN_URL, { waitUntil: 'networkidle' });
    
    await page.locator('#LoginUsuario').click();
    await page.locator('#LoginUsuario').fill(process.env.ADMIN_USER);
    
    await page.locator('#LoginSenha').click();
    await page.locator('#LoginSenha').fill(process.env.ADMIN_PASS);
    
    await page.getByText('Logar').click();
    
    await page.getByRole('textbox', { name: 'Código' }).waitFor({ timeout: 10000 });
    
    const token = speakeasy.totp({
      secret: process.env.ADMIN_2FA_SECRET,
      encoding: 'base32'
    });
    
        await page.getByRole('textbox', { name: 'Código' }).click();
    await page.getByRole('textbox', { name: 'Código' }).fill(token);    
    
    await page.getByRole('button', { name: 'Autenticar' }).click();
    
    await page.waitForLoadState('networkidle');
    
    if (seguroDefaut !== null) {
      await configurarSeguroDefaut(page, seguroDefaut);
    }
    
    return true;
  } catch (error) {
    throw error;
  }
}

async function configurarSeguroDefaut(page, valor) {
  try {
    console.log('[Config Seguro] Aguardando elemento "Config. Projetos"');
    
    await page.getByRole('link', { name: 'Config. Projetos' }).waitFor({ timeout: 60000 });
    await page.getByRole('link', { name: 'Config. Projetos' }).click();
    
    console.log('[Config Seguro] Clicou em Config. Projetos');
    await page.waitForLoadState('networkidle');
    
    console.log('[Config Seguro] Selecionando seguro padrão como:', valor);
    await page.getByLabel('Seguro Padrão Ativo').selectOption(valor.toString());
    
    await page.getByRole('button', { name: 'Salvar' }).click();
    
    await page.waitForLoadState('networkidle');
    
    await page.getByText('Fechar').click();
    
    console.log('[Config Seguro] ✅ Configuração concluída');
    return true;
  } catch (error) {
    console.error('[Config Seguro] ❌ Erro:', error.message);
    throw error;
  }
}

module.exports = { setupAdminAuth, configurarSeguroDefaut };
