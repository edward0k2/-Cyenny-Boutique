// ============================================================
// BANCO DE PRODUTOS
// Aqui ficam todos os produtos da loja. Para adicionar um novo
// produto, basta copiar um bloco { ... } e alterar os dados.
// ============================================================
const products = [
    {
        id: 1,                                      // ID único do produto
        name: "Camiseta São José - Vinho",           // Nome exibido na loja
        price: 89.90,                                // Preço em reais
        sizes: ["P", "M", "G", "GG"],                // Tamanhos disponíveis
        age: "adulto",                               // Faixa etária: "adulto" ou "infantil"
        image: "sao_jose.png",                       // Caminho da imagem do produto
        category: "masculina",                       // Categoria (masculina/feminina/infantil)
        description: "Uma peça que une devoção e elegância. Com estampa clássica de São José, o padroeiro das famílias.",
        material: "100% Algodão Premium",
        extra: "Costura reforçada e acabamento de alta qualidade."
    },
    {
        id: 2,
        name: "Camiseta Altar Silencioso - Preta",
        price: 89.90,
        sizes: ["P", "M", "G", "GG"],
        age: "adulto",
        image: "altar_silencioso.jpg",
        category: "feminina",
        description: "Inspirada no silêncio do sagrado, esta peça traz o Ostensório em detalhes dourados.",
        material: "Malha Menegotti 30.1",
        extra: "Toque macio e durabilidade excepcional."
    },
    {
        id: 3,
        name: "Camiseta Nossa Senhora das Graças",
        price: 59.90,
        sizes: ["P", "M", "G"],
        age: "adulto",
        image: "https://placehold.co/400x500/fdf2f4/eb5b73?text=N.Sra+Graças",
        category: "feminina",
        description: "Clássica e delicada, perfeita para o dia a dia com a proteção de Nossa Senhora.",
        material: "Algodão Confort",
        extra: "Disponível também em outras cores sob encomenda."
    },
    {
        id: 4,
        name: "Camiseta Infantil Anjo da Guarda",
        price: 49.90,
        sizes: ["P", "M"],
        age: "infantil",
        image: "https://placehold.co/400x500/fdf2f4/eb5b73?text=Anjo+da+Guarda",
        category: "infantil",
        description: "Para os pequenos estarem sempre protegidos pelo seu anjinho.",
        material: "Algodão Hipoalergênico",
        extra: "Super macia para a pele sensível das crianças."
    }
];

// ============================================================
// PONTO DE ENTRADA – roda quando a página termina de carregar
// ============================================================
document.addEventListener('DOMContentLoaded', () => {

    // Se a página possui o grid de produtos (camisetas.html), inicializa filtros
    const productGrid = document.getElementById('product-grid');
    if (productGrid) {
        initProductListing();
    }

    // Inicializa tudo que é global (funciona em TODAS as páginas)
    initGlobalScripts();
});

