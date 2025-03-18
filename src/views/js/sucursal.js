(function() {
    const API_URL = "http://localhost:5000/api/sucursales";

    // Función para obtener y mostrar empresas activas
    function cargarSucursales() {
        $.ajax({
            url: API_URL,
            type: "GET",
            success: function (response) {
                const sucursales = response.data;
                let tableContent = "";
                sucursales.forEach(sucursal => {
                    tableContent += `
                        <tr>
                            <td>${sucursal.id}</td>
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

    // Función para abrir el modal de editar empresa
    window.abrirEditarEmpresaModal = function(id) {
        $.ajax({
            url: `${API_URL}/${id}`,
            type: "GET",
            success: function (response) {
                const empresa = response.data;
                $("#editarEmpresaId").val(empresa.id);
                $("#editarNombreEmpresa").val(empresa.nombre_empresa);
                $("#editarDomicilioEmpresa").val(empresa.domicilio_empresa);
                $("#editarNombreContacto").val(empresa.nombre_contacto);
                $("#editarTelContacto").val(empresa.tel_contacto);
                $("#editarEmailContacto").val(empresa.email_contacto);
                $("#editarEmpresaModal").modal("show");
            },
            error: function () {
                mostrarMensaje("Error al obtener la empresa.", "error");
            }
        });
    }

    // Función para abrir el modal de confirmación de suspensión
    window.abrirConfirmarSuspensionModal = function(id) {
        const confirmarSuspensionBtn = document.getElementById('confirmarSuspensionBtn');
        confirmarSuspensionBtn.setAttribute('data-id', id);
        $('#confirmarSuspensionModal').modal('show');
    }

    // Función para suspender una empresa
    window.suspenderEmpresa = function(id) {
        $.ajax({
            url: `${API_URL}/${id}/suspender`,
            type: "PUT",
            contentType: "application/json",
            success: function () {
                mostrarMensaje("Empresa suspendida correctamente.", "success");
                cargarEmpresas();
            },
            error: function () {
                mostrarMensaje("Error al suspender la empresa.", "error");
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

        const nombreEmpresa = formulario.querySelector("#nombre_empresa") || formulario.querySelector("#editarNombreEmpresa");
        const domicilioEmpresa = formulario.querySelector("#domicilio_empresa") || formulario.querySelector("#editarDomicilioEmpresa");
        const nombreContacto = formulario.querySelector("#nombre_contacto") || formulario.querySelector("#editarNombreContacto");
        const telContacto = formulario.querySelector("#tel_contacto") || formulario.querySelector("#editarTelContacto");
        const emailContacto = formulario.querySelector("#email_contacto") || formulario.querySelector("#editarEmailContacto");

        let esValido = true;

        if (!nombreEmpresa.value.trim()) {
            mostrarError(nombreEmpresa, "El nombre de la empresa es obligatorio.");
            esValido = false;
        }

        if (!domicilioEmpresa.value.trim()) {
            mostrarError(domicilioEmpresa, "El domicilio de la empresa es obligatorio.");
            esValido = false;
        }

        if (!nombreContacto.value.trim()) {
            mostrarError(nombreContacto, "El nombre del contacto es obligatorio.");
            esValido = false;
        } else {
            const nombreRegex = /^[A-Za-z\s]+$/;
            if (!nombreRegex.test(nombreContacto.value)) {
                mostrarError(nombreContacto, "El nombre del contacto solo debe contener letras.");
                esValido = false;
            }
        }

        if (!telContacto.value.trim()) {
            mostrarError(telContacto, "El teléfono es obligatorio.");
            esValido = false;
        } else {
            const telefonoRegex = /^\d{10}$/;
            if (!telefonoRegex.test(telContacto.value)) {
                mostrarError(telContacto, "El teléfono debe tener 10 dígitos.");
                esValido = false;
            }
        }

        if (!emailContacto.value.trim()) {
            mostrarError(emailContacto, "El correo electrónico es obligatorio.");
            esValido = false;
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailContacto.value)) {
                mostrarError(emailContacto, "El correo electrónico no es válido.");
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

    // Función para actualizar una empresa
    $("#editarEmpresaForm").submit(function (event) {
        event.preventDefault();

        if (!validarFormulario(this)) {
            return;
        }

        const empresaActualizada = {
            nombre_empresa: $("#editarNombreEmpresa").val(),
            domicilio_empresa: $("#editarDomicilioEmpresa").val(),
            nombre_contacto: $("#editarNombreContacto").val(),
            tel_contacto: $("#editarTelContacto").val(),
            email_contacto: $("#editarEmailContacto").val()
        };

        const empresaId = $("#editarEmpresaId").val();

        $.ajax({
            url: `${API_URL}/${empresaId}`,
            type: "PUT",
            contentType: "application/json",
            data: JSON.stringify(empresaActualizada),
            success: function () {
                mostrarMensaje("Empresa actualizada con éxito.", "success");
                $("#editarEmpresaModal").modal("hide");
                cargarEmpresas();
            },
            error: function () {
                mostrarMensaje("Error al actualizar la empresa.", "error");
            }
        });
    });

    // Función para guardar una nueva empresa
    $("#empresaForm").submit(function (event) {
        event.preventDefault();

        if (!validarFormulario(this)) {
            return;
        }

        const nuevaEmpresa = {
            nombre_empresa: $("#nombre_empresa").val(),
            domicilio_empresa: $("#domicilio_empresa").val(),
            nombre_contacto: $("#nombre_contacto").val(),
            tel_contacto: $("#tel_contacto").val(),
            email_contacto: $("#email_contacto").val()
        };

        $.ajax({
            url: API_URL,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(nuevaEmpresa),
            success: function () {
                mostrarMensaje("Empresa registrada con éxito.", "success");
                $("#empresaForm")[0].reset();
                $("#registrarEmpresaModal").modal("hide");
                cargarEmpresas();
            },
            error: function () {
                mostrarMensaje("Error al registrar la empresa.", "error");
            }
        });
    });

    // Cargar empresas al cargar la página
    $(document).ready(function () {
        cargarSucursales();
    });
})();