const listaTareas = document.getElementById("lista-tareas");
const formulario = document.getElementById("formulario");
const descripcionTarea = document.getElementById("descripcion-tarea");

// Leer las tareas almacenadas en localStorage
const obtenerTareas = () => {
  let tareas;
  if (localStorage.getItem("tareas") === null) {
    tareas = [];
  } else {
    tareas = JSON.parse(localStorage.getItem("tareas"));
  }
  return tareas;
};

// Mostrar las tareas almacenadas en localStorage
const mostrarTareas = () => {
  const tareas = obtenerTareas();
  listaTareas.innerHTML = "";
  tareas.forEach((tarea, index) => {
    const div = document.createElement("div");
    div.classList.add("tarea");
    div.innerHTML = `
      <div class="descripcion">${tarea.descripcion}</div>
      <div class="estado">${tarea.completado ? "Completado" : "Pendiente"}</div>
      <div class="acciones">
        <button type="button" class="boton-eliminar" data-id="${index}">Eliminar</button>
        <button type="button" class="boton-actualizar" data-id="${index}">${tarea.completado ? "Reactivar" : "Completar"}</button>
      </div>
    `;
    listaTareas.appendChild(div);
  });
};

// Agregar una tarea
const agregarTarea = (e) => {
  e.preventDefault();
  const tarea = {
    descripcion: descripcionTarea.value,
    completado: false,
  };
  const tareas = obtenerTareas();
  tareas.push(tarea);
  localStorage.setItem("tareas", JSON.stringify(tareas));
  mostrarTareas();
  formulario.reset();
};

// Eliminar una tarea
const eliminarTarea = (index) => {
  const tareas = obtenerTareas();
  tareas.splice(index, 1);
  localStorage.setItem("tareas", JSON.stringify(tareas));
  mostrarTareas();
};

// Actualizar el estado de una tarea
const actualizarTarea = (index) => {
  const tareas = obtenerTareas();
  tareas[index].completado = !tareas[index].completado;
  localStorage.setItem("tareas", JSON.stringify(tareas));
  mostrarTareas();
};

// Manejador de eventos para agregar una tarea
formulario.addEventListener("submit", agregarTarea);

// Manejador de eventos para eliminar una tarea
listaTareas.addEventListener("click", (e) => {
  if (e.target.classList.contains("boton-eliminar")) {
    const index = e.target.getAttribute("data-id");
    eliminarTarea(index);
  }
});

// Manejador de eventos para actualizar el estado de una tarea
listaTareas.addEventListener("click", (e) => {
  if (e.target.classList.contains("boton-actualizar")) {
    const index = e.target.getAttribute("data-id");
    actualizarTarea(index);
  }
});

// Mostrar las tareas almacenadas en localStorage al cargar la página
mostrarTareas();
