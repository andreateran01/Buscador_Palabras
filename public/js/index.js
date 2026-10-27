document.addEventListener("DOMContentLoaded", () => {
    const textoEntrada = document.getElementById("textoEntrada");
    const campoBuscar = document.getElementById("campoBuscar");
    const campoReemplazar = document.getElementById("campoReemplazar");
    const botonBuscar = document.getElementById("botonBuscar");
    const botonReemplazar = document.getElementById("botonReemplazar");
    const botonLimpiar = document.getElementById("botonLimpiar");
    const contadorCoincidencias = document.getElementById("contadorCoincidencias");
    const contenedorSalida = document.getElementById("contenedorSalida");

    const contenedorAlerta = document.getElementById("contenedorAlerta");
    const cajaAlerta = document.getElementById("cajaAlerta");
    const mensajeAlerta = document.getElementById("mensajeAlerta");

    const mostrarAlerta = (mensaje, tipo = "danger") => {
        mensajeAlerta.textContent = mensaje;
        if (tipo === "danger") {
            cajaAlerta.className = "alert alert-danger fw-bold text-center py-3";
        } else {
            cajaAlerta.className = "alert alert-success fw-bold text-center py-3";
        }
        contenedorAlerta.style.display = "block";
    };

    const ocultarAlerta = () => {
        contenedorAlerta.style.display = "none";
    };

    const escaparExpresionRegular = (cadena) => {
        return cadena.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    };

    const escaparHtml = (texto) => {
        return texto
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    };

    const manejarBusqueda = () => {
        const valorTexto = textoEntrada.value;
        const terminoBusqueda = campoBuscar.value.trim();

        if (!valorTexto && !terminoBusqueda) {
            mostrarAlerta("Por favor, ingresa el texto base y la palabra o carácter a buscar.");
            return;
        }
        if (!valorTexto) {
            mostrarAlerta("El campo de texto base está vacío.");
            return;
        }
        if (!terminoBusqueda) {
            mostrarAlerta("Por favor, ingresa una palabra o carácter para realizar la búsqueda.");
            return;
        }

        ocultarAlerta();

        const terminoEscapado = escaparExpresionRegular(terminoBusqueda);
        const expresionRegular = new RegExp(`(${terminoEscapado})`, 'gi');

        const coincidencias = valorTexto.match(expresionRegular);
        const total = coincidencias ? coincidencias.length : 0;

        contadorCoincidencias.textContent = total;

        if (total === 0) {
            mostrarAlerta(`No se encontraron coincidencias para "${terminoBusqueda}".`);
            contenedorSalida.innerHTML = `<span>${escaparHtml(valorTexto)}</span>`;
            return;
        }

        const textoResaltado = escaparHtml(valorTexto).replace(expresionRegular, `<mark class="bg-warning fw-bold px-1 rounded">$1</mark>`);

        contenedorSalida.innerHTML = textoResaltado;
        mostrarAlerta(`Se encontraron ${total} coincidencia(s) exitosamente.`, "success");
    };

    const manejarReemplazo = () => {
        const valorTexto = textoEntrada.value;
        const terminoBusqueda = campoBuscar.value.trim();
        const terminoReemplazo = campoReemplazar.value;

        if (!valorTexto) {
            mostrarAlerta("El campo de texto base está vacío.");
            return;
        }
        if (!terminoBusqueda) {
            mostrarAlerta("Por favor, ingresa la palabra o carácter que deseas reemplazar.");
            return;
        }

        ocultarAlerta();

        const terminoEscapado = escaparExpresionRegular(terminoBusqueda);
        const expresionRegular = new RegExp(terminoEscapado, 'gi');

        const coincidencias = valorTexto.match(expresionRegular);
        const total = coincidencias ? coincidencias.length : 0;

        contadorCoincidencias.textContent = total;

        if (total === 0) {
            mostrarAlerta(`No se encontraron coincidencias de "${terminoBusqueda}" para reemplazar.`);
            contenedorSalida.innerHTML = `<span>${escaparHtml(valorTexto)}</span>`;
            return;
        }

        const terminoReemplazoEscapado = escaparHtml(terminoReemplazo);
        const textoReemplazadoHtml = escaparHtml(valorTexto).replace(
            expresionRegular,
            `<mark class="bg-info text-white fw-bold px-1 rounded">${terminoReemplazoEscapado}</mark>`
        );

        contenedorSalida.innerHTML = textoReemplazadoHtml;
        mostrarAlerta(`Se reemplazaron ${total} coincidencia(s) exitosamente.`, "success");
    };

    const manejarLimpieza = () => {
        textoEntrada.value = "";
        campoBuscar.value = "";
        campoReemplazar.value = "";
        contadorCoincidencias.textContent = "0";
        contenedorSalida.innerHTML = `<span class="text-muted fst-italic">El resultado aparecerá aquí...</span>`;
        ocultarAlerta();
        textoEntrada.focus();
    };

    if (botonBuscar) {
        botonBuscar.addEventListener("click", manejarBusqueda);
    }

    if (botonReemplazar) {
        botonReemplazar.addEventListener("click", manejarReemplazo);
    }

    if (botonLimpiar) {
        botonLimpiar.addEventListener("click", manejarLimpieza);
    }
});