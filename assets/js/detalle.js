//VARIABLES A UTILIZAR

let productosEnDetalles = localStorage.getItem("productos-detalles");
productosEnDetalles = JSON.parse(productosEnDetalles);

const contenedorDetalles = document.querySelector("#contenedor-detalles")
let btnVerTalla = document.querySelector(".detalles-producto-talla");

//CARGAR LOS DATOS DEL PRODUCTO SELECCIONADO DESDE LOCALSTORAGE
function cargarDetalles() {
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
                <button class="detalles-producto-talla" id="${productosEnDetalles.id}"><i class="bi bi-bar-chart-fill"></i> Ver Tabla de Talles</button>
            </div>
        </div>`;

        contenedorDetalles.append(div);

}
cargarDetalles();

VerTallaDetalles();
//EVENTO DE CLICK
function VerTallaDetalles(){
    btnVerTalla = document.querySelector(".detalles-producto-talla");
    btnVerTalla.addEventListener("click", verTalla);
}
//FUNCION QUE MUESTRA IMAGEN
function verTalla(){
    Swal.fire({
        imageUrl: './assets/img/tablaTalles.jpg',
        imageHeight: 500,
        imageAlt: 'TallaShoes'
      })
}

