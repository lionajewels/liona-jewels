let cart = JSON.parse(localStorage.getItem("cart")) || [];
let favs = JSON.parse(localStorage.getItem("favs")) || [];

/* =========================
   CART
========================= */

function add(name, price, img = "") {
  cart.push({ name, price: Number(price), img });
  saveCart();
  renderCart();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function removeItem(i) {
  cart.splice(i, 1);
  saveCart();
  renderCart();
}

function toggleCart() {
  document.getElementById("cart")?.classList.toggle("open");
  document.getElementById("overlay")?.classList.toggle("show");
}

function renderCart() {
  const cartItems = document.getElementById("cartItems");
  if (!cartItems) return;

  let total = 0;
  cartItems.innerHTML = "";

  cart.forEach((i, index) => {
    const item = document.createElement("div");
    const details = document.createElement("span");
    const remove = document.createElement("button");

    item.className = "item";

    details.textContent = `${i.name} - ${i.price}€`;

    remove.textContent = "✕";
    remove.onclick = () => removeItem(index);

    item.append(details, remove);
    cartItems.appendChild(item);

    total += Number(i.price);
  });

  document.getElementById("total")?.innerText = total;
  document.getElementById("count")?.innerText = cart.length;
}

/* =========================
   FAVORITES
========================= */

function toggleFav(name) {
  favs = favs.includes(name)
    ? favs.filter(f => f !== name)
    : [...favs, name];

  localStorage.setItem("favs", JSON.stringify(favs));
  updateFavUI();
}

function isFav(name) {
  return favs.includes(name);
}

function updateFavUI() {
  document.querySelectorAll(".fav").forEach(btn => {
    const name = btn.dataset.name;
    if (!name) return;
    btn.classList.toggle("active", isFav(name));
  });
}

/* =========================
   FILTER SHOP
========================= */

function filter(cat) {
  document.querySelectorAll(".card").forEach(card => {
    const match = cat === "all" || card.dataset.cat === cat;
    card.style.display = match ? "block" : "none";
  });
}

/* =========================
   REVEAL ANIMATION
========================= */

function initReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add("show");
    });
  });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
}

/* =========================
   PRODUCT PAGE (CARRUSEL LIMPIO)
========================= */

function initProductPage() {
  const nameEl = document.getElementById("pname");
  if (!nameEl) return;

  const params = new URLSearchParams(window.location.search);

  const name = params.get("name");
  const price = params.get("price");

  const imgs = [
    params.get("img"),
    params.get("img2"),
    params.get("img3")
  ].filter(Boolean);

  document.getElementById("pname").textContent = name;
  document.getElementById("pprice").textContent = price + "€";

  const mainImg = document.getElementById("mainImg");
  if (!mainImg) return;

  let index = 0;
  mainImg.src = imgs[0];

  window.nextImg = () => {
    index = (index + 1) % imgs.length;
    mainImg.src = imgs[index];
  };

  window.prevImg = () => {
    index = (index - 1 + imgs.length) % imgs.length;
    mainImg.src = imgs[index];
  };

  const addBtn = document.getElementById("addBtn");
  if (addBtn) {
    addBtn.onclick = () => add(name, Number(price), imgs[0]);
  }

  const favBtn = document.getElementById("favBtn");
  if (favBtn) {
    if (isFav(name)) favBtn.classList.add("active");

    favBtn.onclick = () => {
      toggleFav(name);
      favBtn.classList.toggle("active");
    };
  }
}
/* =========================
   INIT
========================= */

document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  updateFavUI();
  initReveal();
  initProductPage();
});

function goCheckout(){
  window.location.href = "checkout.html";
}
