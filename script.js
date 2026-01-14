const WHATSAPP_NUMBER = '5511999999999';

const products = [
  {
    id: 1,
    name: 'Cestinha Rústica',
    price: 35.0,
    category: 'Decoração',
    description: 'Cestinha Rústica Decorativa com Roupinhas em Tecido!',
    images: ['./img/Decorativo (1).png'],
    available: true,
    madeToOrder: false,
    variations: [],
  },
  {
    id: 2,
    name: 'Bonequinha de palha',
    price: 42.0,
    category: 'Presentes',
    description: 'Bonequinha de Palha para lembrancinhas!',
    images: ['./img/Decorativo (2).png'],
    available: true,
    madeToOrder: false,
    variations: ['Floral', 'Listrado', 'Vintage'],
  },
  {
    id: 3,
    name: 'Ratinho de pano',
    price: 55.0,
    category: 'Personalizados',
    description:
      'Ratinho de pano personalizado para presentes ou lembrancinhas!',
    images: ['./img/Decorativo (3).png'],
    available: true,
    madeToOrder: false,
    variations: ['Natural', 'Colorida', 'Estampada'],
  },
  {
    id: 4,
    name: 'Saquinho Aromatizante',
    price: 55.0,
    category: 'Decoração',
    description:
      'Saquinho Aromatizante para portas, pode colocar folhas naturais para cheiro!',
    images: ['./img/Decorativo (4).png'],
    available: true,
    madeToOrder: false,
    variations: [],
  },
  {
    id: 5,
    name: 'Lhamas Temáticas',
    price: 85.0,
    category: 'Personalizados',
    description:
      'Lhamas Temáticas para presentes e decorações de mesas e festas',
    images: ['./img/Lembrancinhas (1).png'],
    available: true,
    madeToOrder: true,
    variations: [],
  },
  {
    id: 6,
    name: 'Gatinho de Porta',
    price: 120.0,
    category: 'Decoração',
    description: 'Gatinho de peso para cantos de portas!',
    images: ['./img/Lembrancinhas (2).png'],
    available: true,
    madeToOrder: false,
    variations: ['Tons quentes', 'Tons frios', 'Multicolorido'],
  },
  {
    id: 7,
    name: 'Nuvem com carinhas',
    price: 35.0,
    category: 'Presente',
    description: 'Nuvem com carinha para lembrancinhas de festas!',
    images: ['./img/Lembrancinhas (3).png'],
    available: false,
    madeToOrder: true,
    variations: ['Natural', 'Branco', 'Colorido'],
  },
  {
    id: 8,
    name: 'Quadro de Lhamas',
    price: 780.0,
    category: 'Personalizados',
    description: 'Quadro de Lhamas feito com tecido!',
    images: ['./img/Decorativo (5).png'],
    available: true,
    madeToOrder: true,
    variations: [],
  },
  {
    id: 9,
    name: 'Porta Objetos',
    price: 45.0,
    category: 'Presentes',
    description: 'Porta Objetos para decoração de qualquer ambiente!',
    images: ['./img/Decorativo (6).png'],
    available: true,
    madeToOrder: false,
    variations: [],
  },
  {
    id: 10,
    name: 'Corações Decorativos',
    price: 40.0,
    category: 'Presentes',
    description: 'Corações decorativos com renda para portas!',
    images: ['./img/Decorativo (7).png'],
    available: true,
    madeToOrder: false,
    variations: [],
  },
];

let currentCategory = 'all';
let currentProduct = null;
let quantity = 1;
let cart = [];

function loadCart() {
  try {
    const savedCart = localStorage.getItem('mireyaCart');
    if (savedCart) {
      cart = JSON.parse(savedCart);
      updateCartBadge();
    }
  } catch (error) {
    console.error('Erro ao carregar carrinho:', error);
  }
}

function saveCart() {
  try {
    localStorage.setItem('mireyaCart', JSON.stringify(cart));
  } catch (error) {
    console.error('Erro ao salvar carrinho:', error);
  }
}

