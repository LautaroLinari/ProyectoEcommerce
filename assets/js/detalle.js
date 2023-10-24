let productosEnDetalles = localStorage.getItem("productos-detalles");
productosEnDetalles = JSON.parse(productosEnDetalles);

const contenedorDetalles = document.querySelector("#contenedor-detalles")

function cargarDetalles() {

    // location.href=".../detalles.html";

    contenedorDetalles.innerHTML = "";


        const div = document.createElement("div");
        div.classList.add("contenedor-detalle");
        div.innerHTML = `
        <div class="detalles">
            <img class="detalle-producto-imagen" src="${productosEnDetalles.img}" alt="${productosEnDetalles.name}">
            <div class="detalle-producto-titulo">
                <small>Nombre: <p>${productosEnDetalles.name}</p> </small>
            </div>
            <div class="detalle-producto-descripcion">
                <small>Descripcion: <p>${productosEnDetalles.description}</p> </small>

            </div>
            <div class="carrito-producto-cantidad">
                <small>Talles Disponibles: <p>${productosEnDetalles.talle}</p> </small>
            </div>
            <div class="carrito-producto-precio">
                <small>Precio: <p>$ ${productosEnDetalles.price} USD</p> </small>
            </div>
            <div class="carrito-producto-precio">
                <button class="carrito-producto-eliminar" id="${productosEnDetalles.id}">Agregar al Carrito</button>
            </div>
            </div>`;

        contenedorDetalles.append(div);

}

cargarDetalles();