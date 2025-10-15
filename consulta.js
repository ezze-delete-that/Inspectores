let usuarios = [];
let usuariosFiltrados = [];
let paginaActual = 1;
const usuariosPorPagina = 6; // 2x3 grid

async function cargarUsuarios() {
  const spinnerOverlay = document.getElementById("spinnerOverlay");
  const container = document.getElementById("cardsContainer");

  try {
    const response = await fetch("https://apihubprd.vicentelopez.gov.ar/webhook/users");
    if (!response.ok) throw new Error("Error en la API: " + response.status);

    usuarios = await response.json();
    usuariosFiltrados = usuarios;
    mostrarPagina(1);
    console.log(usuarios);
  } catch (error) {
    container.innerHTML = `<div class="alert alert-danger">Error: ${error.message}</div>`;
  } finally {
    spinnerOverlay.remove();
  }
}

function mostrarPagina(numeroPagina) {
  paginaActual = numeroPagina;
  const inicio = (paginaActual - 1) * usuariosPorPagina;
  const fin = inicio + usuariosPorPagina;
  const usuariosPagina = usuariosFiltrados.slice(inicio, fin);
  
  mostrarUsuarios(usuariosPagina);
  actualizarPaginacion();
}

function mostrarUsuarios(lista) {
  const container = document.getElementById("cardsContainer");
  container.innerHTML = "";

  if (usuariosFiltrados.length === 0) {
    container.innerHTML = `<div class="alert alert-warning">No se encontraron resultados</div>`;
    return;
  }

  lista.forEach(user => {
    if (user.state !== "ACTIVO") return;
    const card = document.createElement("div");
    card.className = "col-12 col-md-6 col-lg-4";

    card.innerHTML = ` 
      <div class="card h-100 shadow-sm">
        <div class="card-body">
          <div class="image-container">                
            <img src="${user.image_route && user.image_route.trim() !== '' ? user.image_route : 'images/inspectora.webp'}" alt="Imagen inspector" class="inspector-image">
          </div>
          <h5 class="card-title">${user.name}</h5>
          <p class="card-text">
            <strong>Legajo:</strong> ${user.legajo} <br>
            <strong>Categoría:</strong> ${user.category_id} <br>
            <strong>Profesión:</strong> ${user.profession_id} <br>
            <strong>DNI:</strong> ${user.dni ?? "N/A"} <br>
          </p>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

function actualizarPaginacion() {
  const totalPaginas = Math.ceil(usuariosFiltrados.filter(u => u.state === "ACTIVO").length / usuariosPorPagina);
  const paginationContainer = document.getElementById("paginationContainer");
  
  if (totalPaginas <= 1) {
    paginationContainer.innerHTML = "";
    return;
  }

  let paginacionHTML = '<nav><ul class="pagination justify-content-center flex-wrap">';
  
  // Botón anterior
  paginacionHTML += `
    <li class="page-item ${paginaActual === 1 ? 'disabled' : ''}">
      <a class="page-link" href="#" onclick="cambiarPagina(${paginaActual - 1}); return false;">Anterior</a>
    </li>
  `;

  // Páginas
  const maxPaginasVisibles = 5;
  let inicioPaginas = Math.max(1, paginaActual - Math.floor(maxPaginasVisibles / 2));
  let finPaginas = Math.min(totalPaginas, inicioPaginas + maxPaginasVisibles - 1);
  
  if (finPaginas - inicioPaginas < maxPaginasVisibles - 1) {
    inicioPaginas = Math.max(1, finPaginas - maxPaginasVisibles + 1);
  }

  // Primera página
  if (inicioPaginas > 1) {
    paginacionHTML += `
      <li class="page-item">
        <a class="page-link" href="#" onclick="cambiarPagina(1); return false;">1</a>
      </li>
    `;
    if (inicioPaginas > 2) {
      paginacionHTML += '<li class="page-item disabled"><span class="page-link">...</span></li>';
    }
  }

  // Páginas del rango
  for (let i = inicioPaginas; i <= finPaginas; i++) {
    paginacionHTML += `
      <li class="page-item ${i === paginaActual ? 'active' : ''}">
        <a class="page-link" href="#" onclick="cambiarPagina(${i}); return false;">${i}</a>
      </li>
    `;
  }

  // Última página
  if (finPaginas < totalPaginas) {
    if (finPaginas < totalPaginas - 1) {
      paginacionHTML += '<li class="page-item disabled"><span class="page-link">...</span></li>';
    }
    paginacionHTML += `
      <li class="page-item">
        <a class="page-link" href="#" onclick="cambiarPagina(${totalPaginas}); return false;">${totalPaginas}</a>
      </li>
    `;
  }

  // Botón siguiente
  paginacionHTML += `
    <li class="page-item ${paginaActual === totalPaginas ? 'disabled' : ''}">
      <a class="page-link" href="#" onclick="cambiarPagina(${paginaActual + 1}); return false;">Siguiente</a>
    </li>
  `;

  paginacionHTML += '</ul></nav>';
  paginationContainer.innerHTML = paginacionHTML;
}

function cambiarPagina(numeroPagina) {
  const totalPaginas = Math.ceil(usuariosFiltrados.filter(u => u.state === "ACTIVO").length / usuariosPorPagina);
  if (numeroPagina >= 1 && numeroPagina <= totalPaginas) {
    mostrarPagina(numeroPagina);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function filtrarUsuarios() {
  const query = document.getElementById("buscador").value.toLowerCase().trim();
  
  usuariosFiltrados = usuarios.filter(user =>
    (user.name && user.name.toLowerCase().includes(query)) ||
    (user.legajo && user.legajo.toString().toLowerCase().includes(query)) ||
    (user.category_id && user.category_id.toLowerCase().includes(query)) ||
    (user.profession_id && user.profession_id.toLowerCase().includes(query)) ||
    (user.dni && user.dni.toString().includes(query))
  );

  mostrarPagina(1); // Volver a la primera página al filtrar
}

document.getElementById("buscador").addEventListener("input", filtrarUsuarios);

cargarUsuarios();
// Desarrollado por Ezequiel Gimenez
