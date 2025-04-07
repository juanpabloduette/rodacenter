/* MENU */

document.getElementById("btn_menu").addEventListener("click", mostrar_menu);
document.getElementById("back_menu").addEventListener("click", ocultar_menu);
document.getElementById("close").addEventListener("click", ocultar_menu);

nav = document.getElementById("nav");
background_menu = document.getElementById("back_menu");

function mostrar_menu() {
	nav.style.right = "0px";
	background_menu.style.display = "block";
}

function ocultar_menu() {
	nav.style.right = "-250px";
	background_menu.style.display = "none";
}

// APENAS BAJA EL SCROLL PONE BACKGROUND AL MENU

window.addEventListener("scroll", function () {
	let header = document.querySelector("header");
	header.classList.toggle("header__abajo", window.scrollY > 0);

	//Menu a en colores con dropdown
	const greyMenuDown = document.querySelectorAll("a.gris");
	for (let item of greyMenuDown) {
		item.classList.toggle("header__abajo__menu", window.scrollY > 0);
	}

	const book = document.querySelector("li.book");
	book.classList.toggle("header__abajo__book", window.scrollY > 0);

	const buttonBars = document.getElementById("btn_menu");
	buttonBars.classList.toggle("buttonbars", window.scrollY > 0);

	const logo = document.querySelector(".logo");
	logo.classList.toggle("header__abajo__logo", window.scrollY > 0);

	const svgConsultas = document.getElementById("svg-consultas");

	if (window.scrollY === 0) {
		svgConsultas.setAttribute("fill", "#e7af18");
	} else {
		svgConsultas.setAttribute("fill", "#3b3b3a");
	}
});

// APENAS BAJA LA IMAGEN BAJA MAS LENTA

// Seleccionamos la imagen
// const image = document.querySelector(".image");

// Evento de scroll
// window.addEventListener("scroll", () => {
// 	// Calculamos el valor basado en el scroll actual
// 	const scrollY = window.scrollY;
// 	// Aplicamos el movimiento hacia abajo
// 	image.style.transform = `translate(0, ${scrollY * 0.5}px)`;
// });

// SLIDER TOP
const slides = document.querySelectorAll(".slider .slide");
let currentIndex = 0;

function showNextSlide() {
	const currentSlide = slides[currentIndex];
	const nextIndex = (currentIndex + 1) % slides.length;
	const nextSlide = slides[nextIndex];

	// Paso 1: La diapositiva actual sale hacia la izquierda
	currentSlide.classList.remove("active");
	currentSlide.classList.add("exit-left");

	// Paso 2: Después de la transición, reiniciar la posición de la diapositiva saliente
	setTimeout(() => {
		currentSlide.classList.remove("exit-left");
	}, 500); // Duración de la transición

	// Paso 3: Activar la siguiente diapositiva
	setTimeout(() => {
		nextSlide.classList.add("active");
	}, 500); // Tiempo necesario para sincronizar con la animación

	// Actualizar el índice actual
	currentIndex = nextIndex;
}

// Inicia el slider con un loop infinito
setInterval(showNextSlide, 3000); // Cambia el intervalo si lo necesitas

/*MODAL POP UP*/

let modal = document.querySelector(".modal");
let trigger = document.querySelector(".trigger");
let closeButton = document.querySelector(".close-button");

function toggleModal() {
	modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
	if (event.target === modal) {
		toggleModal();
	}
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

// FORMULARIO
const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input, textarea");

const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s-Z0-9]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^([0-9]){1,20}$/, // Solo números
	mensaje: /^[a-zA-ZÀ-ÿ\d\S\s]{1,120}$/,
};

const campos = {
	nombre: false,
	correo: false,
	telefono: false,
	mensaje: false,
};

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "nombre":
			validarCampo(expresiones.nombre, e.target, "nombre");
			break;
		case "correo":
			validarCampo(expresiones.correo, e.target, "correo");
			break;
		case "telefono":
			validarCampo(expresiones.telefono, e.target, "telefono");
			break;
		case "mensaje":
			validarCampo(expresiones.mensaje, e.target, "mensaje");
			break;
	}
};

const validarCampo = (expresion, input, campo) => {
	if (expresion.test(input.value) && input.value.trim() != "") {
		document
			.getElementById(`grupo__${campo}`)
			.classList.remove("formulario__grupo-incorrecto");
		document
			.getElementById(`grupo__${campo}`)
			.classList.add("formulario__grupo-correcto");
		// document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrectoo');
		// document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correctoo');
		document.querySelector(`#grupo__${campo} i`).classList.add("fa-check-circle");
		document
			.querySelector(`#grupo__${campo} i`)
			.classList.remove("fa-times-circle");
		document
			.querySelector(`#grupo__${campo} .formulario__input-error`)
			.classList.remove("formulario__input-error-activo");
		campos[campo] = true;
	} else {
		document
			.getElementById(`grupo__${campo}`)
			.classList.add("formulario__grupo-incorrecto");
		document
			.getElementById(`grupo__${campo}`)
			.classList.remove("formulario__grupo-correcto");
		document.querySelector(`#grupo__${campo} i`).classList.add("fa-times-circle");
		document
			.querySelector(`#grupo__${campo} i`)
			.classList.remove("fa-check-circle");
		document
			.querySelector(`#grupo__${campo} .formulario__input-error`)
			.classList.add("formulario__input-error-activo");
		campos[campo] = false;
	}
};

