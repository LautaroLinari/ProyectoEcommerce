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
    Toastify({
        text: "Eliminado ",
        duration: 2000,
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

    let idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);


    productosEnCarrito.splice(index, 1);

    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

}

btnVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito(){

    Swal.fire({
        title: 'Estas seguro?',
        text: `Eliminaras ${productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)}  productos del carrito.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonText: 'Cancelar',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {

            productosEnCarrito.length = 0;
            //Convierto el localstorage en objeto
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
            cargarProductosCarrito();

        }
      })
    
}


//Uso mediante objeto la funcion reduce para obtener el precio total
function actualizarTotal(){

    const totalCalculado = productosEnCarrito.reduce((acumulador, producto) => acumulador + (producto.price * producto.cantidad), 0);
    total.innerText = `$ ${totalCalculado} USD`;
}

btnComprar.addEventListener("click", comprarCarrito);


// COMPRA SIMULADA
function comprarCarrito(){

    Swal.fire({
        title: 'Forma de Pago',
        allowOutsideClick: false,
            html: `
            <style>
                form {
                    display: flex;
                    flex-direction:column;
                    align-items:center;
                    justify-content:center;
                    flex-wrap: wrap;
                }
                section {
                    padding:10px;
                }
                form input{
                    width:100px;
                }
            </style>
            <form>
                <section>
                    <h3>Informacion de Contacto</h3>
                    <div>
                        <label for="name">
                            <span>Nombre Completo: </span>
                        </label>
                        <input type="text" id="name" name="name" required>
                    </div>
                    <div>
                        <label for="mail">
                            <span>Correo Electronico: </span>
                        </label>
                        <input type="email" id="mail" name="email" required>
                    </div>
                    <div>
                        <label for="pwd">
                            <span>Fecha Nacimiento: </span>
                        </label>
                        <input type="date" id="nacimiento" max="2007-01-01" name="fechaNacimiento" required>
                    </div>
                    <div>
                        <label for="pwd">
                            <span>Numero de telefono: </span>
                        </label>
                        <input type="number" id="telefono" name="telefono" pattern="[0-9]{11}" required>
                    </div>
                </section>
                <section>
                    <h3>Informacion de Pago</h3>
                    <div>
                        <label for="card">
                            <span>Tipo de Tarjeta:</span>
                        </label>
                        <select id="typeCard" name="usercard" required>
                            <option value="visa">Visa</option>
                            <option value="mc">Mastercard</option>
                        </select>
                    </div>
                    <div>
                        <label for="number">
                            <span>Numero de Tarjeta:</span>
                        </label>
                        <input type="tel" id="cardNumber" name="cardNumber" required>
                    </div>
                    </div>
                        <label for="date">
                            <span>Fecha de Expiracion:</span>
                        </label>
                        <input type="date" id="dateExp" min="2023-10-27" max="2050-01-01" name="expiration" required>
                    </div>
                    </div>
                        <br>
                        <label for="number">
                            <span>Codigo de Seguridad:</span>
                        </label>
                        <input type="number" min="100" max="9999" id="codigo" name="cardcode" required>
                    </div>
                </section>
        </form>`,
        confirmButtonText: 'Pagar',
        cancelButtonText: 'Cancelar',
        showCancelButton: 'true',
        focusConfirm: false,
        preConfirm: () => {
          const nombre = Swal.getPopup().querySelector('#name').value
          const email = Swal.getPopup().querySelector('#mail').value
          const nacimiento = Swal.getPopup().querySelector('#nacimiento').value
          const telefono = Swal.getPopup().querySelector('#telefono').value
          const typeCard = Swal.getPopup().querySelector('#typeCard').value
          const cardNumber = Swal.getPopup().querySelector('#cardNumber').value
          const dateExp = Swal.getPopup().querySelector('#dateExp').value
          const codigo = Swal.getPopup().querySelector('#codigo').value
          if (!nombre || !email || !nacimiento || !telefono || !typeCard || !cardNumber || !dateExp || !codigo ) {
            Swal.showValidationMessage(`Error: Algun campo se encuentra vacio!`)
          }
          return { nombre: nombre, email: email, nacimiento:nacimiento, telefono:telefono, typeCard:typeCard, cardNumber:cardNumber, dateExp:dateExp, codigo:codigo }
        }
    }).then((Pagar) => {
        if (Pagar.isConfirmed) {
            let timerInterval
            Swal.fire({
              title: 'Realizando Pago',
              html: 'Espere un momento...',
              timer: 2000,
              timerProgressBar: true,
              didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                  b.textContent = Swal.getTimerLeft()
                }, 100)
              },
              willClose: () => {
                clearInterval(timerInterval)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Pago Exitoso',
                    showConfirmButton: false,
                    timer: 1200
                  })
              }
            })
    
            productosEnCarrito.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    
            setTimeout(cssGracias, 2000)
            function cssGracias(){
                contenedorCarritoVacio.classList.add("disabled");
                contenedorProductos.classList.add("disabled");
                contenedorAcciones.classList.add("disabled");
                contenedorComprado.classList.remove("disabled");
            }
        } 
    })
}