// ============================================================
// LISTAGEM E FILTROS (só roda em camisetas.html)
// ============================================================
function initProductListing() {
    // Elementos da página de listagem
    const productGrid = document.getElementById('product-grid');    // Grid onde os cards aparecem
    const searchInput = document.getElementById('product-search');  // Campo de busca
    const priceRange = document.getElementById('price-range');      // Slider de preço máximo
    const priceValue = document.getElementById('price-value');      // Texto mostrando o preço do slider
    const categoryCheckboxes = document.querySelectorAll('input[name="category"]');  // Checkboxes de categoria
    const sizeCheckboxes = document.querySelectorAll('input[name="size"]');  // Checkboxes de tamanho
    const ageRadios = document.querySelectorAll('input[name="age"]');        // Radios de idade
    const noResults = document.getElementById('no-results');        // Mensagem "nenhum produto"

    // Renderiza os cards de produto no grid
    function renderProducts(filteredProducts) {
        productGrid.innerHTML = '';  // Limpa o grid

        // Se não há produtos, mostra mensagem
        if (filteredProducts.length === 0) {
            noResults.style.display = 'block';
            return;
        }

        noResults.style.display = 'none';

        // Cria um card para cada produto
        filteredProducts.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.setAttribute('data-id', product.id);
            card.style.cursor = 'pointer';
            
            const productImage = document.createElement('div');
            productImage.className = 'product-image';
            const img = document.createElement('img');
            img.src = product.image;
            img.alt = product.name;
            productImage.appendChild(img);
            
            const productInfo = document.createElement('div');
            productInfo.className = 'product-info';
            const typeSpan = document.createElement('span');
            typeSpan.className = 'type';
            typeSpan.textContent = 'CAMISETA';
            const h3 = document.createElement('h3');
            h3.textContent = product.name;
            const priceP = document.createElement('p');
            priceP.className = 'product-price';
            priceP.textContent = `R$ ${product.price.toFixed(2).replace('.', ',')}`;
            
            productInfo.appendChild(typeSpan);
            productInfo.appendChild(h3);
            productInfo.appendChild(priceP);
            card.appendChild(productImage);
            card.appendChild(productInfo);

            // Ao clicar no card, abre o modal com os detalhes
            card.addEventListener('click', () => openModal(product));
            productGrid.appendChild(card);
        });
    }

    // Aplica todos os filtros e re-renderiza
    function filterProducts() {
        const searchTerm = searchInput.value.toLowerCase();
        const maxPrice = parseFloat(priceRange.value);
        const selectedCategories = Array.from(categoryCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);
        const selectedSizes = Array.from(sizeCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);
        const selectedAge = Array.from(ageRadios)
            .find(r => r.checked).value;

        const filtered = products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm);
            const matchesPrice = product.price <= maxPrice;
            const matchesCategory = selectedCategories.length === 0 ||
                selectedCategories.some(cat => product.category && product.category.toLowerCase().includes(cat));
            const matchesSize = selectedSizes.length === 0 ||
                selectedSizes.some(size => product.sizes.includes(size));
            const matchesAge = selectedAge === 'todos' || product.age === selectedAge;

            return matchesSearch && matchesPrice && matchesCategory && matchesSize && matchesAge;
        });

        renderProducts(filtered);
    }

    // Conecta os eventos dos filtros
    if (searchInput) searchInput.addEventListener('input', filterProducts);
    if (priceRange) priceRange.addEventListener('input', (e) => {
        priceValue.textContent = `R$ ${e.target.value}`;
        filterProducts();
    });
    categoryCheckboxes.forEach(cb => cb.addEventListener('change', filterProducts));
    sizeCheckboxes.forEach(cb => cb.addEventListener('change', filterProducts));
    ageRadios.forEach(r => r.addEventListener('change', filterProducts));

    // Renderiza todos os produtos ao carregar
    renderProducts(products);
}

// ============================================================
// SCRIPTS GLOBAIS (rodam em TODAS as páginas)
// ============================================================
function initGlobalScripts() {

    // --- SMOOTH SCROLL ---
    // Faz os links com "#" rolarem suavemente até a seção
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Ignora se for apenas "#" (usado nos botões de login/carrinho)
            if (href === '#') return;
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // --- MODAL DO PRODUTO ---
    // Configura os botões de fechar do modal de produto
    const productModal = document.getElementById('product-modal');
    if (productModal) {
        const closeBtn = productModal.querySelector('.close-modal');
        const overlay = productModal.querySelector('.modal-overlay');

        closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', closeModal);

        // Conecta os cards estáticos da HOME (preview-cards) para abrir o modal
        document.querySelectorAll('.preview-card').forEach((card) => {
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => {
                const title = card.querySelector('h3').textContent;
                const product = products.find(p => p.name.includes(title)) || products[0];
                openModal(product);
            });
        });
    }

    // Inicializa o sistema de Login
    initLogin();

    // Inicializa o Carrinho
    initCart();

    // Inicializa o zoom da imagem no modal
    initZoom();
}

