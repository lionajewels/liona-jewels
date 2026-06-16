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
  cart.push({
    name: String(name || ""),
    price: Number(price) || 0
  });
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
      btn.textContent = isFav(name) ? "❤️" : "🤍";
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

  let total = 0;
  cartItems.innerHTML = "";

  cart.forEach((i, index)=>{
    const item = document.createElement("div");
    const details = document.createElement("span");
    const remove = document.createElement("button");
    const price = Number(i.price) || 0;

    item.className = "item";
    details.textContent = `${String(i.name || "")} - ${price}€`;
    remove.className = "remove-item";
    remove.type = "button";
    remove.textContent = "✕";
    remove.addEventListener("click", () => removeItem(index));

    item.append(details, remove);
    cartItems.appendChild(item);
    total += price;
  });

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
  const name = document.getElementById("name").value.trim();
  const price = +document.getElementById("price").value;
  const img = document.getElementById("img").value.trim();
  const cat = document.getElementById("cat").value.trim();

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
    const name = String(p.name || "");
    const price = Number(p.price) || 0;
    const card = document.createElement("div");
    const image = document.createElement("img");
    const title = document.createElement("h3");
    const priceText = document.createElement("p");
    const addButton = document.createElement("button");
    const favButton = document.createElement("button");

    card.className = "card reveal";
    card.dataset.cat = String(p.cat || "");

    image.src = String(p.img || "");
    image.alt = name;

    title.textContent = name;
    priceText.textContent = `${price}€`;

    addButton.type = "button";
    addButton.textContent = "Añadir";
    addButton.addEventListener("click", () => add(name, price));

    favButton.className = "fav";
    favButton.type = "button";
    favButton.dataset.name = name;
    favButton.textContent = isFav(name) ? "❤️" : "🤍";
    favButton.addEventListener("click", () => toggleFav(name));

    card.append(image, title, priceText, addButton, favButton);
    container.appendChild(card);
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
/* =========================
   PRODUCT PAGE
========================= */

if(document.getElementById("pname")){

  const params = new URLSearchParams(window.location.search);

  const name = params.get("name");
  const price = params.get("price");
  const img = params.get("img");

  document.getElementById("pname").textContent = name;
  document.getElementById("pprice").textContent = price + "€";
  document.getElementById("pimg").src = img;

  document.getElementById("addBtn").onclick = () => {
    add(name, Number(price));
  };

}
