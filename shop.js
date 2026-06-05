let cart = JSON.parse(localStorage.getItem("cart")) || [];

function add(name,price){
  cart.push({name,price});
  save();
  render();
}

function save(){
  localStorage.setItem("cart",JSON.stringify(cart));
}

function render(){
  let html="";
  let total=0;

  cart.forEach(i=>{
    html+=`<div>${i.name} ${i.price}€</div>`;
    total+=i.price;
  });

  document.getElementById("items").innerHTML=html;
  document.getElementById("total").innerText=total;
  document.getElementById("count").innerText=cart.length;
}

function checkout(){
  window.open("https://instagram.com/lionajewels");
}

render();

/* scroll reveal */
const obs=new IntersectionObserver(e=>{
  e.forEach(x=>{
    if(x.isIntersecting)x.target.classList.add("show");
  });
},{threshold:0.2});

document.querySelectorAll(".reveal").forEach(el=>obs.observe(el));