// ============================================================
// SISTEMA DE LOGIN (salva no localStorage)
// ============================================================
function initLogin() {
    const loginBtn = document.getElementById('user-btn');         // Botão "ENTRAR" no header
    const loginModal = document.getElementById('login-modal');    // Modal de login inteiro
    if (!loginBtn || !loginModal) return; // Sai se os elementos não existirem na página

    const loginForm = document.getElementById('login-form');          // Formulário dentro do modal
    const closeLogin = loginModal.querySelector('.close-modal');       // Botão X do modal
    const loginOverlay = loginModal.querySelector('.modal-overlay');   // Fundo escuro do modal
    const userProfile = document.getElementById('user-profile');      // Div que mostra "Olá, Nome!"
    const displayName = document.getElementById('display-user-name'); // Span com o nome do usuário
    const logoutBtn = document.getElementById('logout-btn');          // Botão "Sair"

    // Abre o modal de login ao clicar em "ENTRAR"
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.classList.add('active');
    });

    // Fecha o modal ao clicar no X
    closeLogin.addEventListener('click', () => {
        loginModal.classList.remove('active');
    });

    // Fecha o modal ao clicar no fundo escuro
    loginOverlay.addEventListener('click', () => {
        loginModal.classList.remove('active');
    });

    // Quando o formulário é enviado (botão "SALVAR E ENTRAR")
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('user-name').value.trim();
        const phone = document.getElementById('user-phone').value.trim();
        if (name) {
            // Salva os dados do usuário no localStorage
            const user = { name, phone };
            localStorage.setItem('cyenny_user', JSON.stringify(user));

            // Atualiza a interface: esconde o form, mostra o perfil
            displayName.textContent = name;
            loginForm.style.display = 'none';
            userProfile.style.display = 'block';

            // Atualiza o texto do botão no header
            loginBtn.textContent = name.split(' ')[0].toUpperCase();
        }
    });

    // Logout: remove dados e volta para o formulário
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('cyenny_user');
        loginForm.style.display = 'flex';
        userProfile.style.display = 'none';
        loginForm.reset();
        loginBtn.textContent = 'ENTRAR';
    });

    // AO CARREGAR A PÁGINA: verifica se já existe um usuário salvo
    const stored = localStorage.getItem('cyenny_user');
    if (stored) {
        const user = JSON.parse(stored);
        displayName.textContent = user.name;
        loginForm.style.display = 'none';
        userProfile.style.display = 'block';
        loginBtn.textContent = user.name.split(' ')[0].toUpperCase();
    }
}

