const API_URL = "http://localhost:5000/api/empresas";

// Función para obtener y mostrar empresas
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
                            <button class="btn btn-danger btn-sm" onclick="eliminarEmpresa(${empresa.id})">Eliminar</button>
                        </td>
                    </tr>
                `;
            });

            $("#empresaTableBody").html(tableContent);
        },
        error: function () {
            alert("Error al obtener las empresas.");
        }
    });
}



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
});

// Función para eliminar una empresa
function eliminarEmpresa(id) {
    if (confirm("¿Estás seguro de eliminar esta empresa?")) {
        $.ajax({
            url: `${API_URL}/${id}`,
            type: "DELETE",
            success: function () {
                alert("Empresa eliminada correctamente.");
                cargarEmpresas();
            },
            error: function () {
                alert("Error al eliminar la empresa.");
            }
        });
    }
}

// Cargar empresas al cargar la página
$(document).ready(function () {
    cargarEmpresas();
});
