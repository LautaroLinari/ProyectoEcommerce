// function obtenerId(){
//     const btn = document.querySelector(".producto-vermas");
//     btn.onclick = function(){
//         // console.log("Hola Nike");
//         console.log(btn.dataset.id);
//         const id = btn.dataset.id;
//         getData(id);
//     };
// }

const contenedor = document.getElementById("contenedor-productos");


function getProductos(){
    const apiUrl = "https://65306acc6c756603295e9b53.mockapi.io/shoes";
    return fetch(apiUrl)
        .then(response => {
                if(response.status === 200){
                    return response.json()
                } else {
                    throw new Error(`Error al obtener los datos.`)
                }
            })
        .then(response => {
                response.forEach((product) => {
                const content = document.createElement("div");
                content.className = "producto";
                content.innerHTML = `
                <img src="${product.img}" class="producto-imagen" alt="">
                <div class="producto-detalles">
                    <h3 class="producto-titulo">${product.name}</h3>
                    <p class="producto-precio">${product.price}</p>
                    <a class="producto-vermas" type="submit" onclick="obtenerId(${product.id})">Ver mas</a>
                </div>`;
            
                contenedor.append(content);
                })
        })
            .catch(error =>{
            console.error(error)
    
        });
    
}
getProductos();


function obtenerId(product) {
    const apiUrl = `https://65306acc6c756603295e9b53.mockapi.io/shoes/${product}`;
    return fetch(apiUrl)
        .then(response => {
                if(response.status === 200){
                    return response.json()
                } else {
                    throw new Error(`Error al obtener los datos.`)
                }
            })
        .then(product => {
            console.log(product.id);
            location.href ='./detalles.html';
            console.log(product.id);
            // const contenedor2 = document.getElementById("contenedor-detalles")

            // product.forEach((product) => {
            // const content2 = document.createElement("div");
            // content2.className = "producto";
            // content2.innerHTML = `
            // <img src="${product.img}" class="producto-imagen" alt="">
            // <div class="producto-detalles">
            //     <h3 class="producto-titulo">${product.name}</h3>
            //     <p class="producto-precio">${product.price}</p>
            //     <p class="producto-precio">${product.talle}</p>
            //     <p class="producto-precio">${product.categoria}</p>
            // </div>`;
        
            // contenedor2.append(content2);
            // })
        })

        .catch(error =>{

            alert.error(error)

        });
        
}




let carrito = [];  


// function getData(id){
//     const apiUrl = `https://65306acc6c756603295e9b53.mockapi.io/shoes/${id}`;
//     return fetch(apiUrl)
//         .then(response => {
//                 if(response.status === 200){
//                     return response.json()
//                 } else {
//                     throw new Error(`Error al obtener los datos.`)
//                 }
//             })
//         .then(product => {
//             console.log(data)
//             const name = product.name;
//             const id = product.id;
//             const description = product.description;
//             const price = product.price;
//             const talle = product.talle;
//             console.log(`La zapatilla ${name} es ${description} y tiene un precio de ${price} USD. Sus tallas disponibles son ${talle}, ${id}`)
//         })
//         .catch(error =>{
//             console.error(error)

//         });
// }
// getData();