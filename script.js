// Se definen objetos para las calidades de construccion
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

// Se seleccionan los elementos del formulario
const metrosCuadrados = document.getElementById("metros-cuadrados");
const calidadMateriales = document.getElementById("calidad-materiales");
const presupuesto = document.getElementById("presupuesto");
const resultado = document.getElementById("resultado");
const mensaje = document.getElementById("mensaje");
const detalle = document.getElementById("detalle");

// Se define la función para calcular el costo total y guardar el proyecto
function calcularCosto() {
    const metros = parseInt(metrosCuadrados.value);
    const calidad = parseInt(calidadMateriales.value);
    const dinero = parseInt(presupuesto.value);

    const materialSeleccionado = materiales.find(material => material.calidad === calidad);
    const costoMaterial = materialSeleccionado.costoPorMetroCuadrado;
    const costoTotal = metros * costoMaterial;

    const proyecto = {
        metros: metros,
        calidad: calidad,
        presupuesto: dinero,
        costoTotal: costoTotal
    };

    // Guardar el proyecto en el almacenamiento local
    localStorage.setItem("proyecto", JSON.stringify(proyecto));

    if (costoTotal > dinero) {
        mensaje.innerText = "Lo sentimos, no tienes suficiente dinero para construir";
        detalle.innerText = `Necesitas $${costoTotal - dinero} pesos más.`;
    } else {
        mensaje.innerText = "¡Felicidades! Puedes construir tu casa";
        detalle.innerText = `El costo total de los materiales será de $${costoTotal} pesos.`;
    }

    resultado.classList.remove("d-none");
}

// Se agrega el evento submit al formulario
const form = document.querySelector("form");
form.addEventListener("submit", function (event) {
    event.preventDefault();
    calcularCosto();
});

// Recuperar el proyecto guardado al cargar la página
document.addEventListener("DOMContentLoaded", function () {
    const proyectoGuardado = localStorage.getItem("proyecto");
    if (proyectoGuardado) {
        const proyecto = JSON.parse(proyectoGuardado);
        const metros = proyecto.metros;
        const calidad = proyecto.calidad;
        const dinero = proyecto.presupuesto;
        const costoTotal = proyecto.costoTotal;

        metrosCuadrados.value = metros;
        calidadMateriales.value = calidad;
        presupuesto.value = dinero;

        calcularCosto();
    }
});
