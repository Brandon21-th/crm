(function() {
    const API_URL = "http://localhost:5000/api/sucursales";
    const EMPRESA_API_URL = "http://localhost:5000/api/empresas";

    // Función para obtener y mostrar sucursales activas
    function cargarSucursales() {
        $.ajax({
            url: API_URL,
            type: "GET",
            success: function (response) {
                console.log(response); // Verifica la respuesta de la API
                const sucursales = response.data;
                if (!Array.isArray(sucursales)) {
                    console.error("La respuesta no es un array:", sucursales);
                    return;
                }
                let tableContent = "";
                sucursales.forEach(sucursal => {
                    tableContent += `
                        <tr>
                            <td>${sucursal.id}</td>
                            <td>${sucursal.tempresa.nombre_empresa ? sucursal.tempresa.nombre_empresa : 'N/A'}</td>
                            <td>${sucursal.nombre_sucursal}</td>
                            <td>${sucursal.telefono}</td>
                            <td>${sucursal.email_fiscal}</td>
                            <td>
                                <button class="btn btn-info btn-sm" onclick="abrirEditarSucursalModal(${sucursal.id})">
                                    <i class="fas fa-edit"></i> 
                                </button>
                                <button class="btn btn-danger btn-sm" onclick="abrirConfirmarSuspensionModal(${sucursal.id})">
                                    <i class="fas fa-trash-alt"></i>
                                </button>
                            </td>
                        </tr>
                    `;
                });

                // Destruir la instancia existente de DataTables si existe
                if ($.fn.DataTable.isDataTable('#sucursalTable')) {
                    $('#sucursalTable').DataTable().destroy();
                }

                $("#sucursalTableBody").html(tableContent);

                // Inicializar DataTables
                $('#sucursalTable').DataTable({
                    language: {
                        "decimal": "",
                        "emptyTable": "No hay datos disponibles en la tabla",
                        "info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
                        "infoEmpty": "Mostrando 0 a 0 de 0 registros",
                        "infoFiltered": "(filtrado de _MAX_ registros en total)",
                        "infoPostFix": "",
                        "thousands": ",",
                        "lengthMenu": "Mostrar _MENU_ registros",
                        "loadingRecords": "Cargando...",
                        "processing": "Procesando...",
                        "search": "Buscar:",
                        "zeroRecords": "No se encontraron registros coincidentes",
                        "paginate": {
                            "first": "Primero",
                            "last": "Último",
                            "next": "Siguiente",
                            "previous": "Anterior"
                        },
                        "aria": {
                            "sortAscending": ": activar para ordenar de manera ascendente",
                            "sortDescending": ": activar para ordenar de manera descendente"
                        }
                    }
                });
            },
            error: function () {
                mostrarMensaje("Error al obtener las sucursales.", "error");
            }
        });
    }
    // Función para cargar las opciones de empresas en el formulario
    function cargarEmpresas() {
        $.ajax({
            url: EMPRESA_API_URL,
            type: "GET",
            success: function (response) {
                const empresas = response.data;
                let opciones = "";
                empresas.forEach(empresa => {
                    opciones += `<option value="${empresa.id}">${empresa.nombre_empresa}</option>`;
                });
                $("#id_empresa").html(opciones);
                $("#editarIdEmpresa").html(opciones);
            },
            error: function () {
                mostrarMensaje("Error al obtener las empresas.", "error");
            }
        });
    }

    // Función para abrir el modal de editar sucursal
    window.abrirEditarSucursalModal = function(id) {
        $.ajax({
            url: `${API_URL}/${id}`,
            type: "GET",
            success: function (response) {
                const sucursal = response.data;
                $("#editarSucursalId").val(sucursal.id);
                $("#editarIdEmpresa").val(sucursal.id_empresa);
                $("#editarNombreSucursal").val(sucursal.nombre_sucursal);
                $("#editarTelefono").val(sucursal.telefono);
                $("#editarEmailFiscal").val(sucursal.email_fiscal);
                $("#editarSucursalModal").modal("show");
            },
            error: function () {
                mostrarMensaje("Error al obtener la sucursal.", "error");
            }
        });
    }

    // Función para abrir el modal de confirmación de suspensión
    window.abrirConfirmarSuspensionModal = function(id) {
        const confirmarSuspensionBtn = document.getElementById('confirmarSuspensionBtn');
        confirmarSuspensionBtn.setAttribute('data-id', id);
        $('#confirmarSuspensionModal').modal('show');
    }

    // Función para suspender una sucursal
    window.suspenderSucursal = function(id) {
        $.ajax({
            url: `${API_URL}/${id}/suspender`,
            type: "PUT",
            contentType: "application/json",
            success: function () {
                mostrarMensaje("Sucursal suspendida correctamente.", "success");
                cargarSucursales();
            },
            error: function () {
                mostrarMensaje("Error al suspender la sucursal.", "error");
            }
        });
    }

    // Función para mostrar mensajes de error
    function mostrarError(campo, mensaje) {
        const errorDiv = campo.nextElementSibling;
        errorDiv.textContent = mensaje;
        campo.classList.add("is-invalid");
    }

    // Función para limpiar mensajes de error
    function limpiarErrores(formulario) {
        const campos = formulario.querySelectorAll(".is-invalid");
        campos.forEach(campo => {
            campo.classList.remove("is-invalid");
            const errorDiv = campo.nextElementSibling;
            if (errorDiv) {
                errorDiv.textContent = "";
            }
        });
    }

    // Función para validar el formulario
    function validarFormulario(formulario) {
        limpiarErrores(formulario);

        const idEmpresa = formulario.querySelector("#id_empresa") || formulario.querySelector("#editarIdEmpresa");
        const nombreSucursal = formulario.querySelector("#nombre_sucursal") || formulario.querySelector("#editarNombreSucursal");
        const telefono = formulario.querySelector("#telefono") || formulario.querySelector("#editarTelefono");
        const emailFiscal = formulario.querySelector("#email_fiscal") || formulario.querySelector("#editarEmailFiscal");

        let esValido = true;

        if (!idEmpresa.value.trim()) {
            mostrarError(idEmpresa, "La empresa es obligatoria.");
            esValido = false;
        }

        if (!nombreSucursal.value.trim()) {
            mostrarError(nombreSucursal, "El nombre de la sucursal es obligatorio.");
            esValido = false;
        }

        if (!telefono.value.trim()) {
            mostrarError(telefono, "El teléfono es obligatorio.");
            esValido = false;
        }

        if (!emailFiscal.value.trim()) {
            mostrarError(emailFiscal, "El correo electrónico es obligatorio.");
            esValido = false;
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailFiscal.value)) {
                mostrarError(emailFiscal, "El correo electrónico no es válido.");
                esValido = false;
            }
        }

        return esValido;
    }

    // Función para mostrar mensajes en el modal genérico
    function mostrarMensaje(mensaje, tipo) {
        const mensajeModal = new bootstrap.Modal(document.getElementById('mensajeModal'));
        const mensajeModalBody = document.getElementById('mensajeModalBody');
        mensajeModalBody.textContent = mensaje;
        mensajeModal.show();
    }

    // Función para actualizar una sucursal
    $("#editarSucursalForm").submit(function (event) {
        event.preventDefault();

        if (!validarFormulario(this)) {
            return;
        }

        const sucursalActualizada = {
            id_empresa: $("#editarIdEmpresa").val(),
            nombre_sucursal: $("#editarNombreSucursal").val(),
            telefono: $("#editarTelefono").val(),
            email_fiscal: $("#editarEmailFiscal").val()
        };

        const sucursalId = $("#editarSucursalId").val();

        $.ajax({
            url: `${API_URL}/${sucursalId}`,
            type: "PUT",
            contentType: "application/json",
            data: JSON.stringify(sucursalActualizada),
            success: function () {
                mostrarMensaje("Sucursal actualizada con éxito.", "success");
                $("#editarSucursalModal").modal("hide");
                cargarSucursales();
            },
            error: function () {
                mostrarMensaje("Error al actualizar la sucursal.", "error");
            }
        });
    });

    // Función para guardar una nueva sucursal
    $("#sucursalForm").submit(function (event) {
        event.preventDefault();

        if (!validarFormulario(this)) {
            return;
        }

        const nuevaSucursal = {
            id_empresa: $("#id_empresa").val(),
            nombre_sucursal: $("#nombre_sucursal").val(),
            telefono: $("#telefono").val(),
            email_fiscal: $("#email_fiscal").val()
        };

        $.ajax({
            url: API_URL,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(nuevaSucursal),
            success: function () {
                mostrarMensaje("Sucursal registrada con éxito.", "success");
                $("#sucursalForm")[0].reset();
                $("#registrarSucursalModal").modal("hide");
                cargarSucursales();
            },
            error: function () {
                mostrarMensaje("Error al registrar la sucursal.", "error");
            }
        });
    });

    // Cargar sucursales y empresas al cargar la página
    $(document).ready(function () {
        cargarSucursales();
        cargarEmpresas();
    });
})();