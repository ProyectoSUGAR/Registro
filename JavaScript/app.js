// espera a que todo el contenido html se haya cargado
document.addEventListener("DOMContentLoaded", () => {

  // obtiene el formulario por su id
  const form = document.getElementById("formulario");

  // obtiene el contenedor donde se mostrarán mensajes de error
  const contenedor = document.getElementById("alertaContenedor");

  // función que crea y muestra un mensaje de alerta visual
  function mostrarMensaje(texto) {
    const alerta = document.createElement("p");
    alerta.textContent = texto;
    alerta.style.background = "#E3C39D";
    alerta.style.color = "#071739";
    alerta.style.padding = "10px";
    alerta.style.borderRadius = "6px";
    alerta.style.marginTop = "10px";
    alerta.style.fontWeight = "bold";
    contenedor.appendChild(alerta);

    // elimina la alerta luego de 5 segundos
    setTimeout(function () {
      contenedor.removeChild(alerta);
    }, 5000);
  }

  // función que cuenta las vocales en el nombre ingresado
  function contarVocales(nombre) {
    let cantL = 0;
    for (let i = 0; i < nombre.length; i++) {
      if ("aeiouAEIOU".includes(nombre[i])) {
        cantL++;
      }
    }
    return cantL;
  }

  // función para validar si la contraseña es segura
  function validarPassword(pass) {
    if (!(pass.length >= 6 && /[A-Z]/.test(pass) && /[a-z]/.test(pass) && /[0-9]/.test(pass))) {
      mostrarMensaje("la contraseña debe tener al menos 6 caracteres, una mayúscula, una minúscula y un número");
      return false;
    }
    return true;
  }

  // evento que se ejecuta al enviar el formulario
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // evita el envío del formulario por defecto

    // obtiene y limpia los valores de cada campo
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmar = document.getElementById("confirmaPassword").value;
    const edad = document.getElementById("edad").value;
    const tipoUsuario = document.getElementById("tipoUsuario").value;

    // validación del nombre: al menos 3 letras
    let letras = nombre.match(/[a-zA-Z]/g);
    if (!letras || letras.length < 3) {
      mostrarMensaje("el nombre debe tener al menos 3 letras");
      return;
    }

    // validación del apellido: al menos 3 letras
    let letrasApellido = apellido.match(/[a-zA-Z]/g);
    if (!letrasApellido || letrasApellido.length < 3) {
      mostrarMensaje("el apellido debe tener al menos 3 letras");
      return;
    }

    // validación del email: debe contener "@" y "."
    if (!email.includes("@") || !email.includes(".")) {
      mostrarMensaje("el email no tiene un formato correcto");
      return;
    }

    // validación de la contraseña usando la función creada
    if (!validarPassword(password)) return;

    // comparación de contraseñas
    if (password !== confirmar) {
      mostrarMensaje("las contraseñas son diferentes");
      return;
    }

    // validación de edad: debe ser mayor a 12
    if (edad === "" || Number(edad) <= 12) {
      mostrarMensaje("la edad debe ser mayor que 12");
      return;
    }

    // validación de selección del tipo de usuario
    if (tipoUsuario === "") {
      mostrarMensaje("debes seleccionar un tipo de usuario");
      return;
    }

    // si todas las validaciones pasan, muestra mensaje de éxito
    Swal.fire({
      icon: "success",
      title: "éxito",
      text: "formulario enviado correctamente",
      timer: 3000,
      showConfirmButton: false
    });
  });
});
