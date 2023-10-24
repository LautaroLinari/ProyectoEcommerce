
// const obtenerData = (url) => {
//     return fetch(url)
//       .then((res) => res.json())
//       .then((data) => data);
//   };

// const filtros = (product, array) => {
//     return array.filter((ele) => ele.talle === product)
// };


// const contenedor = document.getElementById("contenedor-productos");

// obtenerData("https://65306acc6c756603295e9b53.mockapi.io/shoes")
//     .then((productoApi) => {
//         cargarProductos(productoApi, contenedor);
//         // console.log(filtros("nike", productoApi ))

//         })
//     .catch((error) => {
//         console.error("Error al obtener los datos:", error);
//     });

// const cargarProductos = (data, container) => {
//   data.forEach((product) => {
//     const div = document.createElement("div");
//     div.className = "producto";

//     div.innerHTML = `
//     <img src=${product.img} class="producto-imagen" alt="">
//     <div class="producto-detalles">
//         <h2 class="producto-titulo">${product.name}</h2>
//         <p class="producto-price">$ ${product.price} USD</p>
//         <button class="producto-vermas" id=${product.id}>Ver mas</button>
//         <button class="producto-vermas">Carrito</button>
//     </div>
    
//     `;
//     container.appendChild(div);

//     document.getElementById(`${product.id}`).addEventListener("click", () => {
//       console.log(`el id es = ${product.id}`);
//     });
//   });
// };

let dataProductos = [];

fetch("./assets/data/productos.json")
    .then(response => {
        if(response.status === 200){
            return response.json()
        } else {
            throw new Error(`Error al obtener los datos.`)
        }
    })
        
    .then(data => {
        dataProductos = data;
        cargarProductos(dataProductos);
    })

    .catch(error => {
        console.log(error);
        alert(error);
    })

const contenedorProductos = document.querySelector("#contenedor-productos");
const btnsCategoria = document.querySelectorAll(".boton-categoria");
const titulo = document.querySelector("#titulo-principal");
let btnAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");
let btnVerMas = document.querySelectorAll(".producto-vermas");


function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(product => {
        const div = document.createElement("div");
        div.className = "producto";
    
        div.innerHTML = `
        <img src=${product.img} class="producto-imagen" alt="">
        <div class="producto-detalles">
            <h2 class="producto-titulo">${product.name}</h2>
            <p class="producto-price">$ ${product.price} USD</p>
            <button class="producto-vermas"  id="${product.id}">Ver mas</button>
            <button class="producto-agregar" id=${product.id}>Agregar</button>
        </div>
        
        `;
        contenedorProductos.append(div);
    })
    actualizarAgregar();
    verMas();
}


btnsCategoria.forEach(boton => {
    boton.addEventListener("click", (e) =>{

        btnsCategoria.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {

            const productCategoria = dataProductos.find(dataProducto => dataProducto.categoria === e.currentTarget.id);
            titulo.innerText = productCategoria.categoria;

            const productSeleccionado = dataProductos.filter(dataProducto => dataProducto.categoria === e.currentTarget.id);
            cargarProductos(productSeleccionado);

        } else {
            titulo.innerText = "Todos los Productos";
            cargarProductos(dataProductos);

        }
    })
})

function actualizarAgregar() {
    btnAgregar = document.querySelectorAll(".producto-agregar");

    btnAgregar.forEach(boton => {
        boton.addEventListener("click", agregarCarrito)
    });
}

let productosCarrito;

let productosEnCarrito = localStorage.getItem("productos-en-carrito");
// const productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito"));

if(productosEnCarrito){
    productosCarrito = JSON.parse(productosEnCarrito); 
    actualizarNumeroCarrito();
}else{
    productosCarrito = [];
}
// const productosCarrito = [];


function agregarCarrito(e) {

    Toastify({
        text: "Agregado al carrito ",
        duration: 2000,
        destination: "./carrito.html",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#39b0df",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: ".85rem"
        }, 
        offset: {
            x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        onClick: function(){} // Callback after click
      }).showToast();

    const idBoton = e.currentTarget.id
    const productoAgregado = dataProductos.find(dataProducto => dataProducto.id === idBoton);
    // console.log(productoAgregado); 

    if (productosCarrito.some(dataProducto => dataProducto.id === idBoton)) {
        const index = productosCarrito.findIndex(dataProducto => dataProducto.id === idBoton);
        productosCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosCarrito.push(productoAgregado);
    }
    actualizarNumeroCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosCarrito));
}

function verMas(){
        btnVerMas = document.querySelectorAll(".producto-vermas");
        btnVerMas.forEach(boton => {
            boton.addEventListener("click", verDetalles)
    })
}

function verDetalles(e){
    const idBoton = e.currentTarget.id
    const productoDetalles = dataProductos.find(dataProducto => dataProducto.id === idBoton);
    // console.log(productoDetalles);
    // productoDetalles.push(productoDetalles);

    localStorage.setItem("productos-detalles", JSON.stringify(productoDetalles));
    
    location.href='./detalles.html';

}



function actualizarNumeroCarrito(){
    let nuevoNumero = productosCarrito.reduce((acumulador, dataProducto) => acumulador + dataProducto.cantidad, 0)
    numerito.innerText = nuevoNumero;
}