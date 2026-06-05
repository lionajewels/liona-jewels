let cart = JSON.parse(localStorage.getItem("cart")) || [];
let favs = JSON.parse(localStorage.getItem("favs")) || [];
let products = JSON.parse(localStorage.getItem("products")) || [
  {name:"Minimal", price:12, img:"img1.jpg", cat:"sencillos"},
  {name:"Perla", price:14, img:"img2.jpg", cat:"sencillos"},
  {name:"Aros", price:16, img:"img3.jpg", cat:"aros"}
];

// CART
function add(name,price){
  cart.push({name,price});
  save();
  renderCart();
}

function removeItem(i){
  cart.splice(i,1);
  save();
  renderCart();
}

function save(){
  localStorage.setItem("cart",JSON.stringify(cart));
}

// FAVORITES
function toggleFav(name){
  favs = favs.includes(name)
    ? favs.filter(f=>f!==name)
    : [...favs,name];

  localStorage.setItem("favs",JSON.stringify(favs));
  updateFavUI();
}

function isFav(name){
  return favs.includes(name);
}

function updateFavUI(){
  document.querySelectorAll(".fav").forEach(b=>{
    const name = b.dataset.name;
    b.innerHTML = isFav(name) ? "❤️" : "🤍";
  });
}

// CART UI (ZARA STYLE)
function toggleCart(){
  document.getElementById("cart").classList.toggle("open");
  document.getElementById("overlay").classList.toggle("show");
}

function renderCart(){
  let html = "";
  let total = 0;

  cart.forEach((i,index)=>{
    html += `<div class="item">
      ${i.name} ${i.price}€
      <span onclick="removeItem(${index})">❌</span>
    </div>`;
    total += i.price;
  });

  if(document.getElementById("cartItems")){
    document.getElementById("cartItems").innerHTML = html;
    document.getElementById("total").innerText = total;
    document.getElementById("count").innerText = cart.length;
  }
}

// FILTERS
function filter(cat){
  document.querySelectorAll(".card").forEach(c=>{
    c.style.display = (cat==="all"||c.dataset.cat===cat)?"block":"none";
  });
}

// CHECKOUT
function goCheckout(){
  window.location.href = "checkout.html";
}

// ADMIN
function addProduct(){
  const p = {
    name:document.getElementById("name").value,
    price:+document.getElementById("price").value,
    img:document.getElementById("img").value,
    cat:document.getElementById("cat").value
  };

  products.push(p);
  localStorage.setItem("products",JSON.stringify(products));

  alert("Producto añadido 💎");
}

// INIT
renderCart();
updateFavUI();

// SCROLL REVEAL
const observer = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting) e.target.classList.add("show");
  });
});

document.querySelectorAll(".reveal").forEach(el=>{
  observer.observe(el);
});
