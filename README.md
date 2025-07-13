# 💪 Simulador de Rutinas de Ejercicio (TP Final)

Este proyecto es una evolución del TP2 original. Se trata de un simulador web que genera rutinas de ejercicio personalizadas en base a los datos ingresados por el usuario (peso, altura, edad y tipo de actividad física). El sistema permite visualizar las rutinas generadas, marcarlas como realizadas y mantener un historial editable.

---

## 🆕 Cambios realizados desde el TP2

El proyecto fue completamente rediseñado y optimizado. A continuación se listan las principales mejoras incorporadas:

### 🧠 Funcionalidad
- ✅ **Lógica de generación variada de rutinas:** ahora las rutinas generadas no se repiten, evitando ejercicios ya vistos recientemente.
- ✅ **Compatibilidad con 6 tipos de actividades físicas:** `calistenia`, `spinning`, `levantamiento de pesas`, `hiit`, `yoga` y `running`.
- ✅ **Soporte ampliado en el JSON de rutinas:** más de 50 ejercicios con descripciones detalladas de cómo realizarlos.
- ✅ **Historial persistente:** las rutinas se guardan en `localStorage` y se pueden revisar posteriormente.
- ✅ **Posibilidad de eliminar rutinas del historial individualmente** con checkbox.
- ✅ **Confirmación visual de acciones importantes** usando `SweetAlert2`.
- ✅ **Modo oscuro persistente** a través de `localStorage`.

### 🎨 Estética y UX
- ✅ **Interfaz visualmente mejorada:** se aplicó un diseño moderno, coherente, limpio y responsive.
- ✅ **Checkbox estético y alineado a la derecha** para rutinas activas e historial.
- ✅ **Botón de eliminación de historial reubicado y funcional.**
- ✅ **Mensajes contextuales más amigables.**

---

## 🚀 ¿Cómo usar?

1. Cloná el repositorio o descargá el `.zip`.
2. Abrí el archivo `index.html` en tu navegador.
3. Ingresá tus datos y seleccioná el tipo de actividad física.
4. Presioná “Generar Rutina”.
5. (Opcional) Activá el modo oscuro 🌙 o claro ☀️.
6. Revisá tu historial y eliminá rutinas anteriores si lo necesitás.

---

## 📁 Estructura del proyecto

📦 EntregaFinalJS
├── index.html → Página principal
├── css/
│ └── styles.css → Estilos modernos (modo claro y oscuro)
├── js/
│ └── app.js → Lógica del simulador y manejo de eventos
├── assets/
│ └── rutinas.json → Base de datos de ejercicios
└── README.md → Este archivo

---

## 🛠️ Tecnologías utilizadas

- HTML5 + CSS3 (modo dark y diseño responsive)
- JavaScript (ES6+)
- `localStorage` para persistencia local
- [`SweetAlert2`](https://sweetalert2.github.io/) para alertas estilizadas

---

## 💡 Mejoras posibles a futuro

- Registro de usuario y autenticación
- Exportar rutina como PDF o imprimir
- Integración con APIs de salud o fitness
- Calorías estimadas por rutina

---

## ✍️ Autor

TP desarrollado como parte del curso de JavaScript en [Coderhouse].

---

