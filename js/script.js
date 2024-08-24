// Slider
$(document).ready(function () {
    // Se ejecuta método slick sobre el elemento con clase slider
    $('.slider').slick({
        // Deshabilita los puntos
        dots: false,
        // Loop infinito de slides (ej. después de la última slide vuelve a mostrar la primera)
        infinite: true,
        // Velocidad de la transición
        speed: 300,
        // Transición tipo fade
        fade: true,
        // Slides se cambian de manera automática
        autoplay: true,
        // Duración de las slides
        autoplaySpeed: 5000,
    });
});

// Form
// Localidad

// Elemento con id loc
const locs = document.getElementById('loc');
// Elemento con id dpto
const dptos = document.getElementById('dpto');
// Placeholder de lista de localidades
const locPlaceholder = `<option value="" disabled selected>Localidad</option>`;
// Cadena para elementos de la lista de departamentos
let dptosStr = "";
// Cadena para elementos de la lista de localidades
let locsStr = "";
// Arreglo para elementos de la lista de localidades
let locsArray = [];


// Recorre las propiedades del objeto dptosLocs
for (const departamento in dptosLocs) {
    // Agrega a dptoStr los elementos de la lista
    dptosStr += `<option value="${departamento}">${departamento}</option>`;
    // Ejecuta si el objeto dptosLocs contiene la propiedad departamento
    if (Object.hasOwnProperty.call(dptosLocs, departamento)) {
        // Arreglo con localidades de departamento
        const dptoLocsArray = dptosLocs[departamento]
        // Recorre elementos de arreglo dptoLocsArray
        for (const localidad of dptoLocsArray) {
            // Agrega a locsStr los elementos de la lista
            locsStr += `<option value="${localidad}">${localidad}</option>`;
            // Agrega a locsArray los elementos de la lista
            locsArray[locsArray.length] = localidad;
        }
    }
}

// Agrega elementos hijo al elemento con id dpto
dptos.innerHTML += dptosStr;
// Agrega elementos hijo al elemento con id loc
locs.innerHTML += locsStr;

// Función que se ejecuta cuando se hace un cambio en la lista de departamentos
const showLocs = () => {
    // Elemento seleccionado de la lista de departamentos
    const selectedDpto = dptos.value;
    // Cadena de localidades de departamento
    let deptoLocsStr = "";
    // Ejecuta si el objeto dptosLocs contiene la propiedad departamento y si selectedDpto no es un string vacío
    if (Object.hasOwnProperty.call(dptosLocs, selectedDpto) || selectedDpto !== "") {
        // Arreglo de localidades del departamento seleccionado
        const locsArray = dptosLocs[selectedDpto]
        // Recorre los elementos del arreglo de localidades del departamento seleccionado
        for (const localidad of locsArray) {
            // Agrega a deptoLocsStr los elementos de la lista
            deptoLocsStr += `<option value="${localidad}">${localidad}</option>`;
        }
        // Agrega elementos hijo al elemento con id loc
        locs.innerHTML = locPlaceholder + deptoLocsStr;
    }
    // Ejecuta si selectedDpto es un string vacío
    else if (selectedDpto === "") {
        // Agrega elementos hijo al elemento con id loc
        locs.innerHTML = locPlaceholder + locsStr;
    }
}

// Función que se ejecuta cuando se hace un cambio en la lista de localidades
const showDpto = () => {
    // Elemento seleccionado de la lista de localidades
    const selectedLoc = locs.value;
    // Departamentos
    const dptosLocsKeys = Object.keys(dptosLocs)
    // Busca departamento que corresponde a la localidad seleccionada
    dptosLocsKeys.find(key => {
        // Recorre los elementos del departamento de la localidad seleccionada
        for (const loc of dptosLocs[key]) {
            // Selecciona el departamento en la lista de departamentos de acuerdo a la localidad seleccionada
            loc === selectedLoc && (dptos.value = key);
        }
    });
}

// Validación

// Elementos con id form
const form = document.getElementById('form');
// Elementos con id firstname
const firstName = document.getElementById('firstname');
// Elementos con id secondname
const secondName = document.getElementById('secondname');
// Elementos con id email
const eMail = document.getElementById('email');
// Elementos con id email
const ci = document.getElementById('ci');
// Elementos con id terms
const terms = document.getElementById('terms');


// Agrega la clase form-control y error al padre del input
const showError = (input, message) => {
    // Elemento padre de input
    const formControl = input.parentElement;
    // Agregar clases form-control y error
    !formControl.classList.contains("error") && formControl.classList.add("error");
    // Elemento small dentro de formControl (elemento padre de input)
    const small = formControl.querySelector('small');
    // Agregar mensaje a small
    small.innerText = message;
}

// Validación de Email
const checkEmail = (input) => {
    // Expresión regular con el formato de correo admitido
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // Ejecuta si el valor del input no se corresponde con el formato de correo admitido
    if (!re.test(input.value.trim())) {
        // Muestra mensaje de error
        showError(input, 'e-Mail no válido');
    } 
}
const checkTerms = (input) => {
    !input.checked && showError(input, 'Debe aceptar las bases y condiciones')
}

const checkCI = (input) => {
    !validarCedula(input.value) && showError(input, 'Cédula no válida');
}

// Validación de campos
const checkRequired = (inputArr) => {
    // Aplica condición a cada elemento del input
    inputArr.forEach((input) => {
        // Nombre del campo
        const fieldName = input.name;
        // Ejecuta si el valor del elemento es vacío
        if (input.value.trim() === '') {
            // Muestra mensaje de error
            showError(input, `Se requiere ${fieldName}`);
        }
    });
}

// Valida cantidad de caracteres
function checkLength(input, min, max) {
    const fieldName = getFieldName(input.name);
    // Ejecuta si la cantidad de caracteres del input es menor a min
    if (input.value.length < min) {
        showError(input, `${fieldName} debe ser de al menos ${min} caracteres`);
    }
    // Ejecuta si la cantidad de caracteres del input es menor a min    
    else if (input.value.length > max) {
        showError(input, `${fieldName} debe ser de menos de ${max} caracteres`);
    }
}

// Obtener nombre del campo y cambiar la primer letra a mayúscula
function getFieldName(input) {
    return input.charAt(0).toUpperCase() + input.slice(1);
}

// Arreglo de elementos
const elementsArray = [firstName, secondName, dptos, locs, ci, eMail];

//Event Listeners

// Evento que se ejecuta cuando se hace submit en el formulrio
form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkRequired(elementsArray);
    checkLength(firstName,2,15);
    checkLength(secondName,2,15);
    checkEmail(eMail);
    checkCI(ci);
    checkTerms(terms);
});

// Evento que se ejecuta cuando se hace foco en los elementos de elementsArray
[terms, ...elementsArray].forEach(element => {
    element.addEventListener('focus', (e) => {
        const formControl = e.target.parentElement;
        formControl.classList.contains("error") && formControl.classList.remove("error");
    });
});