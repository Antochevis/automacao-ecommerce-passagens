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
    
    await page.getByRole('link', { name: 'Config. Projetos' }).click();
    
    await page.waitForLoadState('networkidle');
    
    await page.getByLabel('Seguro Padrão Ativo').selectOption(valor.toString());
    
    await page.getByRole('button', { name: 'Salvar' }).click();
    
    await page.waitForLoadState('networkidle');
    
    await page.getByText('Fechar').click();
    
    return true;
  } catch (error) {
    throw error;
  }
}

module.exports = { setupAdminAuth, configurarSeguroDefaut };
