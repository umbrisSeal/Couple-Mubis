const validarPassword = require("../services/database/validarPassword");


async function iniciarSesionModel(request, response) {
    
    const respuesta = await validarPassword(request.body.password, request.body.email); 
    // Verdadero o Falso
    // Si verdadero, continuar, si falso cancelar.
    // Crear y entregar un nuevo ID token y un Session Token.

    console.log(respuesta);

    return 0;

}

module.exports = iniciarSesionModel;