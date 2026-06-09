const STORES = [
  {
    id: "centro",
    name: "Sucursal Centro",
    zone: "Centro",
    address: "Av. Reforma 123, Col. Centro, CDMX, C.P. 06000",
    schedule: "Lun - Vie: 9:00 - 20:00 · Sáb - Dom: 10:00 - 18:00",
    phone: "+52 55 1234 5678"
  },
  {
    id: "polanco",
    name: "Sucursal Polanco",
    zone: "Polanco",
    address: "Av. Presidente Masaryk 456, Polanco, CDMX, C.P. 11560",
    schedule: "Lun - Vie: 10:00 - 21:00 · Sáb - Dom: 11:00 - 19:00",
    phone: "+52 55 2345 6789"
  },
  {
    id: "santafe",
    name: "Sucursal Santa Fe",
    zone: "Santa Fe",
    address: "Centro Comercial Santa Fe, Av. Vasco de Quiroga 3800, CDMX, C.P. 05109",
    schedule: "Lun - Dom: 11:00 - 21:00",
    phone: "+52 55 3456 7890"
  }
];

const DEFAULT_PRODUCTS = [
  {
    id: "1",
    name: "Classic White Sneakers",
    brand: "UrbanStep",
    price: 1599,
    category: "Sneakers",
    rating: 4.8,
    stock: 12,
    sizes: [24, 25, 26, 27, 28],
    colors: ["Blanco", "Negro", "Azul"],
    description: "Sneakers blancos minimalistas, cómodos y fáciles de combinar.",
    imageUrl: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "2",
    name: "Leather Combat Boots",
    brand: "RockStyle",
    price: 2299,
    category: "Botas",
    rating: 4.6,
    stock: 8,
    sizes: [25, 26, 27, 28, 29],
    colors: ["Café", "Negro"],
    description: "Botas negras de estilo urbano con suela resistente.",
    imageUrl: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "3",
    name: "Pro Running Shoes",
    brand: "SpeedMax",
    price: 1899,
    category: "Deportivos",
    rating: 4.9,
    stock: 15,
    sizes: [24, 25, 26, 27, 28, 29],
    colors: ["Rojo", "Negro", "Gris"],
    description: "Calzado deportivo ligero para entrenamiento y carrera.",
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "4",
    name: "Elegant High Heels",
    brand: "GlamourFeet",
    price: 1499,
    category: "Tacones",
    rating: 4.7,
    stock: 10,
    sizes: [23, 24, 25, 26],
    colors: ["Negro", "Beige", "Rojo"],
    description: "Tacones elegantes para eventos, oficina o salidas especiales.",
    imageUrl: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "5",
    name: "Casual Leather Loafers",
    brand: "ComfortWalk",
    price: 1699,
    category: "Casuales",
    rating: 4.5,
    stock: 9,
    sizes: [25, 26, 27, 28],
    colors: ["Café", "Negro", "Miel"],
    description: "Zapato casual de piel sintética con acabado clásico.",
    imageUrl: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "6",
    name: "Retro Street Sneakers",
    brand: "UrbanStep",
    price: 1399,
    category: "Sneakers",
    rating: 4.4,
    stock: 18,
    sizes: [23, 24, 25, 26, 27],
    colors: ["Morado", "Blanco", "Negro"],
    description: "Diseño retro con colores llamativos para uso diario.",
    imageUrl: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "7",
    name: "Trail Outdoor Boots",
    brand: "MountainPro",
    price: 2499,
    category: "Botas",
    rating: 4.8,
    stock: 7,
    sizes: [26, 27, 28, 29, 30],
    colors: ["Café", "Olivo", "Negro"],
    description: "Botas resistentes para caminata, lluvia y terreno irregular.",
    imageUrl: "https://images.unsplash.com/photo-1621996659490-3275b4d0d951?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "8",
    name: "Daily Flex Trainers",
    brand: "SpeedMax",
    price: 1299,
    category: "Deportivos",
    rating: 4.3,
    stock: 20,
    sizes: [24, 25, 26, 27, 28],
    colors: ["Azul", "Negro", "Blanco"],
    description: "Tenis flexibles para gimnasio, caminata y actividades diarias.",
    imageUrl: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=900&q=80"
  }
];


