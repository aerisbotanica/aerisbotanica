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
    telefono: document.getElementById("telefono").value,
    producto: document.getElementById("producto").value,
    codigo: document.getElementById("codigo").value,
    punto: document.getElementById("puntoEntrega").value === "otro"
        ? document.getElementById("otroPunto").value
        : document.getElementById("puntoEntrega").value,
    fecha: document.querySelector('input[type="date"]').value
};

    emailjs.send(
        "service_v9aox9k",
        "template_916ta8a",
        datos
    )
    .then(function(){

    alert("¡Pedido enviado correctamente! 🌿");

    document.querySelector("form").reset();

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
let productoActual = 0;

function cargarProductos(){

    mostrarProducto(productoActual);

}

function mostrarProducto(indice){

    if(productos.length === 0){
        return;
    }

    if(indice < 0){
        productoActual = productos.length - 1;
    }else if(indice >= productos.length){
        productoActual = 0;
    }else{
        productoActual = indice;
    }

    const producto = productos[productoActual];

    const contenedor = document.getElementById("productoPrincipal");

    contenedor.innerHTML = `

        <div class="producto-carrusel">

            <img
                src="${producto.imagenes[0]}"
                alt="${producto.nombre}"
                onclick="verDetalle('${producto.codigo}')">

            <p class="estado ${producto.estado}">
                ${
                    producto.estado === "disponible"
                    ? "🟢 Disponible"
                    : "🔴 Agotado"
                }
            </p>

            <h3>${producto.nombre}</h3>

            <p class="descripcion">
                ${producto.descripcion}
            </p>

            <p>
                ⭐ ${producto.calificacion}/5
            </p>

            <p>
                Tamaño: ${producto.tamaño}
            </p>

            <p class="precio">
                Q${producto.precio}
            </p>

            ${
                producto.estado === "agotado"

                ?

                `<button class="btn-pedido" disabled>
                    Agotado
                </button>`

                :

                `<button class="btn-pedido"
                    onclick="abrirPedido('${producto.nombre}','${producto.codigo}')">
                    Hacer pedido
                </button>`
            }

            <button
                class="btn-copiar"
                onclick="copiarInformacion('${producto.nombre}','${producto.codigo}','${producto.precio}')">
                📋 Copiar información
            </button>

        </div>

    `;
}

function productoAnterior(){

    const contenedor = document.getElementById("productoPrincipal");

    contenedor.classList.remove("salir-derecha");
    contenedor.classList.remove("entrar-izquierda");

    contenedor.classList.add("salir-izquierda");

    setTimeout(function(){

        mostrarProducto(productoActual - 1);

        contenedor.classList.remove("salir-izquierda");
        contenedor.classList.add("entrar-derecha");

    }, 250);

}

function productoSiguiente(){

    const contenedor = document.getElementById("productoPrincipal");

    contenedor.classList.remove("salir-izquierda");
    contenedor.classList.remove("entrar-derecha");

    contenedor.classList.add("salir-derecha");

    setTimeout(function(){

        mostrarProducto(productoActual + 1);

        contenedor.classList.remove("salir-derecha");
        contenedor.classList.add("entrar-izquierda");

    }, 250);

}
cargarProductos();

function verDetalle(codigo){

    window.location.href = "detalle.html?codigo=" + codigo;

}

function cerrarPedido(){

    document.getElementById("pedido").style.display = "none";

}
function mostrarOtroPunto(){

    const select = document.getElementById("puntoEntrega");
    const div = document.getElementById("otroPuntoDiv");
    const input = document.getElementById("otroPunto");

    if(select.value === "otro"){
        div.style.display = "block";
        input.required = true;
    }else{
        div.style.display = "none";
        input.required = false;
        input.value = "";
    }

}

function copiarInformacion(nombre, codigo, precio){

    const texto =
`🌿 AERIS BOTÁNICA

Producto: ${nombre}
Código: ${codigo}
Precio: Q${precio}

Me interesa este terrario. 😊`;

    navigator.clipboard.writeText(texto);

    alert("La información del terrario se copió al portapapeles.");
}

function toggleMenu(){

    document.querySelector(".header nav").classList.toggle("activo");

}