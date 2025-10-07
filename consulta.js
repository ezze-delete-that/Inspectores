    async function cargarUsuarios() {
      const spinner = document.getElementById("spinner");
      const container = document.getElementById("cardsContainer");

      // Mostrar spinner y limpiar contenedor
      spinner.style.display = "flex";
      container.innerHTML = "";

      try {
        const response = await fetch("http://10.100.17.102:5678/webhook/users");
        if (!response.ok) throw new Error("Error en la API: " + response.status);

        const usuarios = await response.json();

        usuarios.forEach(user => {
          const card = document.createElement("div");
          card.className = "col-md-4";

          card.innerHTML = `
            <div class="card h-100 shadow-sm">
              <div class="card-body">
                <h5 class="card-title">${user.name}</h5>
                <p class="card-text">
                  <strong>ID:</strong> ${user.id} <br>
                  <strong>Legajo:</strong> ${user.legajo} <br>
                  <strong>Categoría:</strong> ${user.category_id} <br>
                  <strong>Profesión:</strong> ${user.profession_id} <br>
                  <strong>DNI:</strong> ${user.dni ?? "N/A"}
                </p>
              </div>
              <div class="card-footer">
                <small class="text-muted">Creado: ${user.created_at}</small><br>
                <small class="text-muted">Actualizado: ${user.updated_at}</small>
              </div>
            </div>
          `;
          container.appendChild(card);
        });
      } catch (error) {
        container.innerHTML = `<div class="alert alert-danger">Error: ${error.message}</div>`;
      } finally {
        // Ocultar spinner
        spinner.style.display = "none";
      }
    }

    // cargar al iniciar
    cargarUsuarios();

    async function cargarUsuarios() {
      const spinner = document.getElementById("spinner");
      const container = document.getElementById("cardsContainer");

      // Mostrar spinner y limpiar contenedor
      spinner.style.display = "flex";
      container.innerHTML = "";

      try {
        const response = await fetch("http://10.100.17.102:5678/webhook/users");
        if (!response.ok) throw new Error("Error en la API: " + response.status);

        const usuarios = await response.json();

        usuarios.forEach(user => {
          const card = document.createElement("div");
          card.className = "col-md-4";

          card.innerHTML = `
            <div class="card h-100 shadow-sm">
              <div class="card-body">
                <h5 class="card-title">${user.name}</h5>
                <p class="card-text">

                  <strong>Legajo:</strong> ${user.legajo} <br>
                  <strong>Categoría:</strong> ${user.name_category} <br>
                  <strong>Profesión:</strong> ${user.name_profession} <br>
                  <strong>DNI:</strong> ${user.dni ?? "N/A"}
                </p>
              </div>
              <div class="card-footer">
                <small class="text-muted">Creado: ${user.created_at}</small><br>
                <small class="text-muted">Actualizado: ${user.updated_at}</small>
              </div>
            </div>
          `;
          container.appendChild(card);
        });
      } catch (error) {
        container.innerHTML = `<div class="alert alert-danger">Error: ${error.message}</div>`;
      } finally {
        // Ocultar spinner
        spinner.style.display = "none";
      }
    }

    // cargar al iniciar
    cargarUsuarios();
