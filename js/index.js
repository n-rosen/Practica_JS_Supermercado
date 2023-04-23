// Variables
const baseDeDatos = [
  {
    id: 1,
    nombre: "T LETTERMAN JACKET",
    precio: 237.95,
    imagen: "media/producto1.avif",
  },
  {
    id: 2,
    nombre: "BIMMER TEE",
    precio: 52.95,
    imagen: "media/producto2.avif",
  },
  {
    id: 3,
    nombre: "WOLF FAP NAP SOCKS",
    precio: 17.95,
    imagen: "media/producto3.avif",
  },
  {
    id: 4,
    nombre: "WOLF INHALER TEE",
    precio: 34.95,
    imagen: "media/producto4.avif",
  },
];
class Usuario {
  id;
  username;
  nombre;
  telefono;
  tipo;
  contrasenya;
  constructor(id, username, nombre, telefono, tipo, contrasenya) {
    this.id = id;
    this.username = username;
    this.nombre = nombre;
    this.telefono = telefono;
    this.tipo = tipo;
    this.contrasenya = contrasenya;
  }
  getId() {
    return this.id;
  }
  getUsername() {
    return this.username;
  }
  getNombre() {
    return this.nombre;
  }
  getTelefono() {
    return this.telefono;
  }
  getTipo() {
    return this.tipo;
  }
  getContrasenya() {
    return this.contrasenya;
  }
}
// Funciones
//Comprar
function carritoComprar() {
  if (carrito.length > 0) {
    var opciones = "left=1000,top=1000,width=500,height=350",
      i = 0;
    var articulos = document.querySelector("#carrito");
    var total = document.querySelector("#total").innerHTML;
    ventana = window.open("", "ventana", opciones);
    ventana.name = "nueva";
    ventana.document.write(
      '<head><meta http-equiv="content-type" content="text/html; charset=iso-8859-1"><title>Titulo nueva ventana</title>'
    );
    ventana.document.write('<body id="cuerpo">');
    ventana.document.write('<div id="capa">');

    if (usuario != null) {
      console.log(articulos);
      ventana.document.write("<h1>" + usuario.getNombre() + "</h1>");
      ventana.document.write(
        "<h1>" +
          "TOTAL: " +
          total +
          "€" +
          "</h1>" +
          '<input type="button" name="BotonCerrar" id="botonCerrar" value="Cerrar">'
      );
    } else {
      console.log(articulos);
      ventana.document.write(
        "<h1>" +
          "TOTAL: " +
          total +
          "€" +
          "</h1>" +
          "<br>" +
          '<input type="button" name="BotonCerrar" id="botonCerrar" value="Cerrar">'
      );
    }
    ventana.document.write("</div>");
    ventana.document.write("</body>");
    //Poner a la escucha del evento clic el botón Cerrar de la nueva ventana
    console.log(ventana.name);
    var botonCerrarVentana = ventana.document.getElementById("botonCerrar");
    console.log(botonCerrarVentana.name);
    botonCerrarVentana.addEventListener("click", cerrarNuevaVentana);
  }
}
function cerrarNuevaVentana() {
  ventana.close();
}
//Registro
function registro() {
  let nombre = document.querySelector("#firstName").value;
  let nombreUsuario = document.querySelector("#userName").value;
  let contrasenya = document.querySelector("#password").value;
  let telefono = document.querySelector("#phoneNumber").value;
  let tipoUsuario = document.querySelector("#tipoUsuario");
  let tipoUsuario_value = tipoUsuario.options[tipoUsuario.selectedIndex].value;
  let usuarioRegistrar = new Usuario(
    usuarios.length + 1,
    nombreUsuario,
    nombre,
    telefono,
    tipoUsuario_value,
    contrasenya
  );
  usuarios.push(usuarioRegistrar);
  guardarUsuarios();
}

function guardarUsuarios() {
  usuarios.forEach((usuario) => {
    localStorage.setItem("usuario", JSON.stringify(usuario));
  });
}
//Iniciar sesion

function iniciarSesion() {
  let username = document.querySelector("#nombreusuario").value;
  let contrasenya = document.querySelector("#contraseña").value;
  let usuarioCorrecto = false;
  if (username == "" || contrasenya == "") {
    console.error("Introduce el nombre de usuario y la contraseña");
  } else {
    usuarios.forEach((element) => {
      console.log(element.getUsername());
      if (username == element.getUsername()) {
        if (contrasenya == element.getContrasenya()) {
          usuarioCorrecto = true;
          usuario = element;
          console.log(usuario);
          ocultarDivUsuario();
          mostrarOfertas();
        }
      }
    });
  }
  if (usuarioCorrecto == false) {
    alert("Error de login");
  }
}
function ocultarDivUsuario() {
  let formusuario = document.querySelector("#formUsuario");
  formusuario.style.display = "none";
  let divUsuario = document.querySelector("#divUsuario");
  let divnombre = document.createElement("div");
  let h4Nombre = document.createElement("h4");
  h4Nombre.innerHTML = usuario.getUsername();
  h4Nombre.style.color = "#ff0";
  h4Nombre.style.marginTop = "25px";
  divnombre.appendChild(h4Nombre);
  console.log(divnombre);
  divUsuario.appendChild(divnombre);
}

