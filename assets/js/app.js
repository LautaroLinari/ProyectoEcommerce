const tableBody = document.querySelector("tbody")

// ARMADO DEL DOM HTML
const crearFilaHTML = (prod)=> {
    return `<tr>
                <td>${prod.codigo}</td>
                <td>${prod.nombreProducto}</td>
                <td>${prod.descripcion}</td>
                <td>${prod.precioUnitario}</td>
                <td>${prod.categoria}</td>
            </tr>`
}

const cargarProductos = (productos)=> {
    if (productos.length > 0) {
        tableBody.innerHTML = ""
        productos.forEach(producto => {
            tableBody.innerHTML += crearFilaHTML(producto)
        })
    } else {
        alert("⛔️ No se han podido cargar los productos")
    }
}
cargarProductos(productos)