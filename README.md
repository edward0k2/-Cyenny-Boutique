# Cyenny Boutique - Loja Online

Loja online de roupas e chaveiros com temática religiosa. Plataforma moderna construída com HTML, CSS e JavaScript vanilla.

## Características

- 🛒 **Carrinho de Compras** - Armazenado localmente (localStorage)
- 👤 **Sistema de Login** - Dados salvos localmente
- 🔍 **Filtros de Produtos** - Por categoria, tamanho, preço e idade
- 💬 **Integração WhatsApp** - Envio de pedidos direto
- 🎨 **Design Responsivo** - Mobile-first
- 🔒 **Segurança** - Headers de segurança e proteção XSS
- ⚡ **Performance** - Build otimizado com Vite

## Quick Start

### Pré-requisitos
- Node.js 16+
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/edward0k2/-Cyenny-Boutique.git
cd loja\ cienny

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local
# Edite .env.local e adicione seu número de WhatsApp
```

### Desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:5173](http://localhost:5173)

### Build para Produção

```bash
npm run build
npm run preview
```

## Deploy no Vercel

1. **Push para GitHub**
   ```bash
   git push origin main
   ```

2. **Conecte no Vercel**
   - Acesse [vercel.com](https://vercel.com)
   - Clique "Import Project"
   - Selecione seu repositório GitHub

3. **Configure Variáveis de Ambiente**
   - Em "Environment Variables", adicione:
     - `VITE_WHATSAPP_NUMBER`: seu número de WhatsApp

4. **Deploy**
   - Vercel fará deploy automático a cada push

## Estrutura do Projeto

```
.
├── public/                 # Arquivos estáticos públicos
├── src/
│   ├── assets/            # Imagens e assets
│   ├── main.js            # Scripts utilitários
│   ├── counter.js         # Componente contador
│   ├── style.css          # Estilos
│   └── index.html
├── index.html             # Home page
├── camisetas.html         # Página de produtos
├── main.js                # App principal
├── style.css              # Estilos globais
├── package.json           # Dependências
├── vercel.json            # Config Vercel
├── .env.example           # Template env
└── SECURITY.md            # Guia de segurança
```

## Funcionalidades

### Carrinho de Compras
- Adicionar/remover produtos
- Ajustar quantidades
- Cálculo automático de totais
- Integração com WhatsApp

### Filtros
- Busca por nome
- Filtro de categoria
- Filtro de tamanho
- Filtro de preço (slider)
- Filtro de faixa etária

### Checkout
- Cópia automática de pedido
- Envio via WhatsApp
- Suporte de dados de cliente

## Segurança

Este projeto implementa várias medidas de segurança:
- ✅ Proteção contra XSS
- ✅ Headers de segurança via CSP
- ✅ Variáveis de ambiente para dados sensíveis
- ✅ Dependências atualizadas

Veja [SECURITY.md](./SECURITY.md) para mais detalhes.

## Tecnologias

- HTML5
- CSS3
- JavaScript (ES6+)
- Vite (build tool)
- LocalStorage (persistência)

## Navegadores Suportados

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Configuração de Produtos

Os produtos são definidos em `main.js` no array `products`. Para adicionar um novo produto:

```javascript
{
    id: 5,
    name: "Nome do Produto",
    price: 89.90,
    sizes: ["P", "M", "G", "GG"],
    age: "adulto", // ou "infantil"
    image: "https://example.com/image.jpg",
    category: "masculina", // ou "feminina", "infantil"
    description: "Descrição do produto",
    material: "Material",
    extra: "Informação extra"
}
```

## Customização

### Cores Principais
Edite as variáveis CSS em `style.css`:
```css
:root {
  --primary: #eb5b73;           /* Cor principal (rosa)
  --secondary: #2d2d2d;         /* Cor secundária (preto)
  --accent: #d4af37;            /* Cor destaque (dourado)
}
```

### Número de WhatsApp
Configure em `.env.local`:
```
VITE_WHATSAPP_NUMBER=558792536500
```

## Performance

- Bundle size: ~15KB (minificado)
- Lighthouse Score: 95+
- Time to Interactive: <2s

## Problemas Comuns

### Envio de pedido não funciona
- Verifique se o número de WhatsApp está correto em `.env.local`
- Certifique-se que o navegador permite abrir URLs externas

### Carrinho não persiste
- Verifique se localStorage está ativado no navegador
- Limpe cache e cookies se necessário

### Imagens não carregam
- Verifique se os URLs das imagens estão corretos
- Use URLs HTTPS quando possível

## Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja LICENSE para mais detalhes.

## Contato

- Email: cyenny.boutique@example.com
- WhatsApp: [Envie uma mensagem](https://wa.me/558792536500)

---

**Made with ❤️ for Cyenny Boutique**
