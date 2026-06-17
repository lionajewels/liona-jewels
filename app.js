/* =========================
   STATE
========================= */

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let favs = JSON.parse(localStorage.getItem("favs")) || [];
let products = [
  {
    name:"Minimal",
    price:12,
    cat:"sencillos",
    images:["img1.jpg","img2.jpg","img3.jpg"]
  },
  {
    name:"Perla",
    price:14,
    cat:"sencillos",
    images:["img4.jpg","img5.jpg","img6.jpg"]
  },
  {
    name:"Aros",
    price:16,
    cat:"aros",
    images:["img7.jpg","img8.jpg","img9.jpg"]
  }
];

/* =========================
   CART
========================= */

function add(name, price, img){

  cart.push({
    name: String(name || ""),
    price: Number(price) || 0,
    img: String(img || "")
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
   FAVORITES (UNIFICADO)
========================= */

function toggleFav(name, price, img){

  const exists = favs.find(p => p.name === name);

  if(exists){
    favs = favs.filter(p => p.name !== name);
  } else {
    favs.push({
      name: String(name || ""),
      price: Number(price) || 0,
      img: String(img || "")
    });
  }

  localStorage.setItem("favs", JSON.stringify(favs));
  updateFavUI();
}

function isFav(name){
  return favs.some(p => p.name === name);
}

function updateFavUI(){

  document.querySelectorAll(".fav").forEach(btn => {

    const name = btn.dataset.name;
    if(!name) return;

    btn.innerHTML = heartSVG(isFav(name));
  });
}
function heartSVG(active){
  return `
    <svg class="fav-icon ${active ? 'active' : ''}" viewBox="0 0 24 24" fill="none">
      <path d="M12 21s-7-4.6-9.5-8.5C.5 9.2 2.5 5.5 6.2 5.5c2 0 3.3 1 3.8 2
        .5-1 1.8-2 3.8-2 3.7 0 5.7 3.7 3.7 7C19 16.4 12 21 12 21z"
        stroke="currentColor"
        stroke-width="1.6"
        stroke-linejoin="round"/>
    </svg>
  `;
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

  cart.forEach((item, index)=>{

    const div = document.createElement("div");
    div.className = "item";

    const text = document.createElement("span");
    const btn = document.createElement("button");

    text.textContent = `${item.name} - ${item.price}€`;

    btn.textContent = "✕";
    btn.className = "remove-item";
    btn.onclick = () => removeItem(index);

    div.append(text, btn);
    cartItems.appendChild(div);

    total += item.price;
  });

  const totalEl = document.getElementById("total");
  const countEl = document.getElementById("count");

  if(totalEl) totalEl.innerText = total;
  if(countEl) countEl.innerText = cart.length;
}

/* =========================
   FILTERS
========================= */

function filter(cat){

  document.querySelectorAll(".card").forEach(card=>{
    const match = cat === "all" || card.dataset.cat === cat;
    card.style.display = match ? "block" : "none";
  });
}

/* =========================
   CHECKOUT
========================= */

function goCheckout(){
  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.href = "checkout.html";
}

/* =========================
   PRODUCTS RENDER
========================= */

function renderProducts(){

  const container = document.querySelector(".products");
  if(!container) return;

  container.innerHTML = "";

  products.forEach(p=>{

    const card = document.createElement("div");
    card.className = "card reveal";
    card.dataset.cat = p.cat;
    card.onclick = () => {
  window.location.href =
    `product.html?name=${encodeURIComponent(p.name)}`;
};

    const img = document.createElement("img");
    img.src = p.images[0];

    const title = document.createElement("h3");
    title.textContent = p.name;

    const price = document.createElement("p");
    price.textContent = `${p.price}€`;

    const btn = document.createElement("button");
    btn.textContent = "Añadir";
    btn.onclick = (e) => {    e.stopPropagation();    add(     p.name,     p.price,     p.images[0]   ); };

    const fav = document.createElement("button");
    fav.className = "fav";
    fav.dataset.name = p.name;
    fav.innerHTML = heartSVG(isFav(p.name));
   fav.onclick = (e) => {

  e.stopPropagation();

  toggleFav(
    p.name,
    p.price,
    p.images[0]
  );
};

    card.append(img, title, price, btn, fav);
    container.appendChild(card);
  });

  updateFavUI();
   initReveal();
}

/* =========================
   REVEAL
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
   INIT
========================= */


document.addEventListener("DOMContentLoaded", ()=>{

  renderCart();
  updateFavUI();
  renderProducts();
  initReveal();

});

/* =========================
   CAROUSEL
========================= */

function getImages(imgEl){
  const imgs = imgEl.dataset.images;
  return imgs ? imgs.split(",") : [];
}

function setImg(imgEl, index){
  const images = getImages(imgEl);

  if(!images.length) return;

  // loop infinito
  if(index < 0) index = images.length - 1;
  if(index >= images.length) index = 0;

  imgEl.dataset.index = index;
  imgEl.src = images[index];
}

function nextImg(btn){
  const img = btn.parentElement.querySelector(".carousel-img");
  if(!img) return;

  const index = parseInt(img.dataset.index || "0");
  setImg(img, index + 1);
}

function prevImg(btn){
  const img = btn.parentElement.querySelector(".carousel-img");
  if(!img) return;

  const index = parseInt(img.dataset.index || "0");
  setImg(img, index - 1);
}


/* =========================
   PRODUCT PAGE FIX
========================= */

let params = new URLSearchParams(window.location.search);

const pname = document.getElementById("pname");
const pprice = document.getElementById("pprice");
const pimg = document.getElementById("pimg");

if (pname && pprice && pimg) {

  const name = params.get("name");

  const product = products.find(p => p.name === name);

  if (!product) {
    window.location.href = "shop.html";
  } else {

    pname.innerText = product.name;
    pprice.innerText = product.price + "€";
    pimg.src = product.images[0];

    const addBtn = document.getElementById("addBtn");
    const favBtn = document.getElementById("favBtn");

    if (addBtn) {
      addBtn.onclick = () => {
        add(product.name, product.price, product.images[0]);
      };
    }

    if (favBtn) {

      if (isFav(product.name)) {
        favBtn.classList.add("active");
      }

      favBtn.onclick = () => {
  toggleFav(product.name, product.price, product.images[0]);
  updateFavUI();
         favBtn.classList.toggle("active");
};
    }
  }
}
