function filtrarCategoria(){

    let categoria = document.getElementById("filtroCategoria").value;

    if(categoria === "Todos"){

        cargarProductos();

        return;

    }

    let contenedor = document.getElementById("listaProductos");

    contenedor.innerHTML = "";

    productos
        .filter(producto => producto.categoria === categoria)
        .forEach(function(producto){

            // Aquí va el mismo código que ya tienes para crear la tarjeta del producto.

        });

}