function mostrarOfertas() {
  let mensajeUsuario = document.querySelector("#titulo_cliente");
  mensajeUsuario.innerHTML = "Bienvenido/a " + usuario.getNombre();

  for (let index = 0; index < 4; index++) {
    let miNodoPrecio = document.querySelector("#nodoPrecio" + index);
    miNodoPrecio.style.textDecoration = "line-through";
    let precio = miNodoPrecio.innerHTML;
    precio = precio.substring(0, precio.length - 1);
    console.log(precio);
    let miNodoPrecioDescuento = document.querySelector(
      "#nodoDescuento" + index
    );
    if (usuario.getTipo() == 1) {
      miNodoPrecioDescuento.textContent = `${Math.round(
        parseFloat(precio) * 0.85
      )}${divisa}`;
    } else {
      miNodoPrecioDescuento.textContent = `${Math.round(
        parseFloat(precio) * 0.75
      )}${divisa}`;
    }

    miNodoPrecioDescuento.style.display = "block";
  }
  carrito = [];
  renderizarCarrito();
}

//Carrito
/**
 * Dibuja todos los productos a partir de la base de datos. No confundir con el carrito
 */
function renderizarProductos() {
  let i = 0;
  baseDeDatos.forEach((info) => {
    // Estructura
    const miNodo = document.createElement("div");
    miNodo.classList.add("card", "col-sm-4");
    // Body
    const miNodoCardBody = document.createElement("div");
    miNodoCardBody.classList.add("card-body");
    // Titulo
    const miNodoTitle = document.createElement("h5");
    miNodoTitle.classList.add("card-title");
    miNodoTitle.textContent = info.nombre;
    // Imagen
    const miNodoImagen = document.createElement("img");
    miNodoImagen.classList.add("img-fluid");
    miNodoImagen.setAttribute("src", info.imagen);
    // Precio
    const miNodoPrecioDescuento = document.createElement("p");
    miNodoPrecioDescuento.classList.add("card-text");
    miNodoPrecioDescuento.style.display = "none";
    miNodoPrecioDescuento.id = "nodoDescuento" + i;
    console.log(miNodoPrecioDescuento);
    const miNodoPrecio = document.createElement("p");
    miNodoPrecio.classList.add("card-text");
    miNodoPrecio.textContent = `${info.precio}${divisa}`;
    miNodoPrecio.id = "nodoPrecio" + i++;
    // Boton
    const miNodoBoton = document.createElement("button");
    miNodoBoton.classList.add("btn", "btn-primary");
    miNodoBoton.textContent = "+";
    miNodoBoton.setAttribute("marcador", info.id);
    miNodoBoton.addEventListener("click", anyadirProductoAlCarrito);
    // Insertamos
    miNodoCardBody.appendChild(miNodoImagen);
    miNodoCardBody.appendChild(miNodoTitle);
    miNodoCardBody.appendChild(miNodoPrecio);
    miNodoCardBody.appendChild(miNodoPrecioDescuento);
    miNodoCardBody.appendChild(miNodoBoton);
    miNodo.appendChild(miNodoCardBody);
    DOMitems.appendChild(miNodo);
  });
}

/**
 * Evento para añadir un producto al carrito de la compra
 */
function anyadirProductoAlCarrito(evento) {
  // Anyadimos el Nodo a nuestro carrito
  carrito.push(evento.target.getAttribute("marcador"));
  // Actualizamos el carrito
  renderizarCarrito();
}

/**
 * Dibuja todos los productos guardados en el carrito
 */
