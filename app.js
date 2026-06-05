let cart = JSON.parse(localStorage.getItem("cart")) || [];
let favs = JSON.parse(localStorage.getItem("favs")) || [];
let products = JSON.parse(localStorage.getItem("products")) || [
  {name:"Minimal", price:12, img:"img1.jpg", cat:"sencillos"},
  {name:"Perla", price:14, img:"img2.jpg", cat:"sencillos"},
  {name:"Aros", price:16, img:"img3.jpg", cat:"aros"}
];

/* =========================
   CART (ZARA STYLE)
========================= */

function add(name, price){
  cart.push({name, price});
  saveCart();
  renderCart();
}

function removeItem(i){
  cart.splice(i, 1);
  saveCart();
  renderCart();
}

function saveCart(){
  localStorage.setItem("cart", JSON.stringify(cart));
}

/* =========================
   FAVORITES (GLOBAL)
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
    if(name){
      btn.innerHTML = isFav(name) ? "❤️" : "🤍";
    }
  });
}

/* =========================
   CART UI (ZARA SLIDE)
========================= */

function toggleCart(){
  document.getElementById("cart")?.classList.toggle("open");
  document.getElementById("overlay")?.classList.toggle("show");
}

function renderCart(){
  const cartItems = document.getElementById("cartItems");
  if(!cartItems) return;

  let html = "";
  let total = 0;

  cart.forEach((i, index)=>{
    html += `
      <div class="item">
        <span>${i.name} - ${i.price}€</span>
        <span onclick="removeItem(${index})" style="cursor:pointer;">✕</span>
      </div>
    `;
    total += i.price;
  });

  cartItems.innerHTML = html;
  document.getElementById("total").innerText = total;
  document.getElementById("count").innerText = cart.length;
}

/* =========================
   FILTERS (SHOP)
========================= */

function filter(cat){
  document.querySelectorAll(".card").forEach(card=>{
    const match = (cat === "all" || card.dataset.cat === cat);
    card.style.display = match ? "block" : "none";
  });
}

/* =========================
   CHECKOUT
========================= */

function goCheckout(){
  window.location.href = "checkout.html";
}

/* =========================
   ADMIN PANEL
========================= */

function addProduct(){
  const name = document.getElementById("name").value;
  const price = +document.getElementById("price").value;
  const img = document.getElementById("img").value;
  const cat = document.getElementById("cat").value;

  if(!name || !price || !img || !cat){
    alert("Rellena todos los campos 💎");
    return;
  }

  products.push({name, price, img, cat});
  localStorage.setItem("products", JSON.stringify(products));

  alert("Producto añadido 💎");
}

/* =========================
   RENDER PRODUCTS (IMPORTANTE)
========================= */

function renderProducts(){
  const container = document.querySelector(".products");
  if(!container) return;

  container.innerHTML = "";

  products.forEach(p=>{
    container.innerHTML += `
      <div class="card reveal" data-cat="${p.cat}">

        <img src="${p.img}" alt="${p.name}">

        <h3>${p.name}</h3>
        <p>${p.price}€</p>

        <button onclick="add('${p.name}',${p.price})">
          Añadir
        </button>

        <button class="fav" data-name="${p.name}"
          onclick="toggleFav('${p.name}')">
          ${isFav(p.name) ? "❤️" : "🤍"}
        </button>

      </div>
    `;
  });

  updateFavUI();
  initReveal();
}

/* =========================
   SCROLL REVEAL (APPLE STYLE)
========================= */

function initReveal(){
  const observer = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add("show");
      }
    });
  });

  document.querySelectorAll(".reveal").forEach(el=>{
    observer.observe(el);
  });
}

/* =========================
   INIT APP
========================= */

document.addEventListener("DOMContentLoaded", ()=>{
  renderCart();
  updateFavUI();
  renderProducts();
  initReveal();
});