inputs.forEach((input) => {
	input.addEventListener("keyup", validarFormulario);
	input.addEventListener("blur", validarFormulario);
});

formulario.addEventListener("submit", (e) => {
	e.preventDefault();

	if (campos.nombre && campos.correo && campos.telefono && campos.mensaje) {
		document
			.getElementById("formulario__mensaje-exito")
			.classList.add("formulario__mensaje-exito-activo");
		setTimeout(() => {
			document
				.getElementById("formulario__mensaje-exito")
				.classList.remove("formulario__mensaje-exito-activo");
		}, 5000);

		formulario.submit();
		formulario.reset();

		document.querySelectorAll(".formulario__grupo-correcto").forEach((icono) => {
			icono.classList.remove("formulario__grupo-correcto");
		});
	} else {
		document
			.getElementById("formulario__mensaje")
			.classList.add("formulario__mensaje-activo");
		setTimeout(() => {
			document
				.getElementById("formulario__mensaje")
				.classList.remove("formulario__mensaje-activo");
		}, 5000);
	}
});

// FORMULARIO

// const submitButton = document.getElementById("submit-button");

// submitButton.addEventListener("click", () => {
// 	submitButton.innerHTML = `
// 					<button type="submit" class="formulario__btn" id="submit-button" disabled>Enviar</button>
// 										`;
// });

// API BUSQUEDA

const form = document.getElementById("buscar-form");
const resultadoDiv = document.getElementById("resultado");
const comunicarteCon = document.getElementById("comunicartecon");

form.addEventListener("submit", async (event) => {
	event.preventDefault();
	const valorInt = document.getElementById("valorint").value;
	const valorExt = document.getElementById("valorext").value;
	const valorAncho = document.getElementById("valorancho").value;
	const articulo = document.querySelector(
		'input[name="articulo"]:checked'
	)?.value;
	const valor = valorInt + "x" + valorExt + "x" + valorAncho;
	const btnBuscador = document.getElementById("btnbuscador");
	const valorMm = `${valorInt}mm x ${valorExt}mm x ${valorAncho}mm `;

	if (!articulo) {
		return alert("Seleccione un articulo");
	}

	try {
		btnBuscador.textContent = "buscando";
		btnBuscador.disabled = true;
		// Envía los datos al servidor
		const response = await fetch("http://localhost:4500/buscar", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ valor, articulo }),
		});

		const data = await response.json();

		// Muestra el resultado en el frontend
		resultadoDiv.textContent =
			data.mensaje +
			" " +
			"trabajamos " +
			data.cantidad +
			" unidades de " +
			articulo +
			" con medidas:" +
			valorMm;
		btnBuscador.textContent = "Buscar";
		btnBuscador.disabled = false;
		// Aquí puedes realizar otra acción con el valor
		if (data.mensaje.includes("Sí")) {
			comunicarteCon.classList.add("show");
			comunicarteCon.textContent =
				"Sobre esta consulta podes comunicarte con nosotros por email o por whatsapp y te asesoramos";
			console.log("Realizando otra acción porque el valor fue encontrado...");
			console.log(valor);
		} else {
			console.log("Realizando otra acción porque el valor no fue encontrado...");
		}
	} catch (error) {
		console.error("Error al realizar la solicitud:", error);
		resultadoDiv.textContent = "Ocurrió un error, vuelva a intentarlo más tarde.";
	}
});

// SWIPPER

window.addEventListener("load", () => {
	const swiper = new Swiper(".swiper-home", {
		// Optional parameters
		direction: "horizontal",
		loop: true,

		// If we need pagination
		// pagination: {
		// 	el: ".swiper-pagination",
		// 	clickable: true,
		// },

		// Navigation arrows
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},

		// And if we need scrollbar
		// scrollbar: {
		// 	el: ".swiper-scrollbar",
		// },
		autoplay: {
			delay: 8000,
		},
	});
});

// BOTON ARRIBA

// BOTON IR ARRIBA

document.getElementById("button-up").addEventListener("click", scrollUp);

function scrollUp() {
	var currentScroll = document.documentElement.scrollTop;

	if (currentScroll > 0) {
		window.requestAnimationFrame(scrollUp);
		window.scrollTo(0, currentScroll - currentScroll / 20);
		buttonUpp.style.transform = "scale(0)";
	}
}

// SCROLL DE BOTON IR ARRIBA
buttonUpp = document.getElementById("button-up");

window.onscroll = function () {
	var scroll = document.documentElement.scrollTop;

	if (scroll > 100) {
		buttonUpp.style.transform = "scale(1)";
	} else if (scroll < 100) {
		buttonUpp.style.transform = "scale(0)";
	}
};

//scrollsmooth jquery

// CODIGO PARA SCROLL SMOOTH CON MOVIMIENTO
$(document).ready(function () {
	// Add smooth scrolling to all links
	$("a").on("click", function (event) {
		// Make sure this.hash has a value before overriding default behavior
		if (this.hash !== "") {
			// Prevent default anchor click behavior
			event.preventDefault();

			// Store hash
			var hash = this.hash;

			// Using jQuery's animate() method to add smooth page scroll
			// The optional number (500) specifies the number of milliseconds it takes to scroll to the specified area
			$("html, body").animate(
				{
					scrollTop: $(hash).offset().top - 60, // Restar 60 píxeles al desplazamiento
				},
				500,
				function () {
					// Update the URL without jumping to the anchor
					history.replaceState(null, null, hash);
				}
			);
		} // End if
	});
});