// ============================================================
// SISTEMA DE CARRINHO (salva no localStorage)
// ============================================================
function initCart() {
    const cartBtn = document.getElementById('cart-btn');               // Botão "CARRINHO" no header
    const cartSidebar = document.getElementById('cart-sidebar');       // Sidebar lateral do carrinho
    const cartOverlay = document.getElementById('cart-overlay');       // Fundo escuro atrás da sidebar
    const closeCartBtn = document.getElementById('close-cart');        // Botão X da sidebar
    const checkoutBtn = document.getElementById('checkout-btn');       // Botão "FINALIZAR COMPRA"
    const cartBadge = document.getElementById('cart-badge');           // Badge com número de itens
    const cartItemsContainer = document.getElementById('cart-items-container'); // Div com a lista de itens
    const cartTotalEl = document.getElementById('cart-total-price');   // Span com o valor total

    if (!cartBtn || !cartSidebar) return; // Sai se os elementos não existirem

    // Abre a sidebar do carrinho
    cartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        cartSidebar.classList.add('active');
        cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Trava scroll do body
        renderCart();
    });

    // Fecha a sidebar do carrinho
    function closeCart() {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    closeCartBtn.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);

    // FINALIZAR COMPRA: monta lista, copia, e abre o WhatsApp
    checkoutBtn.addEventListener('click', () => {
        const cart = getCart();
        if (cart.length === 0) return;

        // Busca o nome do cliente logado (se houver)
        const userData = JSON.parse(localStorage.getItem('cyenny_user') || '{}');
        const clientName = userData.name || 'Cliente';

        // ── Monta a mensagem formatada ──
        let lines = [];
        lines.push(`✝ *PEDIDO — Cyenny Boutique* ✝`);
        lines.push(`━━━━━━━━━━━━━━━━━━━━`);
        lines.push(`👤 *Cliente:* ${clientName}`);
        if (userData.phone) {
            lines.push(`📱 *Celular:* ${userData.phone}`);
        }
        lines.push(`━━━━━━━━━━━━━━━━━━━━`);
        lines.push(``);

        let total = 0;
        cart.forEach((item, index) => {
            const subtotal = item.price * item.quantity;
            total += subtotal;
            lines.push(`*${index + 1}. ${item.name}*`);
            lines.push(`   📏 Tamanho: ${item.size || '-'}`);
            lines.push(`   🔢 Quantidade: ${item.quantity}`);
            lines.push(`   💰 Subtotal: R$ ${subtotal.toFixed(2).replace('.', ',')}`);
            lines.push(``);
        });

        lines.push(`━━━━━━━━━━━━━━━━━━━━`);
        lines.push(`🛒 *TOTAL: R$ ${total.toFixed(2).replace('.', ',')}*`);
        lines.push(`━━━━━━━━━━━━━━━━━━━━`);
        lines.push(``);
        lines.push(`Aguardo confirmação! 🙏`);

        const fullMessage = lines.join('\n');

        // ── Copia a lista para a área de transferência ──
        navigator.clipboard.writeText(fullMessage).then(() => {
            console.log('Pedido copiado para a área de transferência!');
        }).catch(() => {
            // Fallback caso o navegador bloqueie a clipboard
            console.warn('Não foi possível copiar automaticamente.');
        });

        // ── Abre o WhatsApp com a mensagem pronta ──
        // Carrega o número do .env (variável de ambiente)
        const phone = import.meta.env.VITE_WHATSAPP_NUMBER || '558792536500';
        const encoded = encodeURIComponent(fullMessage);
        window.open(`https://wa.me/${phone}?text=${encoded}`, '_blank');
    });

    // ---- FUNÇÕES AUXILIARES DO CARRINHO ----

    // Lê o carrinho do localStorage
    function getCart() {
        return JSON.parse(localStorage.getItem('cyenny_cart') || '[]');
    }

    // Salva o carrinho no localStorage
    function saveCart(cart) {
        localStorage.setItem('cyenny_cart', JSON.stringify(cart));
    }

    // Renderiza visualmente a lista de itens do carrinho
    function renderCart() {
        const cart = getCart();
        cartItemsContainer.innerHTML = '';

        // Se o carrinho está vazio
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<div class="empty-cart-message">Seu carrinho está vazio.</div>';
            cartTotalEl.textContent = 'R$ 0,00';
            checkoutBtn.disabled = true;
            cartBadge.textContent = '0';
            return;
        }

        let total = 0;

        cart.forEach((item, index) => {
            const subtotal = item.price * item.quantity;
            total += subtotal;

            const itemDiv = document.createElement('div');
            itemDiv.className = 'cart-item';
            
            const infoDiv = document.createElement('div');
            infoDiv.className = 'cart-item-info';
            const namePara = document.createElement('p');
            namePara.className = 'cart-item-name';
            namePara.textContent = item.name;
            const sizePara = document.createElement('p');
            sizePara.className = 'cart-item-size';
            sizePara.textContent = `Tamanho: ${item.size || '-'}`;
            infoDiv.appendChild(namePara);
            infoDiv.appendChild(sizePara);
            
            const controlsDiv = document.createElement('div');
            controlsDiv.className = 'cart-item-controls';
            const minusBtn = document.createElement('button');
            minusBtn.className = 'qty-btn minus';
            minusBtn.dataset.index = index;
            minusBtn.textContent = '−';
            const qtySpan = document.createElement('span');
            qtySpan.className = 'cart-item-qty';
            qtySpan.textContent = item.quantity;
            const plusBtn = document.createElement('button');
            plusBtn.className = 'qty-btn plus';
            plusBtn.dataset.index = index;
            plusBtn.textContent = '+';
            controlsDiv.appendChild(minusBtn);
            controlsDiv.appendChild(qtySpan);
            controlsDiv.appendChild(plusBtn);
            
            const priceDiv = document.createElement('div');
            priceDiv.className = 'cart-item-price';
            priceDiv.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
            
            const removeBtn = document.createElement('button');
            removeBtn.className = 'remove-item';
            removeBtn.dataset.index = index;
            removeBtn.textContent = '✕';
            
            itemDiv.appendChild(infoDiv);
            itemDiv.appendChild(controlsDiv);
            itemDiv.appendChild(priceDiv);
            itemDiv.appendChild(removeBtn);
            cartItemsContainer.appendChild(itemDiv);
        });

        cartTotalEl.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
        checkoutBtn.disabled = false;

        // Atualiza o badge no header com total de itens
        cartBadge.textContent = cart.reduce((sum, i) => sum + i.quantity, 0);

        // Conecta os botões de +, - e remover
        cartItemsContainer.querySelectorAll('.qty-btn.minus').forEach(btn => {
            btn.addEventListener('click', () => {
                const i = parseInt(btn.dataset.index);
                const cart = getCart();
                if (cart[i].quantity > 1) {
                    cart[i].quantity--;
                } else {
                    cart.splice(i, 1); // Remove se chegar a 0
                }
                saveCart(cart);
                renderCart();
            });
        });

        cartItemsContainer.querySelectorAll('.qty-btn.plus').forEach(btn => {
            btn.addEventListener('click', () => {
                const i = parseInt(btn.dataset.index);
                const cart = getCart();
                cart[i].quantity++;
                saveCart(cart);
                renderCart();
            });
        });

        cartItemsContainer.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', () => {
                const i = parseInt(btn.dataset.index);
                const cart = getCart();
                cart.splice(i, 1); // Remove o item do array
                saveCart(cart);
                renderCart();
            });
        });
    }

    // ADICIONAR AO CARRINHO (chamada pelo modal de produto)
    // Salva esta função globalmente para ser acessada por openModal()
    window.addToCart = function (product, selectedSize) {
        const cart = getCart();

        // Verifica se o mesmo produto + tamanho já existe no carrinho
        const existing = cart.find(item => item.id === product.id && item.size === selectedSize);
        if (existing) {
            existing.quantity++;  // Se sim, incrementa quantidade
        } else {
            // Se não, adiciona novo item
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                size: selectedSize,
                quantity: 1
            });
        }

        saveCart(cart);

        // Atualiza o badge no header
        cartBadge.textContent = cart.reduce((sum, i) => sum + i.quantity, 0);

        // Feedback visual: mostra confirmação rápida
        showCartFeedback();
    };

    // Pequena animação no badge quando item é adicionado
    function showCartFeedback() {
        cartBadge.classList.add('pulse');
        setTimeout(() => cartBadge.classList.remove('pulse'), 600);
    }

    // Atualiza o badge ao carregar a página (caso tenha itens salvos)
    const cart = getCart();
    cartBadge.textContent = cart.reduce((sum, i) => sum + i.quantity, 0);
}

