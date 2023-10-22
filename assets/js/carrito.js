let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);


const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorProductos = document.querySelector("#carrito-productos");
const contenedorAcciones = document.querySelector("#carrito-acciones");
const contenedorComprado = document.querySelector("#carrito-comprado");

let btnElminar = document.querySelectorAll(".carrito-producto-eliminar");

const btnVaciar = document.querySelector("#carrito-acciones-vaciar");
const contTotal = document.querySelector("#total");
const btnComprar = document.querySelector("#carrito-acciones-comprar");


function cargarProductosCarrito() {

    if(productosEnCarrito && productosEnCarrito.length > 0){

        contenedorCarritoVacio.classList.add("disabled");
        contenedorProductos.classList.remove("disabled");
        contenedorAcciones.classList.remove("disabled");
        contenedorComprado.classList.add("disabled");

        contenedorProductos.innerHTML = "";

        productosEnCarrito.forEach(producto => {
            
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img class="carrito-producto-imagen" src="${producto.img}" alt="${producto.name}">
                <div class="carrito-producto-titulo">
                    <small>Titulo</small>   
                    <h3>${producto.name}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$ ${producto.price} USD</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$ ${producto.price * producto.cantidad} USD</p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}" ><i class="bi bi-trash3-fill"></i></button>
            `;

            contenedorProductos.append(div);
        });

    } else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorProductos.classList.add("disabled");
        contenedorAcciones.classList.add("disabled");
        contenedorComprado.classList.add("disabled");
    }

    actualizarEliminar();
    actualizarTotal();
}


cargarProductosCarrito();


function actualizarEliminar() {
    btnElminar = document.querySelectorAll(".carrito-producto-eliminar");

    btnElminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e){
    let idBoton = e.currentTarget.id;

    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);


    productosEnCarrito.splice(index, 1);

    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

}

btnVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito(){
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();
}

function actualizarTotal(){

    const totalCalculado = productosEnCarrito.reduce((acumulador, producto) => acumulador + (producto.price * producto.cantidad), 0);
    total.innerText = `$ ${totalCalculado} USD`;
}

btnComprar.addEventListener("click", comprarCarrito);

function comprarCarrito(){
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    
    contenedorCarritoVacio.classList.add("disabled");
    contenedorProductos.classList.add("disabled");
    contenedorAcciones.classList.add("disabled");
    contenedorComprado.classList.remove("disabled");

}