function renderizarCarrito() {
  // Vaciamos todo el html
  DOMcarrito.textContent = "";
  // Quitamos los duplicados
  const carritoSinDuplicados = [...new Set(carrito)];
  // Generamos los Nodos a partir de carrito
  carritoSinDuplicados.forEach((item) => {
    // Obtenemos el item que necesitamos de la variable base de datos
    const miItem = baseDeDatos.filter((itemBaseDatos) => {
      // ¿Coincide las id? Solo puede existir un caso
      return itemBaseDatos.id === parseInt(item);
    });
    // Cuenta el número de veces que se repite el producto
    const numeroUnidadesItem = carrito.reduce((total, itemId) => {
      // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
      return itemId === item ? (total += 1) : total;
    }, 0);
    console.log;
    // Creamos el nodo del item del carrito
    const miNodo = document.createElement("li");
    miNodo.classList.add("list-group-item", "text-right", "mx-2");
    if (usuario != null) {
      if (usuario.getTipo() == 1) {
        console.log(usuario);
        miNodo.textContent = `${numeroUnidadesItem} x ${
          miItem[0].nombre
        } - ${Math.round(miItem[0].precio * 0.85)}${divisa}`;
      } else if (usuario.getTipo() == 2) {
        console.log(usuario);
        miNodo.textContent = `${numeroUnidadesItem} x ${
          miItem[0].nombre
        } - ${Math.round(miItem[0].precio * 0.75)}${divisa}`;
      }
    } else {
      miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;
    }

    // Boton de borrar
    const miBoton = document.createElement("button");
    miBoton.classList.add("btn", "btn-danger", "mx-5");
    miBoton.textContent = "X";
    miBoton.style.marginLeft = "1rem";
    miBoton.dataset.item = item;
    miBoton.addEventListener("click", borrarItemCarrito);
    // Mezclamos nodos
    miNodo.appendChild(miBoton);
    DOMcarrito.appendChild(miNodo);
  });
  // Renderizamos el precio total en el HTML
  DOMtotal.textContent = calcularTotal();
}

/**
 * Evento para borrar un elemento del carrito
 */
function borrarItemCarrito(evento) {
  // Obtenemos el producto ID que hay en el boton pulsado
  const id = evento.target.dataset.item;
  // Borramos todos los productos
  carrito = carrito.filter((carritoId) => {
    return carritoId !== id;
  });
  // volvemos a renderizar
  renderizarCarrito();
}

/**
 * Calcula el precio total teniendo en cuenta los productos repetidos
 */
function calcularTotal() {
  // Recorremos el array del carrito
  return carrito
    .reduce((total, item) => {
      // De cada elemento obtenemos su precio
      const miItem = baseDeDatos.filter((itemBaseDatos) => {
        return itemBaseDatos.id === parseInt(item);
      });
      // Los sumamos al total
      if (usuario != null) {
        if (usuario.getTipo() == 1) {
          console.log(usuario);
          return total + Math.round(miItem[0].precio * 0.85);
        } else if (usuario.getTipo() == 2) {
          console.log(usuario);
          return total + Math.round(miItem[0].precio * 0.75);
        }
      } else {
        return total + miItem[0].precio;
      }
    }, 0)
    .toFixed(2);
}

/**
 * Varia el carrito y vuelve a dibujarlo
 */
function vaciarCarrito() {
  if (carrito.length > 0) {
    let confirmar_carrito = confirm(
      "Estás seguro de que quieres vaciar el carrito ????"
    );
    if (confirmar_carrito) {
      // Limpiamos los productos guardados
      carrito = [];
    }
  } else {
    carrito = [];
  }
  // Renderizamos los cambios
  renderizarCarrito();
}

// Eventos
let user1 = new Usuario(
  "1",
  "nicolasrp",
  "Nicolas Rosende Perez",
  "698154142",
  "2",
  "abc123."
);
let user2 = new Usuario(
  "2",
  "danielaft",
  "Daniela Franco Turchi",
  "123456789",
  "1",
  "abc123."
);
let usuarios = [user1, user2];
for (let index = 0; index < localStorage.length; index++) {
  let usuario = localStorage.getItem(localStorage.key(index));
  console.log(JSON.parse(usuario).contrasenya);
  usuario = JSON.parse(usuario);
  usuario = new Usuario(
    usuario.id,
    usuario.username,
    usuario.nombre,
    usuario.telefono,
    usuario.tipo,
    usuario.contrasenya
  );
  usuarios.push(usuario);
  console.log(usuarios);
}
var ventana;
let carrito = [];
let usuario = null;
const divisa = "€";
const DOMitems = document.querySelector("#items");
const DOMcarrito = document.querySelector("#carrito");
const DOMtotal = document.querySelector("#total");
const DOMbotonVaciar = document.querySelector("#boton-vaciar");
const DOMbotonlogin = document.querySelector("#login");
const DOMbotonRegistro = document.querySelector("#enviarRegistro");
const DOMdivRegistro = document.querySelector("#div_registro");
const DOMaMostrarRegistro = document.querySelector("#mostrarRegistro");
const DOMbotonComprar = document.querySelector("#boton-confirmar");
DOMdivRegistro.style.display = "none";
console.log(DOMbotonVaciar);
DOMbotonVaciar.addEventListener("click", vaciarCarrito);
DOMbotonlogin.addEventListener("click", iniciarSesion);
DOMbotonComprar.addEventListener("click", carritoComprar);
DOMaMostrarRegistro.addEventListener("click", function () {
  DOMdivRegistro.style.display = "block";
});
DOMbotonRegistro.addEventListener("click", registro);
// Inicio
renderizarProductos();
renderizarCarrito();
