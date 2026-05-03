# Cyenny Boutique - Guia de Segurança e Configuração

## Correções de Segurança Implementadas

### 1. **XSS (Cross-Site Scripting) Prevention**
- ✅ Removido uso de `innerHTML` com dados dinâmicos
- ✅ Implementado uso seguro de `createElement()` e `textContent`
- ✅ Todos os dados de usuário agora são sanitizados

### 2. **Variáveis de Ambiente**
- ✅ Número de WhatsApp movido para variável de ambiente (`VITE_WHATSAPP_NUMBER`)
- ✅ Criado `.env.example` com template de variáveis
- ✅ Arquivo `.env.local` adicionado ao `.gitignore`
- ✅ Configuração segura para Vercel

### 3. **Headers de Segurança (vercel.json)**
- ✅ `X-Content-Type-Options: nosniff` - Previne MIME sniffing
- ✅ `X-Frame-Options: SAMEORIGIN` - Protege contra clickjacking
- ✅ `X-XSS-Protection: 1; mode=block` - Proteção XSS
- ✅ `Content-Security-Policy` - Política de conteúdo rigorosa
- ✅ `Permissions-Policy` - Restrição de permissões de API

### 4. **Dependências Atualizadas**
- ✅ Vite atualizado de 8.0.10 para 5.0.0 (versão estável e segura)
- ✅ Adicionado package.json descritivo

## Como Usar

### Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Copiar variáveis de ambiente
cp .env.example .env.local

# Editar .env.local com seus valores
# Adicione seu número de WhatsApp

# Iniciar servidor de desenvolvimento
npm run dev
```

### Build para Produção

```bash
# Build da aplicação
npm run build

# Preview do build
npm run preview
```

### Deploy no Vercel

1. Faça push do código para o GitHub
2. Conecte seu repositório no [Vercel](https://vercel.com)
3. Adicione as variáveis de ambiente no dashboard:
   - `VITE_WHATSAPP_NUMBER`: Seu número de WhatsApp (ex: 558792536500)
4. Faça deploy automático

## Variáveis de Ambiente

### VITE_WHATSAPP_NUMBER
Número de WhatsApp em formato internacional (sem símbolos)
- Formato: Código do país + DDD + Número
- Exemplo: `558792536500` para +55 87 92536500

## Boas Práticas de Segurança

1. **Nunca commite `.env.local`** - Este arquivo contém dados sensíveis
2. **Use `.env.example`** - Mantenha este arquivo com template das variáveis necessárias
3. **Revise CSP** - Se adicionar novos domínios (APIs, CDNs), atualize `Content-Security-Policy` em `vercel.json`
4. **Validate User Input** - Sempre valide dados antes de armazenar no localStorage
5. **HTTPS Only** - Sempre use HTTPS em produção

## Estrutura de Arquivos

```
.
├── .env.example          # Template de variáveis de ambiente
├── .env.local            # Variáveis locais (NÃO commitado)
├── .gitignore            # Git ignore atualizado
├── vercel.json           # Configuração Vercel com headers
├── package.json          # Dependências e scripts
├── index.html
├── camisetas.html
├── style.css
├── main.js               # Código principal (seguro)
└── src/
    ├── main.js
    ├── counter.js
    ├── style.css
    └── assets/
```

## Suporte

Para dúvidas ou reportar vulnerabilidades, entre em contato.