function makeUid() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function parseJSONStorage(key, fallback) {
  try {
    const parsed = JSON.parse(localStorage.getItem(key));
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function normalizeProduct(rawProduct) {
  return {
    id: String(rawProduct.id ?? makeUid()),
    name: String(rawProduct.name ?? "").trim(),
    brand: String(rawProduct.brand ?? "").trim(),
    price: Number(rawProduct.price ?? 0),
    category: String(rawProduct.category ?? "Sneakers"),
    rating: Number(rawProduct.rating ?? 4.5),
    stock: Number(rawProduct.stock ?? 0),
    sizes: Array.isArray(rawProduct.sizes) ? rawProduct.sizes.map(Number).filter((v) => !Number.isNaN(v)) : [],
    colors: Array.isArray(rawProduct.colors) ? rawProduct.colors.map((color) => String(color).trim()).filter(Boolean) : [],
    description: String(rawProduct.description ?? "").trim(),
    imageUrl: String(rawProduct.imageUrl ?? "").trim()
  };
}

function loadProducts() {
  const savedProducts = parseJSONStorage("zapashop_products", null);
  const legacyStockMap = parseJSONStorage("zapashop_stock_map", {});

  if (Array.isArray(savedProducts) && savedProducts.length > 0) {
    return savedProducts.map(normalizeProduct);
  }

  return DEFAULT_PRODUCTS.map((product) =>
    normalizeProduct({
      ...product,
      stock: typeof legacyStockMap[product.id] === "number" ? legacyStockMap[product.id] : product.stock
    })
  );
}

function saveProducts() {
  localStorage.setItem("zapashop_products", JSON.stringify(products));
  const stockMap = {};
  for (const product of products) {
    stockMap[product.id] = product.stock;
  }
  localStorage.setItem("zapashop_stock_map", JSON.stringify(stockMap));
}

function loadCart() {
  const raw = parseJSONStorage("zapashop_cart", []);
  return Array.isArray(raw)
    ? raw.map((item) => ({
        uid: item.uid || makeUid(),
        customer: item.customer || null,
        pickupStore: item.pickupStore || null,
        ...item
      }))
    : [];
}

function saveCart() {
  localStorage.setItem("zapashop_cart", JSON.stringify(state.cart));
}

function loadSalesHistory() {
  const history = parseJSONStorage("zapashop_sales_history", []);
  return Array.isArray(history) ? history : [];
}

function saveSalesHistory() {
  localStorage.setItem("zapashop_sales_history", JSON.stringify(state.salesHistory));
}

let products = loadProducts();

const state = {
  cart: loadCart(),
  salesHistory: loadSalesHistory(),
  currentUser: null,
  search: "",
  category: "Todos",
  sort: "featured",
  selectedProduct: null,
  isAdmin: false,
  adminView: "dashboard"
};

const elements = {
  productsGrid: document.getElementById("productsGrid"),
  resultCount: document.getElementById("resultCount"),
  emptyState: document.getElementById("emptyState"),
  searchInput: document.getElementById("searchInput"),
  categoryFilter: document.getElementById("categoryFilter"),
  sortFilter: document.getElementById("sortFilter"),
  clearFiltersBtn: document.getElementById("clearFiltersBtn"),
  categoryCards: document.querySelectorAll(".category-card"),
  cartCount: document.getElementById("cartCount"),
  openCartBtn: document.getElementById("openCartBtn"),
  closeCartBtn: document.getElementById("closeCartBtn"),
  cartDrawer: document.getElementById("cartDrawer"),
  overlay: document.getElementById("overlay"),
  cartItems: document.getElementById("cartItems"),
  cartEmpty: document.getElementById("cartEmpty"),
  cartSubtotal: document.getElementById("cartSubtotal"),
  cartTotal: document.getElementById("cartTotal"),
  checkoutBtn: document.getElementById("checkoutBtn"),
  clearCartBtn: document.getElementById("clearCartBtn"),
  loginModal: document.getElementById("loginModal"),
  openLoginBtn: document.getElementById("openLoginBtn"),
  openLoginBtnMobile: document.getElementById("openLoginBtnMobile"),
  openRegisterBtn: document.getElementById("openRegisterBtn"),
  openRegisterBtnMobile: document.getElementById("openRegisterBtnMobile"),
  closeLoginBtn: document.getElementById("closeLoginBtn"),
  loginForm: document.getElementById("loginForm"),
  registerModal: document.getElementById("registerModal"),
  closeRegisterBtn: document.getElementById("closeRegisterBtn"),
  registerForm: document.getElementById("registerForm"),
  userStatusLabel: document.getElementById("userStatusLabel"),
  productModal: document.getElementById("productModal"),
  closeProductBtn: document.getElementById("closeProductBtn"),
  productDetail: document.getElementById("productDetail"),
  checkoutModal: document.getElementById("checkoutModal"),
  closeCheckoutBtn: document.getElementById("closeCheckoutBtn"),
  finishCheckoutBtn: document.getElementById("finishCheckoutBtn"),
  checkoutMessage: document.getElementById("checkoutMessage"),
  toast: document.getElementById("toast"),
  mobileNav: document.getElementById("mobileNav"),
  openMenuBtn: document.getElementById("openMenuBtn"),
  openSearchBtn: document.getElementById("openSearchBtn"),
  adminModal: document.getElementById("adminModal"),
  closeAdminBtn: document.getElementById("closeAdminBtn"),
  adminLogoutBtn: document.getElementById("adminLogoutBtn"),
  adminTabDashboard: document.getElementById("adminTabDashboard"),
  adminTabCrud: document.getElementById("adminTabCrud"),
  adminDashboardView: document.getElementById("adminDashboardView"),
  adminCrudView: document.getElementById("adminCrudView"),
  adminTotalProducts: document.getElementById("adminTotalProducts"),
  adminTotalStock: document.getElementById("adminTotalStock"),
  adminOrdersCount: document.getElementById("adminOrdersCount"),
  adminUnitsSold: document.getElementById("adminUnitsSold"),
  adminRevenue: document.getElementById("adminRevenue"),
  adminDemandList: document.getElementById("adminDemandList"),
  adminProductsTableBody: document.getElementById("adminProductsTableBody"),
  adminProductForm: document.getElementById("adminProductForm"),
  adminFormTitle: document.getElementById("adminFormTitle"),
  adminEditingId: document.getElementById("adminEditingId"),
  adminName: document.getElementById("adminName"),
  adminBrand: document.getElementById("adminBrand"),
  adminCategory: document.getElementById("adminCategory"),
  adminPrice: document.getElementById("adminPrice"),
  adminRating: document.getElementById("adminRating"),
  adminStock: document.getElementById("adminStock"),
  adminImageUrl: document.getElementById("adminImageUrl"),
  adminSizes: document.getElementById("adminSizes"),
  adminColors: document.getElementById("adminColors"),
  adminDescription: document.getElementById("adminDescription"),
  adminCancelEditBtn: document.getElementById("adminCancelEditBtn")
};

function formatPrice(value) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN"
  }).format(Number(value) || 0);
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("show");
  clearTimeout(showToast.timeout);
  showToast.timeout = setTimeout(() => {
    elements.toast.classList.remove("show");
  }, 2400);
}


