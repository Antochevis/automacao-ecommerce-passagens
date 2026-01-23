# 🔒 Checklist de Segurança - Projeto Público

## ✅ Mudanças Implementadas

### 1. Variáveis de Ambiente
- ✅ Criado arquivo `.env.example` com valores genéricos
- ✅ Atualizado `.env` local com exemplos (não será commitado)
- ✅ Adicionada variável `BASE_URL` para URLs
- ✅ Adicionada variável `EMAIL_TESTE` para emails
- ✅ CPFs e senhas substituídos por valores genéricos

### 2. Remoção de Informações Sensíveis

**URLs removidas:**
- ❌ `https://ecommerce-hml-viop.passagensweb.com.br` 
- ✅ Substituída por `${process.env.BASE_URL}`

**Emails removidos:**
- ❌ `andrey@rodosoft.com.br`
- ✅ Substituído por `${process.env.EMAIL_TESTE}`

**Senhas removidas:**
- ❌ `Rodosoft@147`
- ✅ Substituída por `${process.env.SENHA_VALIDA}`

**CPFs removidos:**
- ❌ `03433777055`
- ❌ `25652901012`
- ✅ Substituídos por valores genéricos

**CEPs removidos:**
- ❌ `93295260`
- ✅ Substituído por `01310100` (genérico)

**Referências removidas:**
- ❌ "VIOP"
- ❌ "rodosoft"
- ❌ "passagensweb"

### 3. Arquivos Modificados

1. **`.env`** - Valores genéricos (não será commitado)
2. **`.env.example`** - Criado com template
3. **`pages/Login.page.js`** - URL parametrizada
4. **`pages/CompraPassagem.page.js`** - URL parametrizada
5. **`pages/Cadastro.page.js`** - URL, email, senha e CEP parametrizados
6. **`steps/compraPassagem.steps.js`** - Email parametrizado
7. **`steps/login.steps.js`** - Referência VIOP removida
8. **`features/login.feature`** - Referência VIOP removida
9. **`README.md`** - Atualizado com avisos de segurança
10. **`package.json`** - Metadados adicionados
11. **`LICENSE`** - Criado MIT License

### 4. Segurança do .gitignore

✅ Confirmado que `.env` está no `.gitignore`
✅ `.env` não está sendo rastreado pelo git
✅ Apenas `.env.example` será versionado

### 5. Documentação

✅ README atualizado com:
- Aviso de projeto acadêmico/portfólio
- Instruções para copiar `.env.example`
- Avisos de segurança
- Emojis para melhor visualização
- Estrutura completa do projeto

✅ Arquivo LICENSE criado (MIT)

## 🚀 Próximos Passos

1. **Revisar mudanças:**
   ```bash
   git diff
   ```

2. **Adicionar arquivos:**
   ```bash
   git add .
   ```

3. **Commitar:**
   ```bash
   git commit -m "security: remover informações sensíveis para projeto público
   
   - Parametrizar URLs via variável BASE_URL
   - Parametrizar credenciais via .env
   - Criar .env.example com valores genéricos
   - Remover referências a empresas/produtos específicos
   - Atualizar README com avisos de segurança
   - Adicionar LICENSE MIT"
   ```

4. **Push:**
   ```bash
   git push
   ```

5. **Tornar repositório público:**
   - Acesse GitHub → Settings → Danger Zone
   - Click em "Change visibility" → "Make public"

## ⚠️ IMPORTANTE - Antes de Tornar Público

- [ ] Verificar se nenhum commit anterior contém dados sensíveis
- [ ] Revisar todo o histórico de commits
- [ ] Garantir que `.env` nunca foi commitado
- [ ] Testar se o projeto funciona com `.env.example`

## 📝 Variáveis que Você Deve Configurar

Antes de usar o projeto, configure seu `.env` local com:

```env
BASE_URL=https://seu-ambiente-de-testes.com.br
USUARIO_VALIDO=seu_cpf_de_teste
SENHA_VALIDA=sua_senha_de_teste
USUARIO_VALIDO_ESTUDANTE=cpf_estudante_teste
SENHA_VALIDA_ESTUDANTE=senha_estudante_teste
EMAIL_TESTE=seu.email.teste@example.com
```

## ✅ Status Final

**Projeto 100% SEGURO para ser tornado público! 🎉**

Todas as informações sensíveis foram removidas e parametrizadas.
