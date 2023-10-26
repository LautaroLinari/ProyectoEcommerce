const contenedorProductos = document.querySelector("#contenedor-productos");
const btnsCategoria = document.querySelectorAll(".boton-categoria");
const titulo = document.querySelector("#titulo-principal");
let btnAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");
let btnVerMas = document.querySelectorAll(".producto-vermas");

let dataProductos = [];

    //Fetch con Promesas
fetch("./assets/data/productos.json")
    .then(response => {
        if(response.status === 200){
            return response.json()
        } else {
            throw new Error(`Error al obtener los datos.`)
        }
    })
    //Promesas
    .then(data => {
        dataProductos = data;
        cargarProductos(dataProductos);
    })
    //Manejar los errores de las promesas
    .catch(error => {
        console.log(error);
        alert(error);
    })



function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(product => {
        const div = document.createElement("div");
        div.className = "producto";
    
        div.innerHTML = `
        <img src=${product.img} class="producto-imagen" alt="">
        <div class="producto-detalles">
            <h2 class="producto-titulo">${product.name}</h2>
            <p class="producto-price">Talles disponibles: ${product.talle}</p>
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

        const categoriaSeleccionada = e.currentTarget.id;

        if (categoriaSeleccionada != "todos") {
            titulo.innerText = categoriaSeleccionada.toUpperCase();

            const productSeleccionado = dataProductos.filter(dataProducto => dataProducto.categoria === categoriaSeleccionada);
            cargarProductos(productSeleccionado);

        } else {
            titulo.innerText = "TODOS LOS PRODUCTOS";
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

if(productosEnCarrito){
    productosCarrito = JSON.parse(productosEnCarrito); 
    actualizarNumeroCarrito();
}else{
    productosCarrito = [];
}


function agregarCarrito(e) {

    const idBoton = e.currentTarget.id
    const productoAgregado = dataProductos.find(dataProducto => dataProducto.id === idBoton);
    const talleBuscado = productoAgregado.talle;


     Swal.fire({
        title: 'Selecciona un talle',
        input: 'number',
        allowOutsideClick: false,
        inputPlaceholder: talleBuscado,
        showCancelButton: true,
        cancelButtonText:'Cancelar',
        confirmButtonText:'Agregar',
        inputValidator: (value) => {
            for (let i = 0; i < talleBuscado.length; i++) {
                const element = talleBuscado[i];

                if(value === `${element}`){
                        Toastify({
                            text: "Agregado al carrito ",
                            duration: 2000,
                            newWindow: true,
                            close: true,
                            gravity: "top", 
                            position: "right", 
                            stopOnFocus: true, 
                            style: {
                              background: "#49cb58",
                              borderRadius: "2rem",
                              textTransform: "uppercase",
                              fontSize: ".85rem"
                            }, 
                            offset: {
                                x: '1.5rem', 
                                y: '1.5rem' 
                              },
                            onClick: function(){}
                          }).showToast();

                    if (productosCarrito.some(dataProducto => dataProducto.id === idBoton)) {
                        const index = productosCarrito.findIndex(dataProducto => dataProducto.id === idBoton);
                        productosCarrito[index].cantidad++;
                    } else {
                        productoAgregado.cantidad = 1;
                        // productoAgregado.talleSeleccionado = element;
                        productosCarrito.push(productoAgregado);
                        console.log(productoAgregado.talleSeleccionado);
                        
                    }
                    actualizarNumeroCarrito();
                    localStorage.setItem("productos-en-carrito", JSON.stringify(productosCarrito));
                    
                } else{

                }
            }     
        }
    })
}


function actualizarNumeroCarrito(){
    let nuevoNumero = productosCarrito.reduce((acumulador, dataProducto) => acumulador + dataProducto.cantidad, 0)
    numerito.innerText = nuevoNumero;
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


    localStorage.setItem("productos-detalles", JSON.stringify(productoDetalles));
    location.href='./detalles.html';

}

