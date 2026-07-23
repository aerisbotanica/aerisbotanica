const parametros = new URLSearchParams(window.location.search);

const codigo = parametros.get("codigo");

const producto = productos.find(p => p.codigo === codigo);

if(producto){

    document.getElementById("detalleProducto").innerHTML = `
<div class="detalle">

    <div class="galeria">
        <img id="imagenPrincipal" src="${producto.imagenes[0]}">
    </div>

    <div class="info">

        <h1>${producto.nombre}</h1>

        <p class="precio">Q${producto.precio}</p>

        <p><strong>Código:</strong> ${producto.codigo}</p>

        <p>${producto.descripcion}</p>

        <p><strong>Tamaño:</strong> ${producto.tamaño}</p>

        <p><strong>Estado:</strong> ${producto.estado}</p>

        <button onclick="abrirPedido('${producto.nombre}','${producto.codigo}')">
            Hacer pedido
        </button>

    </div>

</div>
`;

}