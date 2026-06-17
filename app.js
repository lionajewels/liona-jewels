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

function saveCart(){
  localStorage.setItem("cart", JSON.stringify(cart));
}

function removeItem(i){
  cart.splice(i, 1);
  saveCart();
  renderCart();
}

/* =========================
   FAVORITES
========================= */

function toggleFav(name){
  favs = favs.includes(name)
    ? favs.filter(f => f !== name)
    : [...favs, name];

  localStorage.setItem("favs", JSON.stringify(favs));
  updateFavUI();
}

function isFav(name){
  return favs.includes(name);
}

function updateFavUI(){
  document.querySelectorAll(".fav").forEach(btn=>{
    const name = btn.dataset.name;
    if (!name) return;
    btn.classList.toggle("active", isFav(name));
  });
}

/* =========================
   CART UI
========================= */

function toggleCart(){
  document.getElementById("cart")?.classList.toggle("open");
  document.getElementById("overlay")?.classList.toggle("show");
}

function renderCart(){
  const cartItems = document.getElementById("cartItems");
  if(!cartItems) return;

  let total = 0;
  cartItems.innerHTML = "";

  cart.forEach((i, index)=>{
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

  const totalEl = document.getElementById("total");
  const countEl = document.getElementById("count");

  if (totalEl) totalEl.innerText = total;
  if (countEl) countEl.innerText = cart.length;
}

/* =========================
   FILTERS
========================= */

function filter(cat){
  document.querySelectorAll(".card").forEach(card=>{
    const match = (cat === "all" || card.dataset.cat === cat);
    card.style.display = match ? "block" : "none";
  });
}

/* =========================
   PRODUCT PAGE (CLEAN + CAROUSEL READY)
========================= */

function initProductPage(){

  const params = new URLSearchParams(window.location.search);

  const name = params.get("name");
  const price = params.get("price");

  const img1 = params.get("img");
  const img2 = params.get("img2");
  const img3 = params.get("img3");

  if (!name || !price) return;

  document.getElementById("pname").textContent = name;
  document.getElementById("pprice").textContent = price + "€";

  const mainImg = document.getElementById("mainImg");
  if (!mainImg) return;

  const imgs = [img1, img2, img3].filter(Boolean);
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

  document.getElementById("addBtn").onclick = () => {
    add(name, Number(price), img1);
  };

  const favBtn = document.getElementById("favBtn");

  if (favBtn && isFav(name)) {
    favBtn.classList.add("active");
  }

  if (favBtn) {
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
  initProductPage();
});