function showSuccessNotification() {
  const notification = document.createElement('div');
  notification.className = 'success-notification';
  notification.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
    </svg>
    <span>Produto adicionado ao carrinho!</span>
  `;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}

function renderProducts(productsToRender = products) {
  const grid = document.getElementById('productsGrid');
  grid.innerHTML = '';

  productsToRender.forEach((product, index) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.onclick = () => openModal(product);

    const badge = product.available
      ? product.madeToOrder
        ? '<div class="product-badge made-to-order">Sob encomenda</div>'
        : '<div class="product-badge">Disponível</div>'
      : '<div class="product-badge made-to-order">Indisponível</div>';

    card.innerHTML = `
      ${badge}
      <img src="${product.images[0]}" alt="${
      product.name
    }" class="product-image">
      <div class="product-info">
        <div class="product-category">${product.category}</div>
        <h3 class="product-name">${product.name}</h3>
        <div class="product-price">R$ ${product.price.toFixed(2)}</div>
        <button class="btn-view">Ver detalhes</button>
      </div>
    `;

    grid.appendChild(card);

    setTimeout(() => {
      card.classList.add('visible');
    }, index * 100);
  });
}

function filterProducts() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();

  let filtered = products;

  if (currentCategory !== 'all') {
    filtered = filtered.filter((p) => p.category === currentCategory);
  }

  if (searchTerm) {
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm),
    );
  }

  renderProducts(filtered);
}

document.querySelectorAll('.filter-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document
      .querySelectorAll('.filter-btn')
      .forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    currentCategory = btn.dataset.category;
    filterProducts();
  });
});

document
  .getElementById('searchInput')
  .addEventListener('input', filterProducts);

function openModal(product) {
  currentProduct = product;
  quantity = 1;

  const modal = document.getElementById('productModal');

  const imagesContainer = document.getElementById('modalImages');
  imagesContainer.innerHTML = product.images
    .map(
      (img) => `<img src="${img}" alt="${product.name}" class="modal-image">`,
    )
    .join('');

  document.getElementById('modalCategory').textContent = product.category;
  document.getElementById('modalTitle').textContent = product.name;
  document.getElementById(
    'modalPrice',
  ).textContent = `R$ ${product.price.toFixed(2)}`;
  document.getElementById('modalDescription').textContent = product.description;
  document.getElementById('quantityValue').textContent = quantity;

  const variationsGroup = document.getElementById('variationsGroup');
  const variationSelect = document.getElementById('variationSelect');

  if (product.variations && product.variations.length > 0) {
    variationsGroup.style.display = 'block';
    variationSelect.innerHTML = product.variations
      .map((v) => `<option value="${v}">${v}</option>`)
      .join('');
  } else {
    variationsGroup.style.display = 'none';
  }

  modal.classList.add('active');
}

document.getElementById('modalClose').addEventListener('click', () => {
  document.getElementById('productModal').classList.remove('active');
});

document.getElementById('productModal').addEventListener('click', (e) => {
  if (e.target.id === 'productModal') {
    document.getElementById('productModal').classList.remove('active');
  }
});

document.getElementById('increaseQty').addEventListener('click', () => {
  quantity++;
  document.getElementById('quantityValue').textContent = quantity;
});

document.getElementById('decreaseQty').addEventListener('click', () => {
  if (quantity > 1) {
    quantity--;
    document.getElementById('quantityValue').textContent = quantity;
  }
});

document.getElementById('addToCart').addEventListener('click', () => {
  if (!currentProduct) return;

  const variation = document.getElementById('variationSelect').value || null;

  const existingItem = cart.find(
    (item) =>
      item.product.id === currentProduct.id && item.variation === variation,
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      product: currentProduct,
      variation: variation,
      quantity: quantity,
    });
  }

  saveCart();
  updateCartBadge();
  document.getElementById('productModal').classList.remove('active');

  showSuccessNotification();

  const badge = document.getElementById('cartBadge');
  badge.classList.add('bounce');
  setTimeout(() => {
    badge.classList.remove('bounce');
  }, 500);
});

function updateCartBadge() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById('cartBadge').textContent = totalItems;
  document.getElementById('cartNavBadge').textContent = totalItems;
}

document.getElementById('cartFloat').addEventListener('click', () => {
  openCartModal();
});

document.getElementById('cartNavBtn').addEventListener('click', () => {
  openCartModal();
});

function openCartModal() {
  const modal = document.getElementById('cartModal');
  const cartBody = document.getElementById('cartBody');
  const cartFooter = document.getElementById('cartFooter');

  if (cart.length === 0) {
    cartBody.innerHTML = `
      <div class="cart-empty">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
        </svg>
        <p>Seu carrinho está vazio</p>
        <small>Adicione produtos para começar</small>
      </div>
    `;
    cartFooter.style.display = 'none';
  } else {
    cartBody.innerHTML = cart
      .map(
        (item, index) => `
      <div class="cart-item">
        <img src="${item.product.images[0]}" alt="${
          item.product.name
        }" class="cart-item-image">
        <div class="cart-item-info">
          <div class="cart-item-name">${item.product.name}</div>
          ${
            item.variation
              ? `<div class="cart-item-variation">${item.variation}</div>`
              : ''
          }
          <div class="cart-item-price">R$ ${(
            item.product.price * item.quantity
          ).toFixed(2)}</div>
        </div>
        <div class="cart-item-actions">
          <button class="cart-item-remove" onclick="removeFromCart(${index})">×</button>
          <div class="cart-item-qty">
            <button class="cart-qty-btn" onclick="updateCartQty(${index}, -1)">−</button>
            <span class="cart-qty-value">${item.quantity}</span>
            <button class="cart-qty-btn" onclick="updateCartQty(${index}, 1)">+</button>
          </div>
        </div>
      </div>
    `,
      )
      .join('');

    cartFooter.style.display = 'block';
    updateCartSummary();
  }

  modal.classList.add('active');
}

window.updateCartQty = function (index, delta) {
  cart[index].quantity += delta;
  if (cart[index].quantity < 1) {
    cart.splice(index, 1);
  }
  saveCart();
  updateCartBadge();
  openCartModal();
};

window.removeFromCart = function (index) {
  cart.splice(index, 1);
  saveCart();
  updateCartBadge();
  openCartModal();
};

function updateCartSummary() {
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const deliverySelect = document.getElementById('cartDeliverySelect');
  const deliveryText =
    deliverySelect.value === 'cidade' ? 'A consultar' : 'Grátis';

  document.getElementById('cartSubtotal').textContent = `R$ ${subtotal.toFixed(
    2,
  )}`;
  document.getElementById('cartDelivery').textContent = deliveryText;
  document.getElementById('cartTotal').textContent =
    deliverySelect.value === 'cidade'
      ? 'A consultar'
      : `R$ ${subtotal.toFixed(2)}`;
}

document
  .getElementById('cartDeliverySelect')
  .addEventListener('change', updateCartSummary);

document.getElementById('checkout').addEventListener('click', () => {
  if (cart.length === 0) return;

  const deliverySelect = document.getElementById('cartDeliverySelect');
  const deliveryText = deliverySelect.selectedOptions[0].text;
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const isDelivery = deliverySelect.value === 'cidade';

  let message = `Ola! Gostaria de fazer o seguinte pedido:\n\n`;

  cart.forEach((item, index) => {
    message += `*${index + 1}. ${item.product.name}*\n`;
    if (item.variation) message += `   Variacao: ${item.variation}\n`;
    message += `   Quantidade: ${item.quantity}\n`;
    message += `   Preco: R$ ${(item.product.price * item.quantity).toFixed(
      2,
    )}\n\n`;
  });

  message += `*Entrega:* ${deliveryText}\n`;
  message += `*Subtotal dos produtos:* R$ ${subtotal.toFixed(2)}\n`;
  if (isDelivery) {
    message += `*Valor total:* A consultar (incluindo entrega)`;
  } else {
    message += `*TOTAL:* R$ ${subtotal.toFixed(2)}`;
  }

  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

  window.open(whatsappURL, '_blank', 'noopener,noreferrer');
});

document.getElementById('cartClose').addEventListener('click', () => {
  document.getElementById('cartModal').classList.remove('active');
});

document.getElementById('cartModal').addEventListener('click', (e) => {
  if (e.target.id === 'cartModal') {
    document.getElementById('cartModal').classList.remove('active');
  }
});

document.getElementById('whatsappFloat').addEventListener('click', () => {
  const message = encodeURIComponent(
    'Ola! Gostaria de saber mais sobre os produtos artesanais!',
  );
  window.open(
    `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`,
    '_blank',
    'noopener,noreferrer',
  );
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.step').forEach((step) => {
  observer.observe(step);
});

// Header scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  const currentScroll = window.pageYOffset;

  if (currentScroll > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  lastScroll = currentScroll;
});

loadCart();
renderProducts();
// ==================== MENU MOBILE ====================
const btn = document.getElementById('menuBtn');
const nav = document.getElementById('navMenu');

function closeMenu() {
  if (!btn || !nav) return;
  nav.classList.remove('open');
  btn.setAttribute('aria-expanded', 'false');
}

if (btn && nav) {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const willOpen = !nav.classList.contains('open');
    nav.classList.toggle('open', willOpen);
    btn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
  });

  // ✅ Fecha ao clicar em qualquer item do menu (delegação)
  nav.addEventListener('click', (e) => {
    const clickedLink = e.target.closest('a');
    if (clickedLink && window.innerWidth <= 768) closeMenu();
  });

  // (opcional) Fecha clicando fora
  document.addEventListener('click', (e) => {
    if (!nav.classList.contains('open')) return;
    const inside = nav.contains(e.target) || btn.contains(e.target);
    if (!inside) closeMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) closeMenu();
  });
}