async function apiRequest(path, options = {}) {
  const response = await fetch(path, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  const contentType = response.headers.get('content-type') || '';
  const payload = contentType.includes('application/json') ? await response.json() : null;

  if (!response.ok) {
    const message = payload?.message || 'Ocurrió un error al conectar con el servidor.';
    throw new Error(Array.isArray(message) ? message.join(', ') : message);
  }

  return payload;
}

async function syncSessionFromServer() {
  try {
    const payload = await apiRequest('/api/auth/me', { method: 'GET' });
    state.currentUser = payload?.authenticated ? payload.user : null;
    state.isAdmin = Boolean(payload?.user?.role === 'admin');
  } catch {
    state.currentUser = null;
    state.isAdmin = false;
  }

  updateAdminUI();
}

async function loginViaServer(email, password) {
  const payload = await apiRequest('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  state.currentUser = payload.user;
  state.isAdmin = payload.user?.role === 'admin';
  updateAdminUI();
  return payload.user;
}

async function registerViaServer({ name, email, phone, password }) {
  const payload = await apiRequest('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, phone, password }),
  });

  state.currentUser = payload.user;
  state.isAdmin = payload.user?.role === 'admin';
  updateAdminUI();
  return payload.user;
}

async function logoutSession() {
  try {
    await apiRequest('/api/auth/logout', { method: 'POST' });
  } catch (error) {
    console.error(error);
  }

  state.currentUser = null;
  state.isAdmin = false;
  updateAdminUI();
}

function getProductById(productId) {
  return products.find((product) => product.id === String(productId));
}

function getStoreById(storeId) {
  return STORES.find((store) => store.id === storeId) || null;
}

function getCartQuantityByProduct(productId) {
  return state.cart
    .filter((item) => item.id === String(productId))
    .reduce((sum, item) => sum + item.quantity, 0);
}

function getAvailableStock(productId) {
  const product = getProductById(productId);
  if (!product) return 0;
  return Math.max(product.stock - getCartQuantityByProduct(productId), 0);
}

function getFilteredProducts() {
  const term = state.search.trim().toLowerCase();
  const sorters = {
    "price-low": (a, b) => a.price - b.price,
    "price-high": (a, b) => b.price - a.price,
    rating: (a, b) => b.rating - a.rating,
    name: (a, b) => a.name.localeCompare(b.name),
    featured: (a, b) => products.indexOf(a) - products.indexOf(b)
  };

  return products
    .filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(term) ||
        product.brand.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term);
      const matchesCategory =
        state.category === "Todos" || product.category === state.category;
      return matchesSearch && matchesCategory;
    })
    .sort(sorters[state.sort]);
}

