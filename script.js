// Obtener elementos del DOM
const metrosInput = document.getElementById('metros-input');
const calidadSelect = document.getElementById('calidad-select');
const presupuestoInput = document.getElementById('presupuesto-input');
const submitBtn = document.getElementById('submit-btn');
const resultadoDiv = document.getElementById('resultado');

// Definir objetos para las calidades de construcción
class Material {
    constructor(nombre, calidad, costoPorMetroCuadrado) {
        this.nombre = nombre;
        this.calidad = calidad;
        this.costoPorMetroCuadrado = costoPorMetroCuadrado;
    }
}
const materiales = [
    new Material("Basica", 1, 5000),
    new Material("Media", 2, 8000),
    new Material("Alta", 3, 12000),
];

// Función para obtener la calidad de los materiales seleccionada por el usuario
function obtenerCalidadMateriales() {
    const calidad = parseInt(calidadSelect.value);
    const materialSeleccionado = materiales.find((material) => material.calidad === calidad);
    resultadoDiv.innerHTML += `<p>Seleccionaste la calidad "${materialSeleccionado.nombre}"</p>`;
    return materialSeleccionado;
}

// Función para calcular el costo de la construcción y mostrar el resultado
function calcularCosto() {
    const metros = parseInt(metrosInput.value);
    const material = obtenerCalidadMateriales();
    const presupuesto = parseInt(presupuestoInput.value);

    let costoTotal = metros * material.costoPorMetroCuadrado;
    resultadoDiv.innerHTML += `<p>El costo de construir tu casa sera de: $${costoTotal}</p>`;

    // Evaluar si al usuario le alcanza o no el presupuesto para construir lo que desea
    if (costoTotal > presupuesto) {
        let calidadNueva = material.calidad - 1;
        const materialesDisponibles = materiales.filter((material) => material.calidad <= calidadNueva);
        const materialSeleccionado = materialesDisponibles[materialesDisponibles.length - 1];
        let metrosNuevos = Math.floor(presupuesto / materialSeleccionado.costoPorMetroCuadrado);
        costoTotal = metrosNuevos * materialSeleccionado.costoPorMetroCuadrado;
        resultadoDiv.innerHTML += `<p>No tenes suficiente presupuesto para construir con la calidad de materiales seleccionada. Podes construir una casa de ${metrosNuevos} metros cuadrados con calidad ${materialSeleccionado.nombre} por un costo de $${costoTotal}.</p>`;
    } else {
        resultadoDiv.innerHTML += `<p>Podes construir tu casa de ${metros} metros cuadrados con calidad ${material.nombre} por un costo de $${costoTotal}.</p>`;
    }
}

// Asignar la función calcularCosto al evento click del botón submit
submitBtn.onclick = () => {
    resultadoDiv.innerHTML = '';
    calcularCosto();
};