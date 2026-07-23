emailjs.init("fp070j2e8atiQ2YsD");
function abrirPedido(producto, codigo){

    document.getElementById("pedido").style.display = "flex";

    document.getElementById("producto").value = producto;

    document.getElementById("codigo").value = codigo;

}


document.getElementById("cerrar").onclick = function(){

    document.getElementById("pedido").style.display = "none";

}
function enviarPedido(event){

    event.preventDefault();

    let datos = {
        nombre: document.querySelector('input[placeholder="Tu nombre"]').value,
        correo: document.querySelector('input[placeholder="Tu correo"]').value,
        producto: document.getElementById("producto").value,
        codigo: document.getElementById("codigo").value,
        punto: document.querySelector("select").value,
        fecha: document.querySelector('input[type="date"]').value
    };


    emailjs.send(
        "service_v9aox9k",
        "template_916ta8a",
        datos
    )
    .then(function(){

        alert("¡Pedido enviado correctamente! 🌿");

        document.getElementById("pedido").style.display = "none";

    })
    .catch(function(error){

        alert("Ocurrió un error al enviar el pedido.");

        console.log(error);

    });

}
function verImagen(src){

    document.getElementById("visor").style.display="flex";
    document.getElementById("imagenGrande").src=src;

}

document.getElementById("cerrarVisor").onclick=function(){

    document.getElementById("visor").style.display="none";

}
function buscarProducto(){

    let texto = document.getElementById("buscar").value.toLowerCase();

    let productos = document.querySelectorAll(".producto");

    productos.forEach(function(producto){

        let contenido = producto.innerText.toLowerCase();

        if(contenido.includes(texto)){

            producto.style.display="block";

        }else{

            producto.style.display="none";

        }

    });

}
document.querySelectorAll(".producto").forEach(function(producto){

    let estado = producto.dataset.estado;

    let boton = producto.querySelector(".btn-pedido");

    if(estado === "agotado"){

        boton.innerText = "Agotado";

        boton.disabled = true;

    }

});
function cargarProductos(){

    let contenedor = document.getElementById("listaProductos");

    contenedor.innerHTML = "";

    productos.forEach(function(producto){

        contenedor.innerHTML += `
        <div class="producto" data-estado="${producto.estado}">

    <img src="${producto.imagenes[0]}"
onclick="verDetalle('${producto.codigo}')">

    <p class="estado ${producto.estado}">
        ${producto.estado === "disponible" ? "🟢 Disponible" : "🔴 Agotado"}
    </p>

    <h3>${producto.nombre}</h3>

    <p class="descripcion">
        ${producto.descripcion}
    </p>

    <p>
        ⭐ ${producto.calificacion}/5
    </p>

    <p>
        📏 ${producto.tamaño}
    </p>

    <p class="precio">
        Q${producto.precio}
    </p>

    ${
        producto.estado === "agotado"

        ?

        `<button class="btn-pedido" disabled>Agotado</button>`

        :

        `<button class="btn-pedido"
        onclick="abrirPedido('${producto.nombre}','${producto.codigo}')">

        Hacer pedido

        </button>`
    }

</div>
        `;

    });

}

cargarProductos();

function verDetalle(codigo){

    window.location.href = "detalle.html?codigo=" + codigo;

}