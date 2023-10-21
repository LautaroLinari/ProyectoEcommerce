// function obtenerId(product) {
//     const apiUrl = `https://65306acc6c756603295e9b53.mockapi.io/shoes/${product}`;
//     return fetch(apiUrl)
//         .then(response => {
//                 if(response.status === 200){
//                     return response.json()
//                 } else {
//                     throw new Error(`Error al obtener los datos.`)
//                 }
//             })
//         .then(product => {
            
//             console.log(product.id);
//             const contenedor2 = document.getElementById("contenedor-detalles")

//             product.forEach((product) => {

//             const content2 = document.createElement("div");
//             content2.className = "producto";
//             content2.innerHTML = `
//             <img src="${product.img}" class="producto-imagen" alt="">
//             <div class="producto-detalles">
//                 <h3 class="producto-titulo">${product.name}</h3>
//                 <p class="producto-precio">${product.price}</p>
//                 <p class="producto-precio">${product.talle}</p>
//                 <p class="producto-precio">${product.categoria}</p>
//             </div>`;
        
//             contenedor2.append(content2);
//             })
//         })

//         .catch(error =>{

//             alert.error(error)

//         });
        
// }