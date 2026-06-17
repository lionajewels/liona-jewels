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
   FAVORITES (SVG READY)
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

  document.getElementById("total").innerText = total;
  document.getElementById("count").innerText = cart.length;
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
   PRODUCT PAGE + CARRUSEL
========================= */

if (document.getElementById("pname")) {

  const params = new URLSearchParams(window.location.search);

  const name = params.get("name");
  const price = params.get("price");

  const img1 = params.get("img");
  const img2 = params.get("img2");
  const img3 = params.get("img3");

  document.getElementById("pname").textContent = name;
  document.getElementById("pprice").textContent = price + "€";

  // MAIN IMAGE
  const mainImg = document.getElementById("mainImg");
  mainImg.src = img1;

  // THUMBS (solo si existen en HTML)
  const thumb1 = document.getElementById("img1");
  const thumb2 = document.getElementById("img2");
  const thumb3 = document.getElementById("img3");

  if (thumb1) {
    thumb1.src = img1;
    thumb1.onclick = () => mainImg.src = img1;
  }

  if (thumb2 && img2) {
    thumb2.src = img2;
    thumb2.onclick = () => mainImg.src = img2;
  }

  if (thumb3 && img3) {
    thumb3.src = img3;
    thumb3.onclick = () => mainImg.src = img3;
  }

  // ADD TO CART
  document.getElementById("addBtn").onclick = () => {
    add(name, Number(price), img1);
  };

  // FAVORITO
  const favBtn = document.getElementById("favBtn");

  if (isFav(name)) favBtn.classList.add("active");

  favBtn.onclick = () => {
    toggleFav(name);
    favBtn.classList.toggle("active");
  };
}
}