function renderProducts() {
  const filteredProducts = getFilteredProducts();
  elements.resultCount.textContent =
    filteredProducts.length === 1 ? "1 producto" : `${filteredProducts.length} productos`;

  elements.productsGrid.innerHTML = filteredProducts
    .map((product) => {
      const sizes = product.sizes.map((size) => `<span class="size-chip">${size}</span>`).join("");
      const availableStock = getAvailableStock(product.id);
      const soldOut = availableStock <= 0;

      return `
        <article class="product-card">
          <div class="product-image">
            <img src="${product.imageUrl}" alt="${product.name}" loading="lazy" />
            <span class="product-badge">${product.category}</span>
            <span class="stock-badge ${soldOut ? "catalog-stock-empty" : ""}">
              ${soldOut ? "Agotado" : `${availableStock} disponibles`}
            </span>
          </div>

          <div class="product-body">
            <div class="product-meta">
              <p class="product-brand">${product.brand}</p>
              <span class="rating">
                <i data-lucide="star"></i>
                ${product.rating.toFixed(1)}
              </span>
            </div>

            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="size-list" aria-label="Tallas disponibles">${sizes}</div>

            <div class="product-footer">
              <strong class="price">${formatPrice(product.price)}</strong>
              <div class="product-actions">
                <button class="small-button view-button" type="button" data-action="view" data-id="${product.id}">Ver</button>
                <button class="small-button" type="button" data-action="configure" data-id="${product.id}" ${soldOut ? "disabled" : ""}>
                  <i data-lucide="shopping-cart"></i>
                  ${soldOut ? "Agotado" : "Agregar"}
                </button>
              </div>
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  elements.emptyState.classList.toggle("hidden", filteredProducts.length > 0);
  elements.productsGrid.classList.toggle("hidden", filteredProducts.length === 0);
  lucide.createIcons();
}

function setCategory(category) {
  state.category = category;
  elements.categoryFilter.value = category;
  elements.categoryCards.forEach((card) => {
    card.classList.toggle("active", card.dataset.category === category);
  });
  renderProducts();
}

function clearFilters() {
  state.search = "";
  state.category = "Todos";
  state.sort = "featured";
  elements.searchInput.value = "";
  elements.categoryFilter.value = "Todos";
  elements.sortFilter.value = "featured";
  setCategory("Todos");
}

function addConfiguredToCart(payload) {
  const product = getProductById(payload.productId);
  if (!product) return;

  const availableStock = getAvailableStock(payload.productId);
  if (availableStock <= 0) {
    showToast("Este producto ya no tiene disponibilidad");
    renderProducts();
    return;
  }

  const existingItem = state.cart.find((item) => {
    if (
      item.id !== payload.productId ||
      item.size !== Number(payload.size) ||
      item.color !== payload.color ||
      item.delivery !== payload.delivery
    ) {
      return false;
    }

    if (payload.delivery === "Recoger en tienda") {
      return item.pickupStore?.id === payload.pickupStore?.id;
    }

    return (
      item.customer?.fullName === payload.customer?.fullName &&
      item.customer?.phone === payload.customer?.phone &&
      item.customer?.email === payload.customer?.email &&
      item.customer?.address === payload.customer?.address &&
      item.customer?.reference === payload.customer?.reference
    );
  });

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    state.cart.push({
      uid: makeUid(),
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      imageUrl: product.imageUrl,
      size: Number(payload.size),
      color: payload.color,
      delivery: payload.delivery,
      pickupStore: payload.pickupStore || null,
      customer: payload.customer || null,
      quantity: 1
    });
  }

  saveCart();
  renderCart();
  renderProducts();
  showToast(`${product.name} agregado al carrito`);
}

function removeFromCart(uid) {
  state.cart = state.cart.filter((item) => item.uid !== uid);
  saveCart();
  renderCart();
  renderProducts();
  showToast("Producto eliminado del carrito");
}

function updateQuantity(uid, change) {
  const item = state.cart.find((cartItem) => cartItem.uid === uid);
  if (!item) return;

  if (change > 0 && getAvailableStock(item.id) <= 0) {
    showToast("Ya no hay más piezas disponibles de este producto");
    return;
  }

  item.quantity += change;
  if (item.quantity <= 0) {
    removeFromCart(uid);
    return;
  }

  saveCart();
  renderCart();
  renderProducts();
}

function getCartTotals() {
  const subtotal = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return { subtotal, total: subtotal };
}

function renderCart() {
  const itemCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const totals = getCartTotals();

  elements.cartCount.textContent = itemCount;
  elements.cartSubtotal.textContent = formatPrice(totals.subtotal);
  elements.cartTotal.textContent = formatPrice(totals.total);
  elements.checkoutBtn.disabled = itemCount === 0;
  elements.clearCartBtn.disabled = itemCount === 0;
  elements.cartEmpty.classList.toggle("show", itemCount === 0);

  elements.cartItems.innerHTML = state.cart
    .map((item) => {
      const fulfillmentLine =
        item.delivery === "Recoger en tienda"
          ? `<span class="cart-item-meta-extra">Sucursal: ${item.pickupStore?.name || "Sin sucursal"}</span><span class="cart-item-meta-extra">Horario: ${item.pickupStore?.schedule || ""}</span>`
          : `<span class="cart-item-meta-extra">Cliente: ${item.customer?.fullName || ""}</span><span class="cart-item-meta-extra">Dirección: ${item.customer?.address || ""}</span>`;

      return `
        <article class="cart-item">
          <img src="${item.imageUrl}" alt="${item.name}" />
          <div class="cart-item-info">
            <h3>${item.name}</h3>
            <p>${item.brand} · Talla ${item.size}</p>
            <span class="cart-item-meta-extra">Color: ${item.color} · ${item.delivery}</span>
            ${fulfillmentLine}
            <strong>${formatPrice(item.price)}</strong>

            <div class="cart-item-actions">
              <div class="quantity-control" aria-label="Cantidad">
                <button type="button" data-action="minus" data-uid="${item.uid}">−</button>
                <span>${item.quantity}</span>
                <button type="button" data-action="plus" data-uid="${item.uid}">+</button>
              </div>

              <button class="remove-button" type="button" data-action="remove" data-uid="${item.uid}" aria-label="Eliminar producto">
                <i data-lucide="trash-2"></i>
              </button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  lucide.createIcons();
}

function openCart() {
  elements.cartDrawer.classList.add("open");
  elements.overlay.classList.add("open");
  elements.cartDrawer.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
}

function closeCart() {
  elements.cartDrawer.classList.remove("open");
  elements.overlay.classList.remove("open");
  elements.cartDrawer.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
}

function openLogin() {
  if (elements.loginModal) elements.loginModal.showModal();
}

function closeLogin() {
  if (elements.loginModal) elements.loginModal.close();
}

function openRegister() {
  if (elements.registerModal) elements.registerModal.showModal();
}

function closeRegister() {
  if (elements.registerModal) elements.registerModal.close();
}

function buildStoreOptions() {
  return STORES.map(
    (store) => `
    <label class="store-card-option">
      <input type="radio" name="pickupStore" value="${store.id}" hidden />
      <div class="store-card-option-top">
        <h4>${store.name}</h4>
        <span class="store-badge">${store.zone}</span>
      </div>
      <ul>
        <li>${store.address}</li>
        <li>${store.schedule}</li>
        <li>${store.phone}</li>
      </ul>
    </label>
  `
  ).join("");
}

function buildDeliveryForm() {
  return `
    <div class="address-form">
      <div class="address-form-grid">
        <label>
          Nombre completo *
          <input type="text" id="deliveryFullName" placeholder="Ej. Miguel Hernández" />
        </label>
        <label>
          Teléfono *
          <input type="tel" id="deliveryPhone" placeholder="55 1234 5678" />
        </label>
      </div>

      <div class="address-form-grid">
        <label>
          Correo electrónico *
          <input type="email" id="deliveryEmail" placeholder="correo@ejemplo.com" />
        </label>
        <label>
          Código postal *
          <input type="text" id="deliveryZip" placeholder="06000" />
        </label>
      </div>

      <label>
        Dirección completa *
        <textarea id="deliveryAddress" placeholder="Calle, número exterior/interior, colonia, alcaldía o municipio"></textarea>
      </label>

      <label>
        Referencias
        <textarea id="deliveryReference" placeholder="Ej. Casa azul, portón negro, entre calles..."></textarea>
      </label>
    </div>
  `;
}

function toggleFulfillmentPanels() {
  const selectedDelivery = document.querySelector("input[name='detailDelivery']:checked")?.value;
  const pickupPanel = document.getElementById("pickupPanel");
  const shippingPanel = document.getElementById("shippingPanel");
  if (!pickupPanel || !shippingPanel) return;

  pickupPanel.classList.toggle("active", selectedDelivery === "Recoger en tienda");
  shippingPanel.classList.toggle("active", selectedDelivery === "Envío a domicilio");
}

function getDeliveryPayload() {
  return {
    fullName: document.getElementById("deliveryFullName")?.value.trim() || "",
    phone: document.getElementById("deliveryPhone")?.value.trim() || "",
    email: document.getElementById("deliveryEmail")?.value.trim() || "",
    zip: document.getElementById("deliveryZip")?.value.trim() || "",
    address: document.getElementById("deliveryAddress")?.value.trim() || "",
    reference: document.getElementById("deliveryReference")?.value.trim() || ""
  };
}

function openProductDetail(productId) {
  const product = getProductById(productId);
  if (!product) return;

  state.selectedProduct = product.id;
  const availableStock = getAvailableStock(product.id);

  const sizes = product.sizes
    .map(
      (size) => `
    <label class="size-chip">
      <input type="radio" name="detailSize" value="${size}" hidden />
      ${size}
    </label>
  `
    )
    .join("");

  const colors = product.colors
    .map(
      (color) => `
    <label>
      <input type="radio" name="detailColor" value="${color}" hidden />
      ${color}
    </label>
  `
    )
    .join("");

  elements.productDetail.innerHTML = `
    <div class="product-detail">
      <img src="${product.imageUrl}" alt="${product.name}" />
      <div class="product-detail-content">
        <p class="eyebrow">${product.category}</p>
        <h2>${product.name}</h2>
        <p>${product.brand}</p>
        <strong class="price">${formatPrice(product.price)}</strong>
        <p>${product.description}</p>

        <div class="stock-inline">
          <i data-lucide="package-check"></i>
          <span>${availableStock > 0 ? `${availableStock} disponibles` : "Producto agotado"}</span>
        </div>

        <div class="option-block detail-sizes">
          <p>Selecciona tu talla *</p>
          <div class="size-list selectable-sizes">${sizes}</div>
        </div>

        <div class="option-block">
          <p>Selecciona el color *</p>
          <div class="option-chip-group">${colors}</div>
        </div>

        <div class="option-block">
          <p>Entrega *</p>
          <div class="delivery-options">
            <label class="delivery-option">
              <input type="radio" name="detailDelivery" value="Recoger en tienda" hidden />
              <i data-lucide="store"></i>
              <div class="delivery-option-content">
                <strong>Recoger en tienda</strong>
                <span>Elige una sucursal y consulta su horario</span>
              </div>
            </label>

            <label class="delivery-option">
              <input type="radio" name="detailDelivery" value="Envío a domicilio" hidden />
              <i data-lucide="truck"></i>
              <div class="delivery-option-content">
                <strong>Envío a domicilio</strong>
                <span>Captura tus datos para la entrega</span>
              </div>
            </label>
          </div>

          <div class="fulfillment-panel" id="pickupPanel">
            <div class="option-block">
              <p>Selecciona sucursal *</p>
              <div class="store-options">${buildStoreOptions()}</div>
              <p class="fulfillment-help">Consulta dirección, teléfono y horario antes de confirmar.</p>
            </div>
          </div>

          <div class="fulfillment-panel" id="shippingPanel">
            <div class="option-block">
              <p>Datos de envío *</p>
              ${buildDeliveryForm()}
            </div>
          </div>
        </div>

        <div class="validation-message" id="productValidationMessage"></div>

        <div class="detail-actions">
          <button class="primary-button" id="addDetailToCartBtn" type="button" ${availableStock <= 0 ? "disabled" : ""}>
            ${availableStock <= 0 ? "Sin disponibilidad" : "Agregar al carrito"}
          </button>
          <button class="ghost-button" id="closeDetailFromInsideBtn" type="button">Cerrar</button>
        </div>
      </div>
    </div>
  `;

  elements.productModal.showModal();
  lucide.createIcons();

  document.querySelectorAll("input[name='detailDelivery']").forEach((radio) => {
    radio.addEventListener("change", toggleFulfillmentPanels);
  });

  document.getElementById("addDetailToCartBtn").addEventListener("click", () => {
    const selectedSize = document.querySelector("input[name='detailSize']:checked");
    const selectedColor = document.querySelector("input[name='detailColor']:checked");
    const selectedDelivery = document.querySelector("input[name='detailDelivery']:checked");
    const validationMessage = document.getElementById("productValidationMessage");

    if (!selectedSize || !selectedColor || !selectedDelivery) {
      validationMessage.textContent = "Debes seleccionar talla, color y tipo de entrega antes de agregar al carrito.";
      return;
    }

    const payload = {
      productId: product.id,
      size: selectedSize.value,
      color: selectedColor.value,
      delivery: selectedDelivery.value
    };

    if (selectedDelivery.value === "Recoger en tienda") {
      const selectedStore = document.querySelector("input[name='pickupStore']:checked");
      if (!selectedStore) {
        validationMessage.textContent = "Debes elegir una sucursal para recoger en tienda.";
        return;
      }
      payload.pickupStore = getStoreById(selectedStore.value);
    }

    if (selectedDelivery.value === "Envío a domicilio") {
      const customer = getDeliveryPayload();
      if (!customer.fullName || !customer.phone || !customer.email || !customer.zip || !customer.address) {
        validationMessage.textContent = "Completa nombre, teléfono, correo, código postal y dirección para el envío a domicilio.";
        return;
      }
      payload.customer = customer;
    }

    validationMessage.textContent = "";
    addConfiguredToCart(payload);
    elements.productModal.close();
    openCart();
  });

  document.getElementById("closeDetailFromInsideBtn").addEventListener("click", () => {
    elements.productModal.close();
  });
}

function aggregateCartByProduct() {
  const totals = {};
  for (const item of state.cart) {
    totals[item.id] = (totals[item.id] || 0) + item.quantity;
  }
  return totals;
}

function recordSale(totalAmount) {
  state.salesHistory.push({
    id: makeUid(),
    createdAt: new Date().toISOString(),
    total: totalAmount,
    items: state.cart.map((item) => ({
      productId: item.id,
      name: item.name,
      quantity: item.quantity,
      revenue: item.price * item.quantity
    }))
  });
  saveSalesHistory();
}

function checkout() {
  const itemCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const totals = getCartTotals();

  if (itemCount === 0) {
    showToast("Agrega productos antes de finalizar la compra");
    return;
  }

  const groupedCart = aggregateCartByProduct();

  for (const [productId, quantity] of Object.entries(groupedCart)) {
    const product = getProductById(productId);
    if (!product || product.stock < quantity) {
      showToast(`No hay stock suficiente para ${product?.name || "un producto del carrito"}`);
      return;
    }
  }

  for (const [productId, quantity] of Object.entries(groupedCart)) {
    const product = getProductById(productId);
    product.stock -= quantity;
  }

  recordSale(totals.total);
  saveProducts();

  closeCart();
  elements.checkoutMessage.textContent =
    `Tu pedido por ${formatPrice(totals.total)} fue registrado correctamente y el stock del catálogo ya fue actualizado.`;
  elements.checkoutModal.showModal();

  state.cart = [];
  saveCart();
  renderCart();
  renderProducts();
  renderAdminDashboard();
  renderAdminProductsTable();
}

function openAdminPanel() {
  if (!state.isAdmin) return;
  renderAdminDashboard();
  renderAdminProductsTable();
  updateAdminView();
  elements.adminModal.showModal();
  lucide.createIcons();
}

function closeAdminPanel() {
  elements.adminModal.close();
}

function updateHeaderSessionUI() {
  if (state.isAdmin) {
    elements.userStatusLabel.textContent = 'Administrador';
    if (elements.openRegisterBtn) elements.openRegisterBtn.style.display = 'none';
    if (elements.openRegisterBtnMobile) elements.openRegisterBtnMobile.style.display = 'none';
    return;
  }

  if (state.currentUser && state.currentUser.name) {
    const firstName = String(state.currentUser.name).trim().split(' ')[0];
    elements.userStatusLabel.textContent = firstName || 'Usuario';

    if (elements.openLoginBtn) elements.openLoginBtn.innerHTML = `<span>Mi sesión</span>`;
    if (elements.openLoginBtnMobile) elements.openLoginBtnMobile.textContent = 'Mi sesión';

    if (elements.openRegisterBtn) {
      elements.openRegisterBtn.style.display = 'inline-flex';
      elements.openRegisterBtn.textContent = 'Cerrar sesión';
    }
    if (elements.openRegisterBtnMobile) {
      elements.openRegisterBtnMobile.style.display = 'inline-flex';
      elements.openRegisterBtnMobile.textContent = 'Cerrar sesión';
    }
    return;
  }

  elements.userStatusLabel.textContent = 'Invitado';
  if (elements.openLoginBtn) elements.openLoginBtn.innerHTML = `<span>Iniciar Sesión</span>`;
  if (elements.openLoginBtnMobile) elements.openLoginBtnMobile.textContent = 'Iniciar Sesión';
  if (elements.openRegisterBtn) {
    elements.openRegisterBtn.style.display = 'inline-flex';
    elements.openRegisterBtn.textContent = 'Registrarse';
  }
  if (elements.openRegisterBtnMobile) {
    elements.openRegisterBtnMobile.style.display = 'inline-flex';
    elements.openRegisterBtnMobile.textContent = 'Registrarse';
  }
}

function updateAdminUI() {
  if (state.isAdmin) {
    elements.openLoginBtn.innerHTML = `<span>Panel admin</span>`;
    if (elements.openLoginBtnMobile) elements.openLoginBtnMobile.textContent = 'Panel admin';
    elements.openLoginBtn.classList.add('is-admin');
    if (elements.openLoginBtnMobile) elements.openLoginBtnMobile.classList.add('is-admin');
  } else {
    elements.openLoginBtn.classList.remove('is-admin');
    if (elements.openLoginBtnMobile) elements.openLoginBtnMobile.classList.remove('is-admin');
  }

  updateHeaderSessionUI();
  lucide.createIcons();
}

function setAdminView(view) {
  state.adminView = view;
  updateAdminView();
}

function updateAdminView() {
  const isDashboard = state.adminView === "dashboard";
  elements.adminDashboardView.classList.toggle("hidden", !isDashboard);
  elements.adminCrudView.classList.toggle("hidden", isDashboard);
  elements.adminTabDashboard.classList.toggle("active", isDashboard);
  elements.adminTabCrud.classList.toggle("active", !isDashboard);
}

function computeDemandStats() {
  const statsMap = new Map();

  for (const order of state.salesHistory) {
    for (const item of order.items) {
      const existing = statsMap.get(item.productId) || {
        productId: item.productId,
        name: item.name,
        quantity: 0,
        revenue: 0,
        orders: 0
      };

      existing.quantity += item.quantity;
      existing.revenue += item.revenue;
      existing.orders += 1;
      statsMap.set(item.productId, existing);
    }
  }

  return Array.from(statsMap.values()).sort((a, b) => b.quantity - a.quantity);
}


function renderAdminDashboard() {
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
  const ordersCount = state.salesHistory.length;
  const unitsSold = state.salesHistory.reduce(
    (sum, order) => sum + order.items.reduce((acc, item) => acc + item.quantity, 0),
    0
  );
  const revenue = state.salesHistory.reduce((sum, order) => sum + order.total, 0);

  elements.adminTotalProducts.textContent = totalProducts;
  elements.adminTotalStock.textContent = totalStock;
  elements.adminOrdersCount.textContent = ordersCount;
  elements.adminUnitsSold.textContent = unitsSold;
  elements.adminRevenue.textContent = formatPrice(revenue);

  const demandStats = computeDemandStats();
  const maxQuantity = demandStats[0]?.quantity || 1;

  const summary = demandStats.length
    ? `
      <div class="admin-demand-summary">
        <span class="admin-summary-chip">Top ${Math.min(demandStats.length, 5)} productos</span>
        <span class="admin-summary-chip">Máximo vendido: ${maxQuantity} unidades</span>
        <span class="admin-summary-chip">Total vendido: ${unitsSold} unidades</span>
      </div>
    `
    : "";

  elements.adminDemandList.innerHTML = demandStats.length
    ? summary +
      demandStats
        .slice(0, 5)
        .map((item, index) => {
          const product = getProductById(item.productId);
          const ratio = Math.max((item.quantity / maxQuantity) * 100, 6);
          const thumb = product?.imageUrl || "https://via.placeholder.com/56";
          return `
            <article class="admin-demand-item">
              <div class="admin-demand-row">
                <div class="admin-demand-product">
                  <span class="admin-rank">${index + 1}</span>
                  <img class="admin-demand-thumb" src="${thumb}" alt="${item.name}" />
                  <div class="admin-demand-meta">
                    <strong>${item.name}</strong>
                    <span>${item.quantity} piezas vendidas · ${item.orders} orden${item.orders === 1 ? "" : "es"}</span>
                  </div>
                </div>

                <div class="admin-demand-values">
                  <span class="admin-demand-badge">${ratio.toFixed(0)}% del líder</span>
                  <strong class="admin-demand-revenue">${formatPrice(item.revenue)}</strong>
                </div>
              </div>

              <div class="admin-bar-track">
                <div class="admin-bar-fill" style="width: ${ratio}%"></div>
              </div>

              <div class="admin-demand-axis">
                <span>0 unidades</span>
                <span>${maxQuantity} unidades</span>
              </div>

              <div class="admin-demand-stats">
                <span class="admin-stat-pill">Órdenes: ${item.orders}</span>
                <span class="admin-stat-pill">Unidades: ${item.quantity}</span>
                <span class="admin-stat-pill">Ingresos: ${formatPrice(item.revenue)}</span>
              </div>
            </article>
          `;
        })
        .join("")
    : '<div class="admin-empty">Aún no hay compras registradas para calcular estadísticas.</div>';
}


function resetAdminForm() {
  elements.adminProductForm.reset();
  elements.adminEditingId.value = "";
  elements.adminRating.value = "4.5";
  elements.adminFormTitle.textContent = "Nuevo producto";
}

function fillAdminForm(productId) {
  const product = getProductById(productId);
  if (!product) return;

  elements.adminEditingId.value = product.id;
  elements.adminName.value = product.name;
  elements.adminBrand.value = product.brand;
  elements.adminCategory.value = product.category;
  elements.adminPrice.value = product.price;
  elements.adminRating.value = product.rating;
  elements.adminStock.value = product.stock;
  elements.adminImageUrl.value = product.imageUrl;
  elements.adminSizes.value = product.sizes.join(",");
  elements.adminColors.value = product.colors.join(",");
  elements.adminDescription.value = product.description;
  elements.adminFormTitle.textContent = "Editar producto";
  setAdminView("products");
}

function renderAdminProductsTable() {
  elements.adminProductsTableBody.innerHTML = products.length
    ? products
        .map(
          (product) => `
            <tr>
              <td>
                <div class="admin-product-mini">
                  <img src="${product.imageUrl}" alt="${product.name}" />
                  <div class="admin-mini-meta">
                    <strong>${product.name}</strong>
                    <span>${product.brand}</span>
                  </div>
                </div>
              </td>
              <td>${product.category}</td>
              <td>${formatPrice(product.price)}</td>
              <td>${product.stock}</td>
              <td>${product.rating.toFixed(1)}</td>
              <td>
                <div class="admin-table-actions">
                  <button class="admin-table-btn admin-edit-btn" type="button" data-admin-action="edit" data-id="${product.id}">Editar</button>
                  <button class="admin-table-btn admin-delete-btn" type="button" data-admin-action="delete" data-id="${product.id}">Eliminar</button>
                </div>
              </td>
            </tr>
          `
        )
        .join("")
    : '<tr><td colspan="6"><div class="admin-empty">No hay productos cargados.</div></td></tr>';
}

function deleteProduct(productId) {
  const product = getProductById(productId);
  if (!product) return;

  products = products.filter((item) => item.id !== productId);
  state.cart = state.cart.filter((item) => item.id !== productId);
  saveProducts();
  saveCart();
  renderProducts();
  renderCart();
  renderAdminProductsTable();
  renderAdminDashboard();
  resetAdminForm();
  showToast(`Producto eliminado: ${product.name}`);
}

function handleAdminFormSubmit(event) {
  event.preventDefault();

  const sizes = elements.adminSizes.value
    .split(",")
    .map((value) => Number(value.trim()))
    .filter((value) => !Number.isNaN(value));

  const colors = elements.adminColors.value
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  if (!sizes.length || !colors.length) {
    showToast("Debes capturar al menos una talla y un color válidos.");
    return;
  }

  const productPayload = normalizeProduct({
    id: elements.adminEditingId.value || makeUid(),
    name: elements.adminName.value,
    brand: elements.adminBrand.value,
    category: elements.adminCategory.value,
    price: Number(elements.adminPrice.value),
    rating: Number(elements.adminRating.value),
    stock: Number(elements.adminStock.value),
    imageUrl: elements.adminImageUrl.value,
    sizes,
    colors,
    description: elements.adminDescription.value
  });

  const editing = Boolean(elements.adminEditingId.value);
  if (editing) {
    products = products.map((product) => (product.id === productPayload.id ? productPayload : product));
  } else {
    products.unshift(productPayload);
  }

  saveProducts();
  renderProducts();
  renderAdminProductsTable();
  renderAdminDashboard();
  resetAdminForm();
  showToast(editing ? "Producto actualizado correctamente." : "Producto agregado correctamente.");
}

async function logoutAdmin() {
  await logoutSession();
  closeAdminPanel();
  showToast('Sesión de administrador cerrada.');
}

function bindEvents() {
  elements.searchInput.addEventListener("input", (event) => {
    state.search = event.target.value;
    renderProducts();
  });

  elements.categoryFilter.addEventListener("change", (event) => {
    setCategory(event.target.value);
  });

  elements.sortFilter.addEventListener("change", (event) => {
    state.sort = event.target.value;
    renderProducts();
  });

  elements.clearFiltersBtn.addEventListener("click", clearFilters);

  elements.categoryCards.forEach((card) => {
    card.addEventListener("click", () => {
      setCategory(card.dataset.category);
      document.getElementById("catalogo").scrollIntoView({ behavior: "smooth" });
    });
  });

  elements.productsGrid.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;

    const { action, id } = button.dataset;
    if (action === "view" || action === "configure") {
      openProductDetail(id);
    }
  });

  elements.cartItems.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;

    const { action, uid } = button.dataset;
    if (action === "plus") updateQuantity(uid, 1);
    if (action === "minus") updateQuantity(uid, -1);
    if (action === "remove") removeFromCart(uid);
  });

  elements.openCartBtn.addEventListener("click", openCart);
  elements.closeCartBtn.addEventListener("click", closeCart);
  elements.overlay.addEventListener("click", closeCart);

  const handleLoginOpen = () => {
    if (state.isAdmin) {
      openAdminPanel();
      return;
    }

    if (state.currentUser) {
      showToast(`Sesión activa como ${state.currentUser.email}`);
      return;
    }

    openLogin();
  };

  const handleRegisterOpen = async () => {
    if (state.currentUser && !state.isAdmin) {
      await logoutSession();
      showToast('Sesión cerrada correctamente.');
      return;
    }
    openRegister();
  };

  elements.openLoginBtn.addEventListener("click", handleLoginOpen);
  if (elements.openLoginBtnMobile) elements.openLoginBtnMobile.addEventListener("click", handleLoginOpen);
  if (elements.openRegisterBtn) elements.openRegisterBtn.addEventListener("click", handleRegisterOpen);
  if (elements.openRegisterBtnMobile) elements.openRegisterBtnMobile.addEventListener("click", handleRegisterOpen);

  elements.closeLoginBtn.addEventListener("click", closeLogin);
  if (elements.closeRegisterBtn) elements.closeRegisterBtn.addEventListener("click", closeRegister);

  elements.loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    try {
      const user = await loginViaServer(email, password);
      closeLogin();
      elements.loginForm.reset();

      if (user.role === 'admin') {
        openAdminPanel();
        showToast('Acceso de administrador concedido.');
      } else {
        showToast(`Sesión iniciada como ${user.email}`);
      }
    } catch (error) {
      showToast(error.message || 'No fue posible iniciar sesión.');
    }
  });

  if (elements.registerForm) elements.registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = document.getElementById("registerName").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const phone = document.getElementById("registerPhone").value.trim();
    const password = document.getElementById("registerPassword").value;
    const confirm = document.getElementById("registerPasswordConfirm").value;

    if (password !== confirm) {
      showToast("Las contraseñas no coinciden.");
      return;
    }

    try {
      const user = await registerViaServer({ name, email, phone, password });
      closeRegister();
      elements.registerForm.reset();
      showToast(`Cuenta registrada correctamente para ${user.name}.`);
    } catch (error) {
      showToast(error.message || 'No fue posible registrar la cuenta.');
    }
  });

  elements.closeProductBtn.addEventListener("click", () => {
    elements.productModal.close();
  });

  elements.checkoutBtn.addEventListener("click", checkout);

  elements.clearCartBtn.addEventListener("click", () => {
    if (!state.cart.length) return;
    state.cart = [];
    saveCart();
    renderCart();
    renderProducts();
    showToast("Carrito vaciado");
  });

  elements.closeCheckoutBtn.addEventListener("click", () => {
    elements.checkoutModal.close();
  });

  elements.finishCheckoutBtn.addEventListener("click", () => {
    elements.checkoutModal.close();
  });

  elements.openMenuBtn.addEventListener("click", () => {
    elements.mobileNav.classList.toggle("open");
  });

  elements.mobileNav.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
      elements.mobileNav.classList.remove("open");
    }
  });

  elements.openSearchBtn.addEventListener("click", () => {
    document.getElementById("catalogo").scrollIntoView({ behavior: "smooth" });
    setTimeout(() => elements.searchInput.focus(), 500);
  });

  elements.closeAdminBtn.addEventListener("click", closeAdminPanel);
  elements.adminLogoutBtn.addEventListener("click", logoutAdmin);
  elements.adminTabDashboard.addEventListener("click", () => setAdminView("dashboard"));
  elements.adminTabCrud.addEventListener("click", () => setAdminView("products"));
  elements.adminProductForm.addEventListener("submit", handleAdminFormSubmit);
  elements.adminCancelEditBtn.addEventListener("click", resetAdminForm);

  elements.adminProductsTableBody.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-admin-action]");
    if (!button) return;

    const { adminAction, id } = button.dataset;
    if (adminAction === "edit") fillAdminForm(id);
    if (adminAction === "delete") deleteProduct(id);
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeCart();
    }
  });
}

async function init() {
  await syncSessionFromServer();
  resetAdminForm();
  renderProducts();
  renderCart();
  renderAdminDashboard();
  renderAdminProductsTable();
  bindEvents();
  lucide.createIcons();
}

document.addEventListener("DOMContentLoaded", () => {
  init().catch((error) => {
    console.error(error);
    showToast('No fue posible sincronizar la sesión con el servidor.');
  });
});
