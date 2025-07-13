# Simulador de Rutina Diaria

**Entregable2\_Zuliani**

Proyecto de curso que genera una rutina de ejercicios diaria personalizada según datos físicos y preferencias de actividad, usando HTML, CSS (Dark Mode) y JavaScript (DOM, eventos, localStorage).

---

## Estructura de Carpetas

```
/ (raíz)
│
├── index.html           # Página principal
├── css/
│   └── styles.css       # Estilos Dark Mode y diseño
├── js/
    └── script.js        # Lógica de generación e inyección de rutina

```

## Tecnologías

* **HTML5**: Formulario y estructura de la interfaz.
* **CSS3**: Dark Mode, variables CSS, flexbox.
* **JavaScript**:

  * Captura de eventos (`submit`).
  * Manipulación del DOM para inyectar ejercicios.
  * LocalStorage para guardar datos del usuario.
  * Lógica de generación de rutina con ajustes según edad y peso.

---

## Instalación y Uso

1. Clonar o descargar el repositorio y descomprimir el ZIP:

   ```bash
   git clone https://tu-repo-url.git
   cd Entregable2_Zuliani
   ```
2. Abrir `index.html` en tu navegador.
3. Completar los campos:

   * Peso (kg)
   * Altura (cm)
   * Edad (años)
   * Tipo de actividad (calistenia, spinning, etc.)
4. Hacer clic en **Generar Rutina**.
5. Visualizar rutina personalizada en pantalla.

---

## Personalización de la Rutina

La función `generarRutina(datos)` en `script.js`:

* Selecciona N ejercicios según la edad:

  * < 30 años → 6 ejercicios
  * 30–49 → 5 ejercicios
  * 50–64 → 4 ejercicios
  * ≥ 65 → 3 ejercicios
* Ajusta series, repeticiones o tiempo con factores `edad` y `peso`.
* Determina si un ejercicio es de **reps** o **time** vía `metaEjercicios`.

Modifica estos valores en `metaEjercicios` y `ejerciciosPorActividad` para añadir ejercicios o cambiar parámetros.

---

## Estilos CSS (Dark Mode)

Usa variables CSS (`:root`) para:

* Colores de fondo, texto y tarjetas.
* Colores primario y secundario.
* Bordes y sombras.

Componentes principales:

* `.container`: contenedor principal con fondo oscuro y sombra.
* `#datosUsuario`: formulario estilizado.
* `.ejercicio-card`: tarjetas con detalles de cada ejercicio.

---

## Contribuciones

* Sugerencias para añadir más actividades.
* Incluir imágenes o GIFs de referencia para cada ejercicio.
* Mejorar validación de inputs (rango de peso, edad, etc.).

---

## Autor

**Zenon Zuliani**

Proyecto entregable para la asignatura de JavaScript interactivo.

---

© 2025 Zenon Zuliani. Todos los derechos reservados.
