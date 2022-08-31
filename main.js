const contenedorModal = document.getElementsByClassName("modal-contenedor")[0];
const botonAbrir = document.getElementById("carrito");
const botonCerrar = document.getElementById("carritoCerrar");
const modalCarrito = document.getElementsByClassName("modal-carrito")[0];
const contenedorCarrito = document.getElementById("carrito-contenedor");
const contadorCarrito = document.getElementById("contadorCarrito");
const cantidad = document.getElementById("cantidad");
const precioTotal = document.getElementById("precioTotal");
const cantidadTotal = document.getElementById("cantidadTotal");
const totalCompra = document.getElementById("totalCompra");
//ARRAY DE OFERTAS

let products = [
  {
    id: 0,
    marca: "Lenovo",
    precio: 100000,
    cantidad: 1,
    img: "https://st2.depositphotos.com/1164721/6301/i/600/depositphotos_63016343-stock-photo-laptop-with-smart-phone-on.jpg",
  },
  {
    id: 1,
    marca: "Dell",
    precio: 150000,
    cantidad: 1,
    img: "https://st2.depositphotos.com/1164721/6301/i/600/depositphotos_63016343-stock-photo-laptop-with-smart-phone-on.jpg",
  },
  {
    id: 2,
    marca: "Exo",
    precio: 200000,
    cantidad: 1,
    img: "https://st2.depositphotos.com/1164721/6301/i/600/depositphotos_63016343-stock-photo-laptop-with-smart-phone-on.jpg",
  },
  {
    id: 3,
    marca: "Apple",
    precio: 300000,
    cantidad: 1,
    img: "https://st2.depositphotos.com/1164721/6301/i/600/depositphotos_63016343-stock-photo-laptop-with-smart-phone-on.jpg",
  },
];

//FUNCION PARA AGREGAR LAS CARTS DE OFERTAS
products.forEach((prod) => {
  let div = document.createElement("div");

  div.innerHTML = `<div class="cards">
      <div class="img"><img src="https://st2.depositphotos.com/1164721/6301/i/600/depositphotos_63016343-stock-photo-laptop-with-smart-phone-on.jpg"></div>
      <div class="description"><p> ${prod.marca}</p>
      <div class="costo"> $ ${prod.precio}</div></div>
      <button class="boton" onclick="addToCart(${prod.id});">Agregar</button>
      
      </div>`;

  document.getElementById("ofertas").appendChild(div);
});

let cart = [];
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
    renderCart();
  }
});

const addToCart = (prodId) => {
  const existe = cart.some((prod) => prod.id === prodId);
  if (existe) {
    const prod = cart.map((prod) => {
      if (prod.id === prodId) {
        prod.cantidad++;
      }
    });
  } else {
    const item = products.find((prod) => prod.id === prodId);
    cart.push(item);
  }

  renderCart();
};

const eliminarDelCarrito = (prodId) => {
  const item = cart.find((prod) => prod.id === prodId);
  const indice = cart.indexOf(item);
  cart.splice(indice, 1);
  renderCart();
  console.log(cart);
};

const renderCart = () => {
  contenedorCarrito.innerHTML = "";
  cart.forEach((prod) => {
    const div = document.createElement("div");
    div.classList.add("productoEnCarrito");
    div.innerHTML = `
      <p>${prod.marca}</p>
      <p>Precio:$${prod.precio}</p>
      <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
      <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt">X</i></button>
      `;

    contenedorCarrito.appendChild(div);

    localStorage.setItem("cart", JSON.stringify(cart));
  });

  precioTotal.innerText = cart.reduce(
    (acc, prod) => acc + prod.cantidad * prod.precio,
    0
  );
  totalCompra.innerText = cart.reduce(
    (acc, prod) => acc + prod.cantidad * prod.precio,
    0
  );
};

console.log(totalCompra);
const botonVaciar = document.getElementById("vaciar-carrito");
botonVaciar.addEventListener("click", () => {
  cart.length = 0;
  renderCart();
});

botonAbrir.addEventListener("click", () => {
  contenedorModal.classList.toggle("modal-active");
});
botonCerrar.addEventListener("click", () => {
  contenedorModal.classList.toggle("modal-active");
});
