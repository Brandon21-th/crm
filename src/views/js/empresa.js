const API_URL = "http://localhost:5000/api/empresas";

// Función para obtener y mostrar empresas activas
function cargarEmpresas() {
    $.ajax({
        url: API_URL,
        type: "GET",
        success: function (response) {
            const empresas = response.data;
            let tableContent = "";
            empresas.forEach(empresa => {
                tableContent += `
                    <tr>
                        <td>${empresa.id}</td>
                        <td>${empresa.nombre_empresa}</td>
                        <td>${empresa.domicilio_empresa}</td>
                        <td>${empresa.nombre_contacto}</td>
                        <td>${empresa.tel_contacto}</td>
                        <td>${empresa.email_contacto}</td>
                        <td>
                            <button class="btn btn-info btn-sm" onclick="abrirEditarEmpresaModal(${empresa.id})">
                                <i class="fas fa-edit"></i> 
                            </button>
                            <button class="btn btn-danger btn-sm" onclick="suspenderEmpresa(${empresa.id})">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </td>
                    </tr>
                `;
            });

            // Destruir la instancia existente de DataTables si existe
            if ($.fn.DataTable.isDataTable('#empresaTable')) {
                $('#empresaTable').DataTable().destroy();
            }

            $("#empresaTableBody").html(tableContent);

            // Inicializar DataTables
            $('#empresaTable').DataTable({
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
            alert("Error al obtener las empresas.");
        }
    });
}

// Función para abrir el modal de editar empresa
function abrirEditarEmpresaModal(id) {
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
            alert("Error al obtener la empresa.");
        }
    });
}

// Función para suspender una empresa
function suspenderEmpresa(id) {
    if (confirm("¿Estás seguro de suspender esta empresa?")) {
        $.ajax({
            url: `${API_URL}/${id}/suspender`,
            type: "PUT",
            contentType: "application/json",
            success: function () {
                alert("Empresa suspendida correctamente.");
                cargarEmpresas();
            },
            error: function () {
                alert("Error al suspender la empresa.");
            }
        });
    }
}

// Función para actualizar una empresa
$("#editarEmpresaForm").submit(function (event) {
    event.preventDefault();

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
            alert("Empresa actualizada con éxito.");
            $("#editarEmpresaModal").modal("hide");
            cargarEmpresas();
        },
        error: function () {
            alert("Error al actualizar la empresa.");
        }
    });
});

// Función para guardar una nueva empresa
$("#empresaForm").submit(function (event) {
    event.preventDefault();

    const nuevaEmpresa = {
        nombre_empresa: $("#nombre_empresa").val(),
        domicilio_empresa: $("#domicilio_empresa").val(),
        nombre_contacto: $("#nombre_contacto").val(),
        tel_contacto: $("#tel_contacto").val(),
        email_contacto: $("#email_contacto").val()
    };

    const empresaId = $("#empresaId").val();

    if (empresaId) {
        // Actualizar empresa existente
        $.ajax({
            url: `${API_URL}/${empresaId}`,
            type: "PUT",
            contentType: "application/json",
            data: JSON.stringify(nuevaEmpresa),
            success: function () {
                alert("Empresa actualizada con éxito.");
                $("#empresaForm")[0].reset();
                $("#empresaId").val("");
                cargarEmpresas();
            },
            error: function () {
                alert("Error al actualizar la empresa.");
            }
        });
    } else {
        // Crear nueva empresa
        $.ajax({
            url: API_URL,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(nuevaEmpresa),
            success: function () {
                alert("Empresa registrada con éxito.");
                $("#empresaForm")[0].reset();
                cargarEmpresas();
            },
            error: function () {
                alert("Error al registrar la empresa.");
            }
        });
    }
});

// Cargar empresas al cargar la página
$(document).ready(function () {
    cargarEmpresas();
});