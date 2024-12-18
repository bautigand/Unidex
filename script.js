const conversiones = {
    longitud: {
        metros: 1,
        kilometros: 0.001,
        centimetros: 100,
        milimetros: 1000,
        millas: 0.000621371,
        yardas: 1.09361,
        pies: 3.28084
    },
    masa: {
        gramos: 1,
        kilogramos: 0.001,
        libras: 0.00220462,
        onzas: 0.035274
    },
    temperatura: {
        celsius: (x) => x,
        fahrenheit: (x) => (x * 9/5) + 32,
        kelvin: (x) => x + 273.15
    },
    volumen: {
        litros: 1,
        mililitros: 1000,
        galones: 0.264172,
        tazas: 4.22675,
        cucharadas: 67.628,
        onzas_liquidas: 33.814
    },
    velocidad: {
        "m/s": 1,
        "km/h": 3.6,
        "mph": 2.23694,
        "ft/s": 3.28084
    },
    area: {
        "m²": 1,
        "km²": 1e-6,
        "ha": 0.0001,
        "ft²": 10.7639,
        "ac": 0.000247105
    },
    energia: {
        "J": 1,
        "cal": 0.239006,
        "kcal": 0.000239006,
        "eV": 6.242e+18
    },
    presion: {
        "Pa": 1,
        "atm": 9.86923e-6,
        "bar": 1e-5,
        "mmHg": 0.00750062,
        "psi": 0.000145038
    },
    tiempo: {
        "s": 1,
        "min": 1/60,
        "h": 1/3600,
        "d": 1/86400,
        "w": 1/604800
    }
};

function convertir() {
    const categoria = document.getElementById("categoria").value;
    const unidadDesde = document.getElementById("unidadDesde").value;
    const unidadHasta = document.getElementById("unidadHasta").value;
    const cantidad = parseFloat(document.getElementById("cantidad").value);
    
    if (isNaN(cantidad)) {
        document.getElementById("resultado").textContent = "Por favor ingrese una cantidad válida.";
        return;
    }

    let resultado;
    if (categoria === "temperatura") {
        if (unidadDesde === unidadHasta) {
            resultado = cantidad;
        } else {
            if (unidadDesde === "celsius") {
                resultado = unidadHasta === "fahrenheit" ? conversiones.temperatura.fahrenheit(cantidad) : conversiones.temperatura.kelvin(cantidad);
            } else if (unidadDesde === "fahrenheit") {
                resultado = unidadHasta === "celsius" ? (cantidad - 32) * 5 / 9 : conversiones.temperatura.kelvin((cantidad - 32) * 5 / 9);
            } else if (unidadDesde === "kelvin") {
                resultado = unidadHasta === "celsius" ? cantidad - 273.15 : (cantidad - 273.15) * 9 / 5 + 32;
            }
        }
    } else {
        resultado = cantidad * conversiones[categoria][unidadHasta] / conversiones[categoria][unidadDesde];
    }

    // Mostrar el resultado con la unidad
    document.getElementById("resultado").textContent = `Resultado: ${resultado} ${unidadHasta.charAt(0).toUpperCase() + unidadHasta.slice(1)}`;
}

function actualizarUnidades() {
    const categoria = document.getElementById("categoria").value;
    const unidadesDesde = document.getElementById("unidadDesde");
    const unidadesHasta = document.getElementById("unidadHasta");

    // Limpiar las opciones anteriores
    unidadesDesde.innerHTML = "";
    unidadesHasta.innerHTML = "";

    // Agregar las nuevas unidades según la categoría seleccionada
    let unidades = Object.keys(conversiones[categoria]);
    
    unidades.forEach(unidad => {
        let optionDesde = document.createElement("option");
        optionDesde.value = unidad;
        optionDesde.textContent = unidad.charAt(0).toUpperCase() + unidad.slice(1);
        unidadesDesde.appendChild(optionDesde);

        let optionHasta = document.createElement("option");
        optionHasta.value = unidad;
        optionHasta.textContent = unidad.charAt(0).toUpperCase() + unidad.slice(1);
        unidadesHasta.appendChild(optionHasta);
    });
}

// Inicializar las unidades por defecto
window.onload = function() {
    actualizarUnidades();
};
