document.addEventListener("DOMContentLoaded", () => {
    const inputText = document.getElementById("inputText");
    const inputSearch = document.getElementById("inputSearch");
    const btnSearch = document.getElementById("btnSearch");
    const btnClean = document.getElementById("btnClean");
    const matchCount = document.getElementById("matchCount");
    const outputContainer = document.getElementById("outputContainer");
    
    const alertContainer = document.getElementById("alertContainer");
    const alertBox = document.getElementById("alertBox");
    const alertMessage = document.getElementById("alertMessage");

    const showAlert = (message, type = "danger") => {
        alertMessage.textContent = message;
        if (type === "danger") {
            alertBox.className = "alert alert-danger fw-bold text-center py-3";
        } else {
            alertBox.className = "alert alert-success fw-bold text-center py-3";
        }
        alertContainer.style.display = "block";
    };

    const hideAlert = () => {
        alertContainer.style.display = "none";
    };

    const escapeRegExp = (string) => {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    };

    const handleSearch = () => {
        const textValue = inputText.value;
        const searchTerm = inputSearch.value.trim();

        if (!textValue && !searchTerm) {
            showAlert("Por favor, ingresa el texto base y la palabra o carácter a buscar.");
            return;
        }
        if (!textValue) {
            showAlert("El campo de texto base está vacío.");
            return;
        }
        if (!searchTerm) {
            showAlert("Por favor, ingresa una palabra o carácter para realizar la búsqueda.");
            return;
        }

        hideAlert();

        const escapedTerm = escapeRegExp(searchTerm);
        const regex = new RegExp(`(${escapedTerm})`, 'gi');

        const matches = textValue.match(regex);
        const count = matches ? matches.length : 0;

        matchCount.textContent = count;

        if (count === 0) {
            showAlert(`No se encontraron coincidencias para "${searchTerm}".`);
            outputContainer.innerHTML = `<span>${escapeHtml(textValue)}</span>`;
            return;
        }

        const highlightedText = escapeHtml(textValue).replace(regex, `<mark class="bg-warning fw-bold px-1 rounded">$1</mark>`);
        
        outputContainer.innerHTML = highlightedText;
        showAlert(`Se encontraron ${count} coincidencia(s) exitosamente.`, "success");
    };

    const handleClean = () => {
        inputText.value = "";
        inputSearch.value = "";
        matchCount.textContent = "0";
        outputContainer.innerHTML = `<span class="text-muted fst-italic">El resultado aparecerá aquí...</span>`;
        hideAlert();
        inputText.focus();
    };

    const escapeHtml = (text) => {
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    };

    if (btnSearch) {
        btnSearch.addEventListener("click", handleSearch);
    }

    if (btnClean) {
        btnClean.addEventListener("click", handleClean);
    }
});