// ============================================================
// MODAL DE PRODUTO (abre ao clicar em qualquer produto)
// ============================================================
let currentModalProduct = null; // Guarda o produto aberto no modal
let selectedSize = null;        // Guarda o tamanho selecionado

function openModal(product) {
    currentModalProduct = product;
    selectedSize = null;

    const modal = document.getElementById('product-modal');
    const img = document.getElementById('modal-img');
    const title = document.getElementById('modal-title');
    const price = document.getElementById('modal-price');
    const description = document.getElementById('modal-description');
    const material = document.getElementById('modal-material');
    const extra = document.getElementById('modal-extra');
    const sizesContainer = document.getElementById('modal-sizes');

    // Preenche os dados do produto no modal
    img.src = product.image;
    title.textContent = product.name;
    price.textContent = `R$ ${product.price.toFixed(2).replace('.', ',')}`;
    description.textContent = product.description || "Descrição em breve.";
    material.textContent = product.material || "Algodão Premium";
    extra.textContent = product.extra || "Produto exclusivo Cyenny Boutique.";

    // Renderiza os botões de tamanho de forma segura
    sizesContainer.innerHTML = '';
    product.sizes.forEach(size => {
        const span = document.createElement('span');
        span.className = 'size-tag';
        span.textContent = size;

        // Ao clicar em um tamanho, marca ele como selecionado
        span.addEventListener('click', () => {
            sizesContainer.querySelectorAll('.size-tag').forEach(s => s.classList.remove('active'));
            span.classList.add('active');
            selectedSize = size;
        });

        sizesContainer.appendChild(span);
    });

    // Configura o botão "ADICIONAR AO CARRINHO"
    const addBtn = document.getElementById('add-to-cart-btn');
    if (addBtn) {
        // Remove listener antigo clonando o botão
        const newBtn = addBtn.cloneNode(true);
        addBtn.parentNode.replaceChild(newBtn, addBtn);

        newBtn.addEventListener('click', () => {
            if (!selectedSize) {
                alert('Por favor, selecione um tamanho!');
                return;
            }
            window.addToCart(product, selectedSize);
            closeModal();
        });
    }

    // Abre o modal com animação
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Fecha o modal de produto
function closeModal() {
    const modal = document.getElementById('product-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// ============================================================
// ZOOM NA IMAGEM DO MODAL (efeito lupa)
// ============================================================
function initZoom() {
    const modalImage = document.querySelector('.modal-image');
    const img = document.getElementById('modal-img');

    if (modalImage && img) {
        // Quando o mouse se move sobre a imagem, muda o ponto de origem do zoom
        modalImage.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = modalImage.getBoundingClientRect();
            const x = ((e.clientX - left) / width) * 100;
            const y = ((e.clientY - top) / height) * 100;
            img.style.transformOrigin = `${x}% ${y}%`;
        });

        // Quando o mouse sai, volta o zoom ao centro
        modalImage.addEventListener('mouseleave', () => {
            img.style.transformOrigin = 'center center';
        });
    }
}
