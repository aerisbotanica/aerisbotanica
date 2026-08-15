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

    const anterior = document.getElementById("productoAnterior");
    const principal = document.getElementById("productoPrincipal");
    const siguiente = document.getElementById("productoSiguiente");

    const indiceAnterior =
        (productoActual - 1 + productos.length) % productos.length;

    const indiceSiguiente =
        (productoActual + 1) % productos.length;

    const productoAnteriorData = productos[indiceAnterior];
    const productoActualData = productos[productoActual];
    const productoSiguienteData = productos[indiceSiguiente];

    anterior.innerHTML = `
        <img
            src="${productoAnteriorData.imagenes[0]}"
            alt="${productoAnteriorData.nombre}">
    `;

    principal.innerHTML = `

        <div class="producto-carrusel">

            <div class="imagen-producto">

    <img
        src="${productoActualData.imagenes[0]}"
        alt="${productoActualData.nombre}"
        onclick="alternarInformacionProducto()">

    <button
        class="copiar-imagen"
        onclick="copiarInformacion(
            '${productoActualData.nombre}',
            '${productoActualData.codigo}',
            '${productoActualData.precio}'
        )">
        📋
    </button>

    <div class="informacion-imagen">

        <h3>${productoActualData.nombre}</h3>

        <p class="precio">
            Q${productoActualData.precio}
        </p>

        <div class="medidas">

            <span>
                <strong>Alto:</strong>
                ${productoActualData.alto || productoActualData.tamaño}
            </span>

            <span>
                <strong>Ancho:</strong>
                ${productoActualData.ancho || "—"}
            </span>

        </div>

        <p class="estado ${productoActualData.estado}">
            ${
                productoActualData.estado === "disponible"
                ? "🟢 Disponible"
                : "🔴 Agotado"
            }
        </p>

        <p class="descripcion">
            ${productoActualData.descripcion}
        </p>

        ${
            productoActualData.estado === "agotado"

            ?

            `<button class="btn-pedido" disabled>
                Agotado
            </button>`

            :

            `<button
                class="btn-pedido"
                onclick="abrirPedido(
                    '${productoActualData.nombre}',
                    '${productoActualData.codigo}'
                )">
                🛒 Hacer pedido
            </button>`
        }

        <button
            class="btn-detalle"
            onclick="verDetalle('${productoActualData.codigo}')">
            Ver detalles
        </button>

    </div>

</div>
        </div>

    `;

    siguiente.innerHTML = `
        <img
            src="${productoSiguienteData.imagenes[0]}"
            alt="${productoSiguienteData.nombre}">
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

/* =========================================
   CARRUSEL TOUCH PARA CELULAR
   AERIS BOTÁNICA
   ========================================= */

let touchInicioX = 0;
let touchFinX = 0;
let moviendoTouch = false;

const carruselTouch = document.querySelector(".carrusel");

if (carruselTouch) {

    carruselTouch.addEventListener("touchstart", function(event){

        if (event.touches.length !== 1) return;

        touchInicioX = event.touches[0].clientX;
        moviendoTouch = true;

    }, { passive: true });


    carruselTouch.addEventListener("touchmove", function(event){

        if (!moviendoTouch) return;

        touchFinX = event.touches[0].clientX;

    }, { passive: true });


    carruselTouch.addEventListener("touchend", function(){

        if (!moviendoTouch) return;

        const diferencia = touchFinX - touchInicioX;

        const distanciaMinima = 50;

        if (Math.abs(diferencia) >= distanciaMinima) {

            if (diferencia < 0) {

                // Deslizar hacia la izquierda
                productoSiguiente();

            } else {

                // Deslizar hacia la derecha
                productoAnterior();

            }

        }

        touchInicioX = 0;
        touchFinX = 0;
        moviendoTouch = false;

    });

}

/* Ocultar aviso después de unos segundos */

setTimeout(function(){

    const aviso = document.getElementById("avisoTouch");

    if(aviso){

        aviso.style.transition = "opacity .6s ease, transform .6s ease";

        aviso.style.opacity = "0";
        aviso.style.transform = "translateY(-10px)";

        setTimeout(function(){

            aviso.remove();

        }, 600);

    }

}, 4500);

function alternarInformacionProducto(){

    const informacion = document.querySelector(
        ".producto-carrusel .informacion-imagen"
    );

    if(!informacion) return;

    informacion.classList.toggle("visible");

}

function alternarInformacionProducto(){

    const informacion = document.querySelector(
        ".producto-carrusel .informacion-imagen"
    );

    if(!informacion){
        return;
    }

    informacion.classList.toggle("visible");

}