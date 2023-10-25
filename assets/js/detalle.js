let productosEnDetalles = localStorage.getItem("productos-detalles");
productosEnDetalles = JSON.parse(productosEnDetalles);

const contenedorDetalles = document.querySelector("#contenedor-detalles")
let btnAgregarDetalles = document.querySelector(".detalles-producto-agregar");
const talleBuscado = productosEnDetalles.talle;

function cargarDetalles() {

    // location.href=".../detalles.html";

    contenedorDetalles.innerHTML = "";


        const div = document.createElement("div");
        div.classList.add("contenedor-detalle");
        div.innerHTML = `
        <div class="detalles">
            <div class="detalles-img">
                <img class="detalle-producto-imagen" src="${productosEnDetalles.img}" alt="${productosEnDetalles.name}">
                <img class="detalle-producto-imagen" src="${productosEnDetalles.img1}" alt="${productosEnDetalles.name}">
                <img class="detalle-producto-imagen" src="${productosEnDetalles.img2}" alt="${productosEnDetalles.name}">
            </div>
            <div class="detalle-producto-titulo">
                <small>Nombre: <p>${productosEnDetalles.name}</p> </small>
            </div>
            <div class="detalle-producto-descripcion">
                <small>Descripcion: <p>${productosEnDetalles.description}</p> </small>

            </div>
            <div class="detalle-producto-cantidad">
                <small>Talles Disponibles: <p>${productosEnDetalles.talle}</p> </small>
            </div>
            <div class="detalle-producto-precio">
                <small>Precio: <p>$ ${productosEnDetalles.price} USD</p> </small>
            </div>
            <div class="detalle-producto-precio">
                <button class="detalles-producto-agregar" id="${productosEnDetalles.id}">Agregar al Carrito</button>
            </div>
            </div>`;

        contenedorDetalles.append(div);

}

cargarDetalles();

agregarDeDetalles();


function agregarDeDetalles(){
    btnAgregarDetalles = document.querySelector(".detalles-producto-agregar");
    btnAgregarDetalles.addEventListener("click", agregarDesdeDetalles);
}

function agregarDesdeDetalles(){


}