/* =========================
   STATE
========================= */

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let products = [
  {
    name:"Indus",
    price:8,
    cat:"sencillos",
    images:[
  "images/indus1.jpg",
  "images/indus2.jpg"
]
  },
  {
    name:"Ara",
    price:8,
    cat:"sencillos",
    images:["images/ara1.jpg"]
  },
    {
    name:"Andromeda",
    price:8,
    cat:"sencillos",
    images:["images/andromeda1.jpg"]
  },
    {
    name:"Lyra",
    price:8,
    cat:"sencillos",
    images:["images/lyra1.jpg","images/lyra2.jpg"]
  },
    {
    name:"Corona Borealis",
    price:5,
    cat:"sencillos",
    images:["images/coronaborealis1.jpg"]
  },
    {
    name:"Corona Australis",
    price:5,
    cat:"sencillos",
    images:["images/coronaaustralis1.jpg"]
  },
    {
    name:"Volans Plata",
    price:6,
    cat:"sencillos",
    images:["images/volansplata1.jpg"]
  },
    {
    name:"Volans Oro",
    price:6,
    cat:"sencillos",
    images:["images/volansoro1.jpg"]
  },

  {
    name:"Leo",
    price:8,
    cat:"aros",
    images:["images/leo1.jpg","images/leo2.jpg","images/leo3.jpg"]
  },
   {
    name:"Taurus",
    price:8,
    cat:"aros",
    images:["images/taurus1.jpg","images/taurus2.jpg","images/taurus3.jpg"]
  },
   {
    name:"Anthe",
    price:8,
    cat:"aros",
    images:["images/anthe1.jpg","images/anthe2.jpg"]
  },
   {
    name:"Meissa",
    price:8,
    cat:"aros",
    images:["images/meissa1.jpg","images/meissa2.jpg"]
  },
   {
    name:"Eris",
    price:8,
    cat:"aros",
    images:["images/eris1.jpg","images/eris2.jpg"]
  },
   {
    name:"Bianca",
    price:8,
    cat:"aros",
    images:["images/bianca1.jpg","images/bianca2.jpg","images/bianca3.jpg"]
  },
   {
    name:"Pyxis",
    price:8,
    cat:"largos",
    images:["images/pyxis1.jpg"]
  },
   {
    name:"Casiopea",
    price:8,
    cat:"largos",
    images:["images/casiopea1.jpg"]
  },
    {
    name:"Norma",
    price:10,
    cat:"largos",
    images:["images/norma1.jpg"]
  },
    {
    name:"Crux Plata",
    price:8,
    cat:"largos",
    images:["images/cruxplata1.jpg","images/cruxplata2.jpg"]
  },
    {
    name:"Crux Oro",
    price:8,
    cat:"largos",
    images:["images/cruxoro1.jpg","images/cruxoro2.jpg"]
  },
    {
    name:"Aquila Plata",
    price:8,
    cat:"largos",
    images:["images/aquilaplata1.jpg","images/aquilaplata2.jpg"]
  },
    {
    name:"Aquila Oro",
    price:8,
    cat:"largos",
    images:["images/aquilaoro1.jpg","images/aquilaoro2.jpg"]
  },
    {
    name:"Tucana",
    price:10,
    cat:"largos",
    images:["images/tucana1.jpg","images/tucana2.jpg"]
  },
   {
    name:"Gemini",
    price:10,
    cat:"largos",
    images:["images/gemini1.jpg","images/gemini2.jpg"]
  },
   {
    name:"Vela",
    price:8,
    cat:"largos",
    images:["images/vela1.jpg"]
  },
   {
    name:"Orion",
    price:8,
    cat:"largos",
    images:["images/orion1.jpg","images/orion2.jpg"]
  },
   {
    name:"Eridanus",
    price:8,
    cat:"largos",
    images:["images/eridanus1.jpg","images/eridanus2.jpg"]
  },
   {
    name:"Phoenix",
    price:8,
    cat:"largos",
    images:["images/phoenix1.jpg","images/phoenix2.jpg"]
  },
   {
    name:"Ceres",
    price:6,
    cat:"aretes",
    images:["images/ceres1.jpg","images/ceres2.jpg"]
  },
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

   

    card.append(img, title, price, btn);
    container.appendChild(card);
  });

  
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
  renderProducts();
  initReveal();
 // 👉 FILTRO DESDE INDEX
  const params = new URLSearchParams(window.location.search);
  const cat = params.get("cat");

  if (cat) {
    filter(cat);
  }
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

let touchStartX = 0;
let touchEndX = 0;

function handleSwipe(imgEl) {
  const diff = touchStartX - touchEndX;

  if (Math.abs(diff) < 50) return; // evita micro-movimientos

  if (diff > 0) {
    // swipe izquierda → siguiente
    const index = parseInt(imgEl.dataset.index || "0");
    setImg(imgEl, index + 1);
  } else {
    // swipe derecha → anterior
    const index = parseInt(imgEl.dataset.index || "0");
    setImg(imgEl, index - 1);
  }
}
document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll(".carousel-img").forEach(img => {

    img.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    img.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe(img);
    });

  });

});
/* =========================
   PRODUCT PAGE FIX
========================= */

const params = new URLSearchParams(window.location.search);

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
    pimg.src = product.images[0]; pimg.dataset.images = product.images.join(","); pimg.dataset.index = "0";

    const addBtn = document.getElementById("addBtn");
    
    if (addBtn) {
      addBtn.onclick = () => {
        add(product.name, product.price, product.images[0]);
      };
    }

    
    }
  }
