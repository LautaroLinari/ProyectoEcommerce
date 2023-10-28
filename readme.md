# ProyectoEcommerce

#Proyecto E-Commerce Diplomatura Front-End UNTREF
#Realizado por: Lautaro Linari

---------------------------------------------------------------------------------------------------------------------
Características del Proyecto:

    -Carga de productos desde un archivo JSON.
    -Buscador de productos por nombre.
    -Agregar productos al carrito.
    -Ver Detalles de un producto en cuestion.
    -El Carrito se guarda en el LocalStorage.
    -Ver el subtotal del carrito.
    -Ver la cantidad de productos que hay en el carrito.
    -Aumentar o disminuir cantidad de un producto que ya este en el carrito.
    -Vaciar o Eliminar elemento del carrito.
    -Realizar compras simuladas.
    -Uso de eventos para interactuar con los elementos del DOM.

---------------------------------------------------------------------------------------------------------------------
Estructura del Proyecto:
HTML:
    • index.html: La página principal que muestra los productos.
    • detalles.html: La pagina donde se pueden ver los detalles de los productos.
    • carrito.html: La pagina donde se puede visualizar los productos agregados al carrito.

CSS:
    • style.css: Contiene todo el estilado para todos los htmls en cuestion.

JSON:
    • productos.json: Un archivo JSON que contiene todo los datos de los productos.

JS:
    • app.js: El archivo JavaScript que realiza varias funciones como cargar los productos a partir de un FETCH, el uso de promesas en caso de que no pueda cargarse los datos del JSON y 
    algunos EVENTOS como filtrar por categoria(Marca de la zapatilla), entre otros.
    • detalles.js: Este archivo JavaScript representa la visualizacion de un producto seleccionado y un EVENTO de click que muestra una imagen con la talla ARG/USA y su respectivos CM
    • carrito.js: El archivo JavaScript que maneja toda funcionalidad del carrito como aumentar y disminuir cantidad, vaciado del carrito, compra simulada o eliminar un producto del carrito.
    • menu.js: Este archivo JavaScript unicamente representa los EVENTOS que se utilizan para la version mobile.

ADD:
    • En este proyecto se utilizo Bootstrap para los Iconos, SweetAlert2 para las Alertas y Toastify para las Notificaciones.

---------------------------------------------------------------------------------------------------------------------
Consideraciones:
    X -El unico inconveniente con el que me encontre y no supe solucionar: ocurre en el boton de AGREGAR al carrito, cuando agregas varios productos iguales pero con distinta talla la cantidad aumenta (no deberia ya que estas comprando distintos talles de zapatilla), sin embargo cuando se actualiza la pagina el error no surge.
    ✓ -Me encantaria una devolucion/solucion para este error y otros que ustedes encuentren.