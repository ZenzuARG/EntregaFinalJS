let metaEjercicios = {};
const historialRutinas = JSON.parse(localStorage.getItem("historialRutinas")) || [];

// Mapear tipos de actividad a keywords asociadas
const actividadKeywords = {
  calistenia: ["flexiones", "sentadilla", "zancada", "fondos", "plancha", "superman", "abdominal", "burpee", "elevaciones"],
  spinning: ["ciclismo", "bici", "pedaleo", "sprint", "resistencia"],
  weightlifting: ["press", "peso muerto", "remo", "bíceps", "tríceps", "curl", "polea", "mancuerna"],
  hiit: ["jump", "burpee", "skater", "high knees", "explosiva", "squat"],
  yoga: ["guerrero", "perro", "niño", "cobra", "torsión", "saludo", "triángulo"],
  running: ["correr", "trote", "cuestas", "sprint", "descalzo"]
};

// Cargar JSON de ejercicios
fetch("./assets/rutinas.json")
  .then(res => res.json())
  .then(data => {
    metaEjercicios = data;
    document.getElementById("datosUsuario").addEventListener("submit", generarRutina);
    renderizarHistorial();
  })
  .catch(err => console.error("Error al cargar ejercicios:", err));

function generarRutina(e) {
  e.preventDefault();

  const peso = parseInt(document.getElementById("peso").value);
  const altura = parseInt(document.getElementById("altura").value);
  const edad = parseInt(document.getElementById("edad").value);
  const actividad = document.getElementById("actividad").value;

  if (!peso || !altura || !edad || !actividad) return;

  const ejerciciosFiltrados = filtrarPorActividad(actividad);
  const rutina = seleccionarRutinaVariada(ejerciciosFiltrados);
  mostrarRutina(rutina);
  guardarRutina(rutina);
}

function filtrarPorActividad(actividad) {
  const keywords = actividadKeywords[actividad] || [];
  if (keywords.length === 0) return Object.entries(metaEjercicios); // fallback: usar todos

  return Object.entries(metaEjercicios).filter(([nombre]) =>
    keywords.some(palabra => nombre.toLowerCase().includes(palabra))
  );
}

function seleccionarRutinaVariada(ejerciciosDisponibles) {
  const ultimo = historialRutinas[historialRutinas.length - 1]?.ejercicios.map(e => e.nombre) || [];
  const filtrados = ejerciciosDisponibles.filter(([nombre]) => !ultimo.includes(nombre));
  const pool = filtrados.length >= 4 ? filtrados : ejerciciosDisponibles;
  const seleccionados = shuffleArray(pool).slice(0, 4);

  return seleccionados.map(([nombre, config]) => crearEjercicio(nombre, config));
}

function crearEjercicio(nombre, config) {
  return {
    nombre,
    tipo: config.tipo,
    series: config.baseSeries,
    repeticiones: config.baseReps || config.baseTime,
    descripcion: config.descripcion || "Sin descripción disponible"
  };
}

function shuffleArray(arr) {
  return arr
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

function mostrarRutina(rutina) {
  const contenedor = document.getElementById("rutina-generada");
  contenedor.innerHTML = "<h2>Tu rutina</h2>";

  const lista = document.createElement("ul");
  lista.className = "rutina-lista";

  rutina.forEach(ej => {
    const li = document.createElement("li");
    li.className = "rutina-item";
    li.innerHTML = `
    <div class="rutina-contenido">
    <div class="texto-ejercicio">
    <strong>${ej.nombre}</strong> - ${ej.series} x ${ej.repeticiones} ${ej.tipo === "reps" ? "reps" : "seg"}
    <p>${ej.descripcion}</p>
    </div>
    <div class="checkbox-ejercicio">
      <input type="checkbox" />
    </div>
    </div>
    `;
    lista.appendChild(li);
  });

  contenedor.appendChild(lista);
}

function guardarRutina(rutina) {
  const entrada = {
    fecha: new Date().toLocaleString(),
    ejercicios: rutina.map(({ nombre, tipo, series, repeticiones }) => ({
      nombre,
      tipo,
      series,
      repeticiones
    }))
  };
  historialRutinas.push(entrada);
  localStorage.setItem("historialRutinas", JSON.stringify(historialRutinas));
  renderizarHistorial();
}

function renderizarHistorial() {
  const contenedor = document.getElementById("historial");
  contenedor.innerHTML = `<h3>Historial de Rutinas</h3>
    <button id="btn-borrar-seleccionadas" class="btn-borrar">🗑️ Borrar rutinas seleccionadas del historial</button>`;

  if (historialRutinas.length === 0) {
    contenedor.innerHTML += "<p>No hay rutinas previas.</p>";
    return;
  }

  historialRutinas.slice().reverse().forEach(item => {
    const div = document.createElement("div");
    div.className = "rutina-item";

    div.innerHTML = `
      <div class="rutina-contenido">
        <div class="texto-ejercicio">
          <strong>${item.fecha}</strong>
          <ul>
            ${item.ejercicios.map(ej => `
              <li>${ej.nombre}: ${ej.series} x ${ej.repeticiones} ${ej.tipo === "reps" ? "reps" : "seg"}</li>
            `).join("")}
          </ul>
        </div>
        <div class="checkbox-ejercicio">
          <input type="checkbox" class="checkbox-historial" data-fecha="${item.fecha}">
        </div>
      </div>
    `;
    contenedor.appendChild(div);
  });

  // ⬇️ Agregar funcionalidad del botón aquí (porque el botón fue creado recién arriba)
  document.getElementById("btn-borrar-seleccionadas").addEventListener("click", () => {
    const checkboxes = document.querySelectorAll(".checkbox-historial");
    const seleccionados = [];

    checkboxes.forEach(cb => {
      if (cb.checked) {
        const fecha = cb.getAttribute("data-fecha");
        if (fecha) seleccionados.push(fecha);
      }
    });

    if (seleccionados.length === 0) {
      Swal.fire("Nada seleccionado", "Marcá al menos una rutina para eliminar.", "info");
      return;
    }

    Swal.fire({
      title: "¿Eliminar rutinas seleccionadas?",
      text: `${seleccionados.length} rutina(s) serán eliminadas del historial.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        const nuevos = historialRutinas.filter(item => !seleccionados.includes(item.fecha));
        localStorage.setItem("historialRutinas", JSON.stringify(nuevos));
        historialRutinas.length = 0;
        historialRutinas.push(...nuevos);
        renderizarHistorial();
        Swal.fire("Hecho", "Rutinas seleccionadas eliminadas.", "success");
      }
    });
  });
}



document.addEventListener("DOMContentLoaded", () => {
  const toggleThemeBtn = document.getElementById("toggle-theme");
  const borrarBtn = document.getElementById("btn-borrar-seleccionadas");
  const prefersDark = localStorage.getItem("modoOscuro") === "true";

  // Dark mode
  if (prefersDark) {
    document.body.classList.add("dark");
    toggleThemeBtn.textContent = "☀️ Modo Claro";
  }

  toggleThemeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    toggleThemeBtn.textContent = isDark ? "☀️ Modo Claro" : "🌙 Modo Oscuro";
    localStorage.setItem("modoOscuro", isDark);
  });
